import os
from flask import Blueprint, request, jsonify
from src.Backend.models import db, User,Companies, Roles, UserRole
from sqlalchemy.exc import IntegrityError
from flask_jwt_extended import jwt_required, create_access_token, get_jwt_identity, get_jwt
from werkzeug.security import generate_password_hash, check_password_hash
from werkzeug.utils import secure_filename
from src.Backend.auth_decorators import role_required
from datetime import datetime, timedelta
from .password_reset import verification_codes


UPLOAD_FOLDER = "public/static/avatars"  # Ajusta la ruta según tu estructura
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif'}

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

user_bp = Blueprint('user_bp', __name__)

@user_bp.route('/user/me', methods=['GET'])
@jwt_required()
def get_user_profile():
    try:
        # Get email from JWT
        current_user_email = get_jwt_identity()
        
        # Find user by email
        user = User.query.filter_by(email=current_user_email).first()
        if not user:
            return jsonify({"msg": "Usuario no encontrado"}), 404
        return jsonify({
            "user": user.serialize(),
            "roles": [role.name for role in user.roles]
        }), 200
    except Exception as e:
        print(f"Error al obtener perfil: {str(e)}")
        return jsonify({"msg": "Error al obtener el perfil", "error": str(e)}), 500
    
@user_bp.route('/user/<int:user_id>/profile/update', methods=['PUT'])
@jwt_required()
def update_user_profile(user_id):
    try:
        data = request.get_json()
        if not data:
            return jsonify({"msg": "No data provided"}), 400
            
        user = User.query.get(user_id)

        if not user:
            return jsonify({"msg": "User not found"}), 404
        
        # Get email from JWT
        jwt_data = get_jwt()
        jwt_data_user = jwt_data.get("user")
        current_user_email = jwt_data_user.get("email")
        print(current_user_email)
        
        # Compare JWT email with user email
        if user.email != current_user_email:
            return jsonify({"msg": "Access denied"}), 403
            

        if 'name' in data:
            user.name = data['name']
        if 'subscription' in data:
            user.subscription = data['subscription']
    
        if 'password' in data and data['password']:
            user.password = generate_password_hash(str(data['password']))

        db.session.commit()
        return jsonify({
            "msg": "User updated",
            "user": user.serialize()
        }), 200

    except Exception as e:
        db.session.rollback()  # Rollback on error
        return jsonify({"msg": f"Error updating user: {str(e)}"}), 400


@user_bp.route('/user/<int:user_id>/avatar/upload', methods=['POST'])
@jwt_required()
def upload_avatar(user_id):
    try:
        user = User.query.get(user_id)

        if not user:
            return jsonify({"msg": "User not found"}), 404

        # Get email from JWT
        current_user_email = get_jwt_identity()

        # Compare JWT email with user email
        if user.email != current_user_email:
            return jsonify({"msg": "Access denied"}), 403

        # Check if the request has the file part
        if 'avatar' not in request.files:
            return jsonify({"msg": "No file part"}), 400

        file = request.files['avatar']
        if file.filename == '':
            return jsonify({"msg": "No selected file"}), 400

        if file and allowed_file(file.filename):
            # Crear directorio si no existe
            os.makedirs(UPLOAD_FOLDER, exist_ok=True)
            
            # Generar nombre de archivo seguro
            filename = secure_filename(file.filename)
            # Añadir ID de usuario para evitar colisiones
            filename = f"user_{user.id}_{filename}"
            
            # Ruta completa para guardar el archivo
            save_path = os.path.join(UPLOAD_FOLDER, filename)
            
            # Guardar el archivo
            file.save(save_path)
            
            # Guardar la ruta relativa en la base de datos
            user.avatar = f"/{save_path}"
            db.session.commit()
            
            return jsonify({
                "msg": "Avatar updated",
                "user": user.serialize()
            }), 200
        else:
            return jsonify({"msg": "File type not allowed"}), 400

    except Exception as e:
        db.session.rollback()  # Rollback on error
        print(f"Error uploading avatar: {str(e)}")
        return jsonify({"msg": f"Error uploading avatar: {str(e)}"}), 400

@user_bp.route('/user/password', methods=['PATCH'])
def update_password():
    data = request.get_json()
    email = data.get('email')
    verification_code = data.get('verificationCode')
    new_password = data.get('newPassword')
    
    if not email or not verification_code or not new_password:
        return jsonify({
            'status': 'ERROR', 
            'message': 'Faltan datos requeridos'
        }), 400

    if email in verification_codes:
        code_data = verification_codes[email]
        
        if datetime.now() > code_data['expires_at']:
            del verification_codes[email]
            return jsonify({
                'status': 'ERROR', 
                'message': 'El código ha expirado'
            }), 400

        if verification_code != code_data['code']:
            return jsonify({
                'status': 'ERROR', 
                'message': 'Código incorrecto'
            }), 400

    user = User.query.filter_by(email=email).first()
    if not user:
        return jsonify({
            'status': 'ERROR', 
            'message': 'Usuario no encontrado'
        }), 404
    
    try:
        password_hash = generate_password_hash(new_password)
        user.password = password_hash
        db.session.commit()

        if email in verification_codes:
            del verification_codes[email]

        return jsonify({
            'status': 'OK', 
            'message': 'Contraseña actualizada correctamente'
        }), 200

    except Exception as e:
        db.session.rollback()
        return jsonify({
            'status': 'ERROR', 
            'message': f'Error al actualizar la contraseña: {str(e)}'
        }), 500
