from flask import request, jsonify, Blueprint
from Backend.models.base import db
from Backend.models.Offers import Offers


offers_bp = Blueprint('offers', __name__)


@offers_bp.route('/', methods=['GET'])
def hello():
    return jsonify({"msg": "Hello from the offers"}), 200

#Enpoint de crear ofertas
@offers_bp.route('/offers', methods=['POST'])
def create_offer():
        title = request.json.get('title', None)
        description = request.json.get('description', None)
        price = request.json.get('price', None)
        type_offert = request.json.get('type_offert', None)
        image_url = request.json.get('image_url', None)
           

        if not title:
            return jsonify({"msg": "Missing title"}), 400
        if not description:
            return jsonify({"msg": "Missing description"}), 400
        if not price:
            return jsonify({"msg": "Missing price"}), 400
        if not type_offert: 
            return jsonify({"msg": "Missing type_offert"}), 400
        if not image_url:
            return jsonify({"msg": "Missing image_url"}), 400

    

        new_offer = Offers(title=title, description=description, price=price, type_offert=type_offert, image_url=image_url)
        db.session.add(new_offer)
        db.session.commit()

        return jsonify({
            "msg": "Offer created successfully",
            "offer": new_offer.serialize()
        }), 201
  
#Enpoint de obtener ofertas
@offers_bp.route('/offers', methods=['GET'])
def get_offers():
        offers = Offers.query.all()
    
        
        offers_serialized = [offer.serialize() for offer in offers]
        return jsonify({
            "msg": "Offers retrieved",
            "offers": offers_serialized
        }), 200
     

#Enpoint de modificar ofertas
@offers_bp.route('/offers/<int:offer_id>', methods=['PUT'])
def update_offer(offer_id):
    offer = Offers.query.get(offer_id)
    if not offer:
        return jsonify({"msg": "Offer not found"}), 404
    
    title = request.json.get('title', None)
    description = request.json.get('description', None)
    price = request.json.get('price', None)
    type_offert = request.json.get('type_offert', None)
    image_url = request.json.get('image_url', None)

    if title:
        offer.title = title
    if description:
        offer.description = description
    if price:
        offer.price = price
    if type_offert:
        offer.type_offert = type_offert
    if image_url:
        offer.image_url = image_url

    db.session.commit()

    return jsonify({
        "msg": "Offer updated successfully",
        "offer": offer.serialize()
    }), 200


##Enpoint de eliminar ofertas
@offers_bp.route('/offers/<int:offer_id>', methods=['DELETE'])
def delete_offer(offer_id):
    offer = Offers.query.get(offer_id)
    if not offer:
        return jsonify({"msg": "Offer not found"}), 404
    
    db.session.delete(offer)
    db.session.commit()

    return jsonify({
        "msg": "Offer deleted successfully"
    }), 200


