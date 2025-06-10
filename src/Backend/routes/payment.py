from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt, get_jwt_identity
from src.Backend.models import db, User, Payments, Offers
from datetime import datetime

payment_bp = Blueprint('payment', __name__)


# Crear un nuevo pago
@payment_bp.route('/payments', methods=['POST'])
@jwt_required()
def create_payment():
    try:
        claims = get_jwt()
        user_id = claims.get('user_id')
        roles = claims.get('roles', [])

        if not user_id or 'USER' not in roles:
            return jsonify({"msg": "Solo los clientes pueden hacer pagos"}), 403

        user = User.query.get(user_id)
        if not user:
            return jsonify({"msg": "Usuario no encontrado"}), 404

        data = request.get_json()
        amount = data.get('amount')
        offer_id = data.get('offer_id')
        payment_method = data.get('payment_method', 'Paypal')
        status = data.get('status', 'completed')
        cardholder_name = data.get('cardholderName')
        card_number = data.get('cardNumber')
        # Solo guardar los últimos 4 dígitos
        card_last4 = card_number[-4:] if card_number and len(card_number.replace(" ", "")) >= 4 else None

        if not all([amount, offer_id, cardholder_name, card_last4, payment_method]):
            return jsonify({"msg": "Faltan datos obligatorios"}), 400

        offer = Offers.query.get(offer_id)
        if not offer:
            return jsonify({"msg": "Oferta no encontrada"}), 404

        payment = Payments(
            amount=amount,
            offer_id=offer.id,
            user_id=user.id,
            payment_method=payment_method,
            status=status,
            cardholder_name=cardholder_name,
            card_number=card_number,
            created_at=datetime.utcnow()
        )

        db.session.add(payment)
        db.session.commit()

        # Serializar el pago incluyendo los datos necesarios para la factura
        payment_data = payment.serialize()
        payment_data["cardholderName"] = cardholder_name
        payment_data["paymentMethod"] = payment_method
        payment_data["cardNumber"] = f"**** **** **** {card_number}" if card_number else "No disponible"

        return jsonify({"msg": "Pago creado con éxito", "payment": payment_data}), 201

    except Exception as e:
        return jsonify({"msg": "Error creando el pago", "error": str(e)}), 400


# Obtener todos los pagos (admin)
@payment_bp.route('/payments', methods=['GET'])
@jwt_required()
def get_all_payments():
    user = User.query.get(get_jwt_identity())
    if not user or user.role != 'admin':
        return jsonify({"msg": "Acceso restringido a administradores"}), 403

    payments = Payments.query.all()
    return jsonify([p.serialize() for p in payments]), 200


# Obtener pagos propios (cliente)
@payment_bp.route('/payments/mine', methods=['GET'])
@jwt_required()
def get_my_payments():
    user = User.query.get(get_jwt_identity())
    if not user or user.role != 'cliente':
        return jsonify({"msg": "Solo los clientes pueden ver sus pagos"}), 403

    payments = Payments.query.filter_by(user_id=user.id).all()
    return jsonify([p.serialize() for p in payments]), 200


# Obtener pago por ID (admin o dueño)
@payment_bp.route('/payments/<int:id>', methods=['GET'])
@jwt_required()
def get_payment(id):
    user = User.query.get(get_jwt_identity())
    payment = Payments.query.get_or_404(id)

    if user.role != 'admin' and payment.user_id != user.id:
        return jsonify({"msg": "No autorizado"}), 403

    return jsonify(payment.serialize()), 200


# Actualizar pago (admin o dueño)
@payment_bp.route('/payments/<int:id>', methods=['PUT'])
@jwt_required()
def update_payment(id):
    user = User.query.get(get_jwt_identity())
    payment = Payments.query.get_or_404(id)

    if user.role != 'admin' and payment.user_id != user.id:
        return jsonify({"msg": "No autorizado"}), 403

    data = request.get_json()
    payment.amount = data.get('amount', payment.amount)
    payment.payment_method = data.get('payment_method', payment.payment_method)
    payment.status = data.get('status', payment.status)

    db.session.commit()
    return jsonify({"msg": "Pago actualizado", "payment": payment.serialize()}), 200


# Eliminar pago (admin o dueño)
@payment_bp.route('/payments/<int:id>', methods=['DELETE'])
@jwt_required()
def delete_payment(id):
    user = User.query.get(get_jwt_identity())
    payment = Payments.query.get_or_404(id)

    if user.role != 'admin' and payment.user_id != user.id:
        return jsonify({"msg": "No autorizado"}), 403

    db.session.delete(payment)
    db.session.commit()
    return jsonify({"msg": f"Pago con ID {id} eliminado"}), 200