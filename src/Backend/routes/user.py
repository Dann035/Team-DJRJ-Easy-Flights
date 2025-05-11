import os
from flask import Blueprint, request, jsonify
from Backend.models import db, User,Companies, Roles, UserRole
from sqlalchemy.exc import IntegrityError
from flask_jwt_extended import jwt_required, create_access_token, get_jwt_identity, get_jwt
from werkzeug.security import generate_password_hash, check_password_hash
from werkzeug.utils import secure_filename
from Backend.auth_decorators import role_required
from datetime import datetime, timedelta
from .password_reset import verification_codes


UPLOAD_FOLDER = "static/avatars"  # Ajusta la ruta según tu estructura
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif'}

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

user_bp = Blueprint('user_bp', __name__)

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
        
        if datetime.datetime.now() > code_data['expires_at']:
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