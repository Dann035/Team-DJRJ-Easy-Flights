from flask import request, jsonify, Blueprint
from api.models.Roles import Roles
from api.models.Companies import Companies
from api.models.Offers import Offers
from api.models.Comments import Comments
from api.models.User import User
from api.models.base import db
from flask_jwt_extended import jwt_required, create_access_token, get_jwt_identity, get_jwt
from werkzeug.security import generate_password_hash, check_password_hash
from functools import wraps

admin_bp = Blueprint('admin', __name__, url_prefix='/admin')

def role_required(role):
    def decorator(fn):
        @wraps(fn)
        def wrapper(*args, **kwargs):
            claims = get_jwt()
            if claims.get("role") != role:
                return jsonify({"msg": "Access denied: insufficient permissions"}), 403
            return fn(*args, **kwargs)
        return wrapper
    return decorator


@admin_bp.route('/users', methods=['GET'])
@jwt_required()
@role_required('admin')
def get_users():
    try:
        current_user = get_jwt()
        if current_user['role'] != 'admin':
            return jsonify({"msg": "Access denied"}), 403
        
        users = User.query.all()
        if not users:
            return jsonify({"msg": "No users found"}), 404
        
        users_serialized = [user.serialize() for user in users]
        return jsonify({
            "msg": "Users retrieved",
            "users": users_serialized
        }),
    except Exception as e:
        return jsonify({
            "msg": "Error retrieving users",
            'Error': str(e)
        }), 400

@admin_bp.route('/user/<int:user_id>', methods=['PUT'])
@jwt_required()
@role_required('admin')
def admin_edit_user(user_id):
    try:
        user = User.query.get(user_id)
        if not user:
            return jsonify({"msg": "User not found"}), 404
        data = request.get_json()
        user.name = data.get('name', user.name)
        user.email = data.get('email', user.email)
        if 'password' in data:
            user.password = generate_password_hash(str(data['password']))
        db.session.commit()
        return jsonify({"msg": "User updated by admin", "user": user.serialize()}), 200
    except Exception as e:
        return jsonify({
            "msg": "Error updating user",
            "Error": str(e)
        }), 400

@admin_bp.route('/user/<int:user_id>', methods=['DELETE'])
@jwt_required()
@role_required('admin')
def admin_delete_user(user_id):
    try:
        user = User.query.get(user_id)
        if not user:
            return jsonify({"msg": "User not found"}), 404
        db.session.delete(user)
        db.session.commit()
        return jsonify({"msg": "User deleted by admin"}), 200
    except Exception as e:
        return jsonify({
            "msg": "Error deleting user",
            "Error": str(e)
        }), 400

@admin_bp.route('/company/<int:company_id>', methods=['DELETE'])
@jwt_required()
@role_required('admin')
def admin_delete_company(company_id):
    try:
        company = Companies.query.get(company_id)
        if not company:
            return jsonify({"msg": "Company not found"}), 404
        db.session.delete(company)
        db.session.commit()
        return jsonify({"msg": "Company deleted by admin"}), 200
    except Exception as e:
        return jsonify({
            "msg": "Error deleting company",
            "Error": str(e)
        }), 400