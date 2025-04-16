"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from flask_jwt_extended import jwt_required, create_access_token, get_jwt_identity, get_jwt
from werkzeug.security import generate_password_hash, check_password_hash

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)


@api.route('/signup', methods=['POST'])
def signup():
    try:
        user_name = request.json.get('name', None)
        user_email = request.json.get('email', None)
        user_password = request.json.get('password', None)

        if not user_name:
            return jsonify({"msg": "Missing name"}), 400
        if not user_email:
            return jsonify({"msg": "Missing email"}), 400
        if not user_password:
            return jsonify({"msg": "Missing password"}), 400
    except Exception as e:
        return jsonify({"msg": "Missing data signup"}), 400
    try:
        user = User.query.filter_by(email=user_email).first()
        if user:
            return jsonify({"msg": "User already exists"}), 409

        password_hash = generate_password_hash(user_password)
        new_user = User(name=user_name, email=user_email, password=password_hash)
        db.session.add(new_user)
        db.session.commit()
        return jsonify({
            "msg": "User created",
            "new_user":new_user.serialize()
        }), 201 
    except Exception as e:
        return jsonify({"msg": "Error creating user"}), 400

@api.route('/login', methods=['POST'])
def login():
    try:
        current_user_email = request.json.get('email', None)
        current_user_password = request.json.get('password', None)

        if not current_user_email:
            return jsonify({"msg": "You must enter your email"}), 400
        if not current_user_password:
            return jsonify({"msg": "You must enter your password"}), 400
    except Exception as e:
        return jsonify({
            "msg": "Missing data login",
            "Error": e.message
        }), 400
    try:
        user = User.query.filter_by(email=current_user_email).first()
        if not user:
            return jsonify({"msg": "User not found"}), 404

        if check_password_hash(user.password, current_user_password):
            access_token = create_access_token(
                identity=user.email,
                additional_claims=user.serialize()    
            )
            return jsonify({
                "msg": "Login successful", "token": access_token}), 200
        else:
            return jsonify({"msg": "User not exist"}), 401
    except Exception as e:
        return jsonify({"msg": "Error creating user"}), 400

@api.route('/protected', methods=['POST'])
@jwt_required()
def secret():
    try:
        current_user = get_jwt_identity()
        claims = get_jwt()
        
        if not current_user:
            return jsonify({"msg": "Missing user"}), 400
        
        user = User.query.filter_by(email=current_user).first()
        if not user:
            return jsonify({"msg": "User not found"}), 404
        
        return jsonify({
            "msg": "Access Allowed",
            "user": user.serialize(),
        }), 200
    except Exception as e:
        return jsonify({"msg": "Missing data"}), 400


@api.route('/users', methods=['GET'])
@jwt_required()
def get_users():
    try:
        current_user = get_jwt_claims()
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
            'Error': e.message
        }), 400