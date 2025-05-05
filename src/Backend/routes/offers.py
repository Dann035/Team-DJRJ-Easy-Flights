from flask import request, jsonify, Blueprint
from Backend.models import db, Offers
from flask_jwt_extended import jwt_required
from Backend.auth_decorators import role_required

offers_bp = Blueprint('offers', __name__)


#Enpoint de crear ofertas
@offers_bp.route('/offers', methods=['POST'])
@jwt_required()
@role_required('COMPANY_ADMIN')
def create_offer():

        data = request.get_json()

        if not all(field in data for field in ['title', 'description', 'price', 'type_offert', 'image_url', 'location', 'duration']):
            return jsonify({'message': 'Missing fields'}), 400

        new_offer = Offers(
            title=data['title'], 
            description=data['description'], 
            price=data['price'], 
            type_offert=data['type_offert'], 
            image_url=data['image_url'], 
            location=data['location'], 
            duration=data['duration']
        )
        
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


#Enpoint de obtener una oferta      
@offers_bp.route('/offers/<int:offer_id>', methods=['GET'])
def get_offer(offer_id):
    offer= Offers.query.get(offer_id)
    if not offer:
        return jsonify({"msg": "Offer not found"}), 404
    
    #data
    return jsonify({
        "msg": "Offer retrieved",
        "offer": offer.serialize()
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
    location = request.json.get('location', None)
    duration = request.json.get('duration', None)
    tags = request.json.get('tags', None)

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
    if location:
        offer.location = location
    if duration:
        offer.duration = duration    
    if tags:
        offer.tags = tags 

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


