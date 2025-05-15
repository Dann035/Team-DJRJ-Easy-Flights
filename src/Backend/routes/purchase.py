from flask import Blueprint, jsonify, request
from Backend.models import db, Purchase, User, Offers, Payments
from sqlalchemy.orm import joinedload
from datetime import datetime
from flask_jwt_extended import jwt_required, get_jwt_identity

purchase_bp = Blueprint('purchase_bp', __name__)

# 1. Obtener todas las compras de un usuario
@purchase_bp.route("/user/<int:user_id>/purchases", methods=["GET"])
def get_user_purchases(user_id):
    try:
        purchases = db.session.query(Purchase).options(
            joinedload(Purchase.offer),
            joinedload(Purchase.payment)  # Asegúrate que sea .payment si la relación es singular
        ).filter(Purchase.user_id == user_id).all()

        purchase_data = []
        for purchase in purchases:
            purchase_data.append({
                "id": purchase.id,
                "total_amount": purchase.total_amount,
                "purchase_date": purchase.purchase_date,
                "offer": {
                    "id": purchase.offer.id,
                    "title": purchase.offer.title,
                    "price": purchase.offer.price,
                    "image_url": purchase.offer.image_url,
                    "description": purchase.offer.description,
                    "duration": purchase.offer.duration,
                },
                "payment": {
                    "id": purchase.payment.id,
                    "amount": purchase.payment.amount,
                    "payment_method": purchase.payment.payment_method,
                    "cardholder_name": purchase.payment.cardholder_name,
                    "card_number": f"**** **** **** {purchase.payment.card_number[-4:]}",
                    "status": purchase.payment.status,
                }
            })

        return jsonify({"purchases": purchase_data}), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500

# 2. Crear una nueva compra con datos de la oferta y el pago
@purchase_bp.route('/api/purchases', methods=['POST'])
@jwt_required() 
def create_purchase():
    try:
        data = request.get_json()
        user_id = get_jwt_identity() 

        offer_id = data.get('offer_id')
        payment_method = data.get('paymentMethod')
        cardholder_name = data.get('cardholderName')
        card_number = data.get('cardNumber').replace(" ", "")
        total_amount = data.get('price')  

        # Validar campos
        if not all([user_id, offer_id, payment_method, cardholder_name, card_number, total_amount]):
            return jsonify({"message": "Faltan campos obligatorios"}), 400

        # Validar existencia de usuario y oferta
        user = User.query.get(user_id)
        offer = Offers.query.get(offer_id)  # Asegúrate que es Offers, no Offer
        if not user or not offer:
            return jsonify({"message": "Usuario u oferta no encontrada"}), 404

        # Crear la compra
        new_purchase = Purchase(
            user_id=user.id,
            offer_id=offer.id,
            total_amount=total_amount,
            purchase_date=datetime.utcnow()
        )
        db.session.add(new_purchase)
        db.session.flush()

        # Crear el pago
        new_payment = Payments(
            purchase_id=new_purchase.id,
            amount=total_amount,
            payment_method=payment_method,
            cardholder_name=cardholder_name,
            card_number=card_number,
            status="completed"
        )
        db.session.add(new_payment)
        db.session.commit()

        return jsonify({
            "message": "Compra creada con éxito",
            "purchase_id": new_purchase.id
        }), 201

    except Exception as e:
        import traceback
        print("🔴 ERROR EN /api/purchases:")
        print(traceback.format_exc())
        return jsonify({"message": "Error interno", "error": str(e)}), 500