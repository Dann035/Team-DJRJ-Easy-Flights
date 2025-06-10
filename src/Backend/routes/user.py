from src.Backend.models import db, User,Companies, Roles, UserRole, Payments, Offers
from src.Backend.auth_decorators import role_required
import os
from flask import Blueprint, request, jsonify
from sqlalchemy.exc import IntegrityError
from flask_jwt_extended import jwt_required, create_access_token, get_jwt_identity, get_jwt
from werkzeug.security import generate_password_hash, check_password_hash
from werkzeug.utils import secure_filename
from datetime import datetime, timedelta
from .password_reset import verification_codes
import cloudinary.uploader

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

        current_user_email = get_jwt_identity()
        if user.email != current_user_email:
            return jsonify({"msg": "Access denied"}), 403

        if 'avatar' not in request.files:
            return jsonify({"msg": "No file part"}), 400

        file = request.files['avatar']
        if file.filename == '':
            return jsonify({"msg": "No selected file"}), 400

        if not allowed_file(file.filename):
            return jsonify({"msg": "File type not allowed"}), 400

        # Eliminar avatar anterior de Cloudinary si existe
        if user.avatar and "cloudinary.com" in user.avatar:
            # Extraer public_id de la URL de Cloudinary
            try:
                public_id = user.avatar.split("/")[-1].split(".")[0]
                cloudinary.uploader.destroy(public_id)
            except Exception as e:
                print(f"Error deleting old Cloudinary avatar: {str(e)}")

        # Subir nuevo avatar a Cloudinary
        try:
            result = cloudinary.uploader.upload(file)
            avatar_url = result.get('secure_url')
        except Exception as e:
            print(f"Cloudinary upload error: {str(e)}")
            return jsonify({"msg": f"Error uploading to Cloudinary: {str(e)}"}), 500

        user.avatar = avatar_url
        db.session.commit()

        return jsonify({
            "msg": "Avatar updated",
            "user": user.serialize()
        }), 200

    except Exception as e:
        db.session.rollback()
        print(f"Error uploading avatar: {str(e)}")
        return jsonify({"msg": f"Error uploading avatar: {str(e)}"}), 400
# @user_bp.route('/user/<int:user_id>/avatar/upload', methods=['POST'])
# @jwt_required()
# def upload_avatar(user_id):
#     try:
#         user = User.query.get(user_id)

#         if not user:
#             return jsonify({"msg": "User not found"}), 404

#         current_user_email = get_jwt_identity()

#         if user.email != current_user_email:
#             return jsonify({"msg": "Access denied"}), 403

#         if 'avatar' not in request.files:
#             return jsonify({"msg": "No file part"}), 400

#         file = request.files['avatar']
#         if file.filename == '':
#             return jsonify({"msg": "No selected file"}), 400

#         if file and allowed_file(file.filename):
#             os.makedirs(UPLOAD_FOLDER, exist_ok=True)

#             # Eliminar avatar anterior si existe
#             if user.avatar and user.avatar.strip() != "":
#                 old_avatar_path = user.avatar.lstrip("/")
#                 if os.path.exists(old_avatar_path):
#                     try:
#                         os.remove(old_avatar_path)
#                     except Exception as e:
#                         print(f"Error deleting old avatar: {str(e)}")

#             # Generar nombre de archivo seguro
#             filename = secure_filename(file.filename)
#             filename = f"user_{user.id}_{filename}"
#             save_path = os.path.join(UPLOAD_FOLDER, filename)

#             file.save(save_path)
#             user.avatar = f"/{save_path}"
#             db.session.commit()

#             return jsonify({
#                 "msg": "Avatar updated",
#                 "user": user.serialize()
#             }), 200
#         else:
#             return jsonify({"msg": "File type not allowed"}), 400

#     except Exception as e:
#         db.session.rollback()
#         print(f"Error uploading avatar: {str(e)}")
#         return jsonify({"msg": f"Error uploading avatar: {str(e)}"}), 400

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


#endpoint de pagos 
@user_bp.route('/user/<int:user_id>/payments', methods=['POST'])
@jwt_required()
def create_payment(user_id):
    try:
        current_user_email = get_jwt_identity()
        user = User.query.filter_by(email=current_user_email).first()

        if not user or user.id != user_id:
            return jsonify({"msg": "Access denied"}), 403

        data = request.get_json()
        required_fields = ['amount', 'payment_method', 'status', 'offer_id']

        if not all(field in data for field in required_fields):
            return jsonify({"msg": "Faltan campos requeridos"}), 400

        new_payment = Payments(
            amount=data['amount'],
            payment_method=data['payment_method'],
            created_at=datetime.utcnow().isoformat(),
            status=data['status'],
            user_id=user_id,
            offer_id=data['offer_id']
        )

        db.session.add(new_payment)
        db.session.commit()

        return jsonify({
            "msg": "Pago registrado exitosamente",
            "payment": new_payment.serialize()
        }), 201

    except Exception as e:
        db.session.rollback()
        print(f"Error al registrar el pago: {str(e)}")
        return jsonify({"msg": f"Error al registrar el pago: {str(e)}"}), 500

@user_bp.route('/user/<int:user_id>/payments', methods=['GET'])
@jwt_required()
def get_user_payments(user_id):
    try:
        current_user_email = get_jwt_identity()
        user = User.query.filter_by(email=current_user_email).first()

        if not user or user.id != user_id:
            return jsonify({"msg": "Access denied"}), 403

        payments = Payments.query.filter_by(user_id=user_id).order_by(Payments.created_at.desc()).all()

        return jsonify({
            "payments": [p.serialize() for p in payments]
        }), 200

    except Exception as e:
        print(f"Error al obtener pagos: {str(e)}")
        return jsonify({"msg": f"Error al obtener pagos: {str(e)}"}), 500
    
    #PURCHASE