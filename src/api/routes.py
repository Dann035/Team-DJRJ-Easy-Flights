"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from flask_jwt_extended import jwt_required, create_access_token, get_jwt_identity, get_claims
from werkzeug.security import generate_password_hash, check_password_hash

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200


@api.route('/signup', methods=['POST'])
def signup():
    try:
        name = request.json.get('name', None)
        email = request.json.get('name', None)
        password = request.json.get('name', None)

        if not name:
            return jsonify({"msg": "Missing name"}), 400
        if not email:
            return jsonify({"msg": "Missing email"}), 400
        if not password:
            return jsonify({"msg": "Missing password"}), 400
    except Exception as e:
        return jsonify({"msg": "Missing data"}), 400
    try:
        user = User.query.filter_by(email=email).first()
        if user:
            return jsonify({"msg": "User already exists"}), 409

        password_hash = generate_password_hash(password)
        new_user = User(name+name, email=email, password=password_hash)
        db.session.add(new_user)
        db.session.commit()
        return jsonify({"msg": "User created"}), 201
    except Exception as e:
        return jsonify({"msg": "Error creating user"}), 400

@api.route('/login', methods=['POST'])
def login():
    try:
        current_user_email = request.json.get('name', None)
        current_user_password = request.json.get('name', None)

        if not current_user_email:
            return jsonify({"msg": "You must enter your email"}), 400
        if not current_user_password:
            return jsonify({"msg": "You must enter your password"}), 400
    except Exception as e:
        return jsonify({"msg": "Missing data"}), 400
    try:
        user = User.query.filter_by(email=current_user_email).first()
        if not user:
            return jsonify({"msg": "User not found"}), 404

        if check_password_hash(user.password, current_user_password):
            access_token = create_access_token(identity=user.id)
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
        claims = get_claims()
        
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


@api.route('/user/<int:user_id>', methods=['GET'])
def signup():
    pass

@api.route('/login', methods=['POST'])
def signup():
    pass