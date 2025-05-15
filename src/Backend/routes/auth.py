from src.Backend.models import db, User,Companies, Roles, UserRole
from src.Backend.auth_decorators import role_required
import os
from flask import Blueprint, request, jsonify
from sqlalchemy.exc import IntegrityError
from flask_jwt_extended import jwt_required, create_access_token, get_jwt_identity, get_jwt
from werkzeug.security import generate_password_hash, check_password_hash
from werkzeug.utils import secure_filename
from datetime import datetime, timedelta


auth_bp = Blueprint('auth', __name__)

@auth_bp.route('/signup', methods=['POST'])
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


@auth_bp.route('/login', methods=['POST'])
def login():
    try:
        data = request.get_json()
        
        if not data.get('email') or not data.get('password'):
            return jsonify({'message': 'Email y contraseña son requeridos'}), 400
        
        user = User.query.filter_by(email=data['email']).first()
        
        user.is_active = True
        db.session.commit()

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
            'user': user.serialize(),
            'user_id': user.id,
            'roles': roles_list
        })
        
        return jsonify({
            'token': token,
            'user': user.serialize(),
            'roles': user.roles
        })
    except Exception as e:
        return jsonify({"msg": "Error login", "Error": str(e)}), 400
    
@auth_bp.route('/logout', methods=['POST'])
@jwt_required()
def logout():
    try: 
        jwt_data = get_jwt()
        jwt_user = jwt_data.get('user')
        current_user = jwt_user.get('email')

        if not current_user:
            return jsonify({"msg": "Missing user"}), 400
        
        user = User.query.filter_by(email=current_user).first()
        if not user:
            return jsonify({"msg": "User not found"}), 404
        
        user.is_active = False
        db.session.commit()
        
        return jsonify({"msg": "Logout successful"}), 200
    except Exception as e:
        return jsonify({"msg": "Error logging out", "Error": str(e)}), 400

@auth_bp.route('/auth/me', methods=['POST'])
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
    
@auth_bp.route('/signup/company', methods=['POST'])
def signup_company():
    try:
        company_name = request.json.get('name', None)
        company_password = str(request.json.get('password', None))
        company_description = request.json.get('description', None)
        company_email = request.json.get('email', None)
        company_phone = request.json.get('phone', None)
        company_website = request.json.get('website', None)
        company_country = request.json.get('country', None)
        company_logo_url = request.json.get('logo_url', None)
        company_slug = request.json.get('slug', None)
        company_status = request.json.get('status', None)
        company_role = request.json.get('role', None)

        if not company_name:
            return jsonify({"msg": "Missing company name"}), 400
        if not company_password:
            return jsonify({"msg": "Missing company password"}), 400
        if not company_description:
            return jsonify({"msg": "Missing company description"}), 400
        if not company_email:
            return jsonify({"msg": "Missing company email"}), 400
        if not company_phone:
            return jsonify({"msg": "Missing company phone"}), 400
        if not company_website:
            return jsonify({"msg": "Missing company website"}), 400
        if not company_country:
            return jsonify({"msg": "Missing company country"}), 400
        if not company_logo_url:
            return jsonify({"msg": "Missing company logo_url"}), 400
        if not company_slug:
            return jsonify({"msg": "Missing company slug"}), 400
        if not company_status:
            return jsonify({"msg": "Missing company status"}), 400
        if not company_role:
            return jsonify({"msg": "Missing company role"}), 400

        company = Companies.query.filter_by(email=company_email).first()
        if company:
            return jsonify({"msg": "Compañia ya registrada"}), 409

        password_hash = generate_password_hash(company_password)
        new_company = Companies(
            name=company_name,
            email=company_email,
            password=password_hash,
            description=company_description,
            phone=company_phone,
            website=company_website,
            country=company_country,
            logo_url=company_logo_url,
            slug=company_slug,
            status=company_status,
            role = company_role
        )
        db.session.add(new_company)
        db.session.commit()
        return jsonify({
            "msg": "Company created"}), 201 
    except Exception as e:
        return jsonify({"msg": "Error creating company","Error": str(e)}), 400