from flask import request, jsonify, Blueprint
from flask_jwt_extended import jwt_required, get_jwt_identity, get_jwt
from src.Backend.models import db, Comments, Offers



comments_bp = Blueprint('comments', __name__)

# endpoint para crear un comentario   
@comments_bp.route('/comments', methods=['POST'])
#@jwt_required() 
def create_comments():
    data = request.get_json()
    content = data.get("content")
    offer_id = data.get("offer_id")
    rating = data.get("rating")
    user_id = data.get("user_id")

    if not content or not user_id:
        return jsonify({"error": "Missing content or user_id"}), 400

    comment = Comments(
        user_id=user_id,
        content=content,
        offer_id=offer_id,
        rating=rating
    )
    db.session.add(comment)
    db.session.commit()
    return jsonify(comment.serialize()), 201

#endpoint para extraer comentarios de una offer en particular
@comments_bp.route('/offers/<int:offer_id>/comments', methods=['GET'])#ruta debe tener offer_id. No necesario tener usuario
def get_comments_from_offer(offer_id):
    comments=Comments.query.filter_by(offer_id=offer_id).all()
    return jsonify([a.serialize() for a in comments]), 200 #linea sacada de internet que convierte los comentarios en lista json

#endpoint para editar comentarios
@comments_bp.route('/comments/<int:comment_id>', methods=['PUT'])
#@jwt_required()
def edit_comment(comment_id):
    user_id= get_jwt_identity
    comment= Comments.query.get(comment_id)

    if not comment or comment.user_id!=user_id: #comprueba que haya comentario y que el usuario sea el que creó el comentario
        return jsonify({"error":"User not authorised"}),403
    data=request.get_json() #extrae los datos
    comment.content =data.get("content",comment.content)#linea sacada de mi proyecto para editar comentario
    db.session.commit()

    return jsonify({"msg":"Comment edited", "comment:":"comment.serialize()"}),200 #exito
    
#endpoint para extraer comentarios de un user en particular por si alguien quiere ver los comentarios que ha puesto
#copiada de get_comments_from_offer
@comments_bp.route('/offers/<int:user_id>/comments', methods=['GET'])#ruta debe tener offer_id. No necesario tener usuario
def get_comments_from_user(user_id):
    comments=Comments.query.filter_by(user_id=user_id).all()
    return jsonify([a.serialize() for a in comments]), 200 #linea sacada de internet que convierte los comentarios en lista json

#endpoint para borrar comentarios
@comments_bp.route('/comments/<int:comment_id>', methods=['DELETE'])
#@jwt_required()
def delete_comment(comment_id):
    #user_id= get_jwt_identity
    comment= Comments.query.get(comment_id)
    if not comment: #or comment.user_id!=user_id: #comprueba que haya comentario y que el usuario sea el que creó el comentario
        return jsonify({"error":"Empty comment!"}),403
    #en el futuro permitir comentario vacio para hacer solo valoracion
    db.session.delete(comment)
    db.session.commit()
    return jsonify({"msg":"Comment deleted"}),200

#endpoint para contar los comentarios que tiene una página
@comments_bp.route('/comments/<int:offer_id>/count', methods=['GET'])
def count_comments(offer_id):
    count=Comments.query.filter_by(offer_id=offer.id).count()
    return jsonify({"offer id":offer.id,"comment count:":count}),200
#más ideas: borrar comentarios de un usuario determinado, ver los comentarios más recientes, añadir likes a comentarios? y filtrar por likes
#endpoint para ver los comentarios más recientes
@comments_bp.route('/comments/<int:offer_id>/recent', methods=['GET'])
def get_recent_comments(offer:id):
    comments=Comments.query.filter_by(offer_id=offer.id).order_by(Comments.created_at.desc()).limit(10).all()#ordena por reciente hasta un limite de 10
    return jsonify([a.serialize() for a in comments]), 200 #reutilizada
#genera la media de ratings
@comments_bp.route('/comments/<int:offer_id>/average_rating', methods=['GET'])
def get_average_rating(offer_id):
    ratings = db.session.query(Comments.rating).filter_by(offer_id=offer_id).all()
    if not ratings:
        return jsonify({"average_rating": None}), 200
    avg = sum(r[0] for r in ratings) / len(ratings)
    return jsonify({"average_rating": round(avg, 2)}), 200