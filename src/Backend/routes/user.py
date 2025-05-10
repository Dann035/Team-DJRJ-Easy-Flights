import os
from flask import Blueprint, request, jsonify
from Backend.models import db, User,Companies, Roles, UserRole
from sqlalchemy.exc import IntegrityError
from flask_jwt_extended import jwt_required, create_access_token, get_jwt_identity, get_jwt
from werkzeug.security import generate_password_hash, check_password_hash
from werkzeug.utils import secure_filename
from Backend.auth_decorators import role_required
from datetime import datetime, timedelta


UPLOAD_FOLDER = "static/avatars"  # Ajusta la ruta según tu estructura
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif'}

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

user_bp = Blueprint('user_bp', __name__)

@user_bp.route('/signup', methods=['POST'])
def signup_user():
    data = request.get_json()
    user_type = data.get('role')  # 'USER' o 'COMPANY'
    
    # Verifica en ambas tablas
    company = Companies.query.filter_by(email=data['email']).first()
    user = User.query.filter_by(email=data['email']).first()
    if company or user:
        return jsonify({'message': 'Email ya registrado'}), 409

    try:
        if user_type == 'COMPANY':
            company = Companies(
                name=data['name'],
                password=generate_password_hash(str(data['password'])),
                description=data['description'],
                email=data['email'],
                phone=data['phone'],
                website=data['website'],
                country=data['country'],
                logo_url=data['logo_url'],
                slug=data['slug'],
                status=data['status'],
                role=user_type
            )
            db.session.add(company)
            db.session.commit()
            
            # Crear usuario administrador de la empresa
            user = User(
                name=data['name'],
                email=data['email'],
                password=generate_password_hash(str(data['password'])),
                companies=[company],
                role=user_type
            )
            db.session.add(user)
            db.session.commit()
            
            # Asignar rol de administrador de empresa
            company_role = Roles.query.filter_by(name='COMPANY').first()
            user_role = UserRole(
                user_id=user.id,
                company_id=company.id,
                role_id=company_role.id
            )
            db.session.add(user_role)
            db.session.commit()
            
        else:
            if User.query.filter_by(email=data['email']).first():
                return jsonify({'message': 'Email ya registrado'}), 409
            
            strUPassword = str(data['password'])
            user = User(
                name=data['name'],
                email=data['email'],
                password=generate_password_hash(strUPassword),
                role=user_type
            )
            db.session.add(user)
            db.session.commit()
            
            # Asignar rol de usuario normal
            role_name = "USER"
            role = Roles.query.filter_by(name=role_name).first()
            if not role:
                role = Roles(name=role_name)
                db.session.add(role)
                db.session.commit()

            user_role = UserRole(
                user_id=user.id,
                role_id=role.id
            )
            db.session.add(user_role)
            db.session.commit()
        
        return jsonify({
            'message': 'Registro exitoso',
            'user_type': user_type
        }), 201
    
    except Exception as e:
        db.session.rollback()
        return jsonify({'message': str(e)}), 500


@user_bp.route('/login', methods=['POST'])
def login():
    try:
        data = request.get_json()
        
        # Validación básica
        if not data.get('email') or not data.get('password'):
            return jsonify({'message': 'Email y contraseña son requeridos'}), 400
        
        # Buscar usuario
        
        user = User.query.filter_by(email=data['email']).first()
        
        if not user:
            return jsonify({'message': 'Usuario no encontrado'}), 404
        
        if not check_password_hash(user.password, data['password']):
            return jsonify({'message': 'Usuario o contraseña inválidos'}), 401
        
        current_user_role = None
        if user.roles and len(user.roles) > 0:
            current_user_role = user.roles[0] # Si tiene varios roles, toma el primero
            


        # Generar token JWT con los roles
        roles_list = []
        for role in user.roles:
            if hasattr(role, "name"):
                roles_list.append(role.name)
            else:
                roles_list.append(str(role))
        token = create_access_token(identity=user.email, expires_delta=False, additional_claims={
            'exp': datetime.utcnow() + timedelta(days=1),
            'iat': datetime.utcnow(),
            'sub': user.id,
            'roles': roles_list
        })
        
        return jsonify({
            'token': token,
            'user': user.serialize(),
            'roles': user.roles
        })
    except Exception as e:
        return jsonify({"msg": "Error login", "Error": str(e)}), 400

@user_bp.route('/auth/me', methods=['POST'])
@jwt_required()
def secret():
    try:
        current_user = get_jwt_identity()
        claims = get_jwt()
        
        if not current_user:
            return jsonify({"msg": "Missing user" , "Error": str(e)}), 400
        
        user = User.query.filter_by(email=current_user).first()
        if not user:
            return jsonify({"msg": "User not found"}), 404
        
        return jsonify({
            "msg": "Access Allowed",
            "user": user.serialize(),
            'roles': [role.name for role in user.roles]
        }), 200
    except Exception as e:
        return jsonify({"msg": "Missing data", "Error": str(e)}), 400
    

@user_bp.route('/user/<int:user_id>/profile/update/', methods=['PUT'])
@jwt_required()
def get_user(user_id):
    try:
        current_user_email = get_jwt_identity() # obtengo el email del usuario autenticado
        user = User.query.get(user_id) 

        if not user:
            return jsonify({"msg": "User not found"}), 404
        
        if user.email != current_user_email: # verifico que el usuario autenticado sea el dueño del perfil
            return jsonify({"msg": "Access denied"}), 403
    
        data = request.get_json()
        user.name = data.get('name', user.name)
        user.avatar = data.get('avatar', user.avatar)
        user.suscription = data.get('suscription', user.suscription)
        if 'password' in data:
            user.password = generate_password_hash(str(data['password']))

        db.session.commit()
        return jsonify({
            "msg": "User updated",
            "user": user.serialize()
        }), 200

    except Exception as e:
        return jsonify({"msg": "Missing user" , "Error": str(e)}), 400
    
@user_bp.route('/user/<int:user_id>/avatar/upload', methods=['PATCH'])
@jwt_required()
def upload_avatar(user_id):
    try:
        current_user_email = get_jwt_identity()
        user = User.query.get(user_id)

        if not user:
            return jsonify({"msg": "User not found"}), 404

        if user.email != current_user_email:
            return jsonify({"msg": "Access denied"}), 403

        # Manejo explícito si no se envía archivo
        if 'avatar' not in request.files:
            return jsonify({"msg": "No file part"}), 400

        file = request.files['avatar']
        if file.filename == '':
            return jsonify({"msg": "No selected file"}), 400

        if file and allowed_file(file.filename):
            filename = secure_filename(file.filename)
            filename = f"user_{user.id}_{filename}"
            save_path = os.path.join(UPLOAD_FOLDER, filename)
            os.makedirs(UPLOAD_FOLDER, exist_ok=True)
            file.save(save_path)
            # Guarda la ruta relativa
            user.avatar = f"/{save_path}"
            db.session.commit()
            return jsonify({
                "msg": "Avatar updated",
                "user": user.serialize()
            }), 200
        else:
            return jsonify({"msg": "File type not allowed"}), 400

    except Exception as e:
        return jsonify({"msg": "Error uploading avatar", "Error": str(e)}), 400