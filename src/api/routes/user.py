from flask import Blueprint, request, jsonify
from api.models.base import db
from api.models.User import User
from flask_jwt_extended import jwt_required, create_access_token, get_jwt_identity, get_jwt
from werkzeug.security import generate_password_hash, check_password_hash

user_bp = Blueprint('user_bp', __name__)

@user_bp.route('/signup', methods=['POST'])
def signup():
    try:
        user_name = request.json.get('name', None)
        user_email = request.json.get('email', None)
        user_password = str(request.json.get('password', None))

        if not user_name:
            return jsonify({"msg": "Missing name"}), 400
        if not user_email:
            return jsonify({"msg": "Missing email"}), 400
        if not user_password:
            return jsonify({"msg": "Missing password"}), 400
        
        user = User.query.filter_by(email=user_email).first()
        if user:
            return jsonify({"msg": "User already exists"}), 409

        password_hash = generate_password_hash(user_password)
        new_user = User(name=user_name, email=user_email, password=password_hash)
        db.session.add(new_user)
        db.session.commit()
        return jsonify({
            "msg": "User created",
            "status": 'OK'}), 201 
    except Exception as e:
        return jsonify({
            "msg": "Error creating user",
            "Error": str(e)
        }), 400

@user_bp.route('/user/<int:user_id>', methods=['PUT'])
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
        user.email = data.get('email', user.email)
        if 'password' in data:
            user.password = generate_password_hash(str(data['password']))

        db.session.commit()
        return jsonify({
            "msg": "User updated",
            "user": user.serialize()
        }), 200

    except Exception as e:
        return jsonify({"msg": "Missing user" , "Error": str(e)}), 400

@user_bp.route('/login', methods=['POST'])
def login():
    try:
        current_user_email = request.json.get('email', None)
        current_user_password = str(request.json.get('password', None))
        current_role = request.json.get('role', None)

        if not current_role:
            return jsonify({"msg": "You must enter your role"}), 400
        if not current_user_email:
            return jsonify({"msg": "You must enter your email"}), 400
        if not current_user_password:
            return jsonify({"msg": "You must enter your password"}), 400

        user = User.query.filter_by(email=current_user_email).first()
        if not user:
            return jsonify({"msg": "User not found"}), 404

        if check_password_hash(user.password, current_user_password):
            access_token = create_access_token(
                identity=current_user_email,
                additional_claims={"role": current_role,"user": user.id}   
            )
            return jsonify({
                "msg": "Login successful", "token": access_token}), 200
        else:
            return jsonify({"msg": "User or Company not exist"}), 401
    except Exception as e:
        return jsonify({"msg": "Error login", "Error": str(e)}), 400

@user_bp.route('/protected', methods=['POST'])
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
        }), 200
    except Exception as e:
        return jsonify({"msg": "Missing data", "Error": str(e)}), 400