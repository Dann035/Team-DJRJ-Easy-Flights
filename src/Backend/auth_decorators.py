from functools import wraps
from flask_jwt_extended import jwt_required, get_jwt_identity
from flask import jsonify
from sqlalchemy.exc import IntegrityError
from .models.UserRole import UserRole

def role_required(*roles):
    def decorator(func):
        @wraps(func)
        @jwt_required()
        def wrapper(*args, **kwargs):
            user_id = get_jwt_identity()
            user_roles = UserRole.query.filter_by(user_id=user_id).all()
            user_role_names = [ur.role.name for ur in user_roles]
            if not any(role in user_role_names for role in roles):
                return jsonify({"msg": "Access denied"}), 403
            return func(*args, **kwargs)
        return wrapper
    return decorator