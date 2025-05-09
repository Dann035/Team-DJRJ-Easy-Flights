from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from werkzeug.security import generate_password_hash
from Backend.models import db, User
import os

# Obtener la URL base del backend desde las variables de entorno
API_URL = os.getenv('VITE_BACKEND_URL', 'https://legendary-space-fortnight-97jggx7575g73xjgx-3001.app.github.dev')  # Valor por defecto si no está configurado

profile_bp = Blueprint('profile_bp', __name__)

# 📌 Obtener perfil del usuario autenticado
@profile_bp.route('/profile', methods=['GET'])
@jwt_required()
def get_profile():
    try:
        user_id = get_jwt_identity()
        user = User.query.get(user_id)
        if not user:
            return jsonify({"msg": "Usuario no encontrado"}), 404
        return jsonify({
            "profile": user.serialize()
        }), 200
    except Exception as e:
        return jsonify({"msg": "Error al obtener perfil", "error": str(e)}), 500

# ✏️ Editar perfil del usuario autenticado
@profile_bp.route('/profile/edit', methods=['PUT'])
@jwt_required()
def edit_profile():
    try:
        user_id = get_jwt_identity()
        user = User.query.get(user_id)

        if not user:
            return jsonify({"msg": "Usuario no encontrado"}), 404

        data = request.get_json()

        # Actualiza los campos si están presentes
        user.name = data.get('name', user.name)
        user.email = data.get('email', user.email)

        # Cambiar contraseña solo si se envía
        new_password = data.get('password')
        if new_password:
            user.password = generate_password_hash(new_password)

        db.session.commit()

        return jsonify({
            "msg": "Perfil actualizado exitosamente",
            "user": user.serialize()
        }), 200

    except Exception as e:
        return jsonify({"msg": "Error al actualizar perfil", "error": str(e)}), 500

# 🌐 Obtener URL pública del perfil del usuario
@profile_bp.route('/profile-url', methods=['GET'])
@jwt_required()
def get_profile_url():
    try:
        user_id = get_jwt_identity()
        user = User.query.get(user_id)
        if not user:
            return jsonify({"msg": "User not found"}), 404

        # Utiliza la URL del frontend configurada en el archivo .env
        profile_url = f"{API_URL}/profile/{user.id}"

        return jsonify({
            "msg": "Profile URL retrieved successfully",
            "profile_url": profile_url
        }), 200

    except Exception as e:
        return jsonify({"msg": "Error fetching profile URL", "error": str(e)}), 500