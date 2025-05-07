from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from Backend.models import db, User, Payments, Offers
from datetime import datetime

payment_bp = Blueprint('payment', __name__)

# Crear un nuevo pago
@payment_bp.route('/api/payments', methods=['POST'])
@jwt_required()
def create_payment():
    user_id = get_jwt_identity()
    user = User.query.get(user_id)

    if not user or user.role != 'cliente':
        return jsonify({"message": "Solo los clientes pueden hacer pagos"}), 403

    data = request.get_json()
    payer_name = data.get('payerName')
    amount = data.get('amount')
    order_id = data.get('orderID')
    offer_id = data.get('offerID')

    if not all([payer_name, amount, order_id, offer_id]):
        return jsonify({"message": "Faltan datos obligatorios"}), 400

    offer = Offers.query.get(offer_id)
    if not offer:
        return jsonify({"message": "Oferta no encontrada"}), 404

    payment = Payments(
        amount=amount,
        payment_method="Paypal",
        status="completed",
        user_id=user.id,
        offer_id=offer.id,
        created_at=datetime.utcnow()
    )

    db.session.add(payment)
    db.session.commit()

    return jsonify({"message": "Pago registrado con éxito", "payment": payment.serialize()}), 201


# Obtener todos los pagos (solo admin)
@payment_bp.route('/api/payments', methods=['GET'])
@jwt_required()
def get_all_payments():
    user_id = get_jwt_identity()
    user = User.query.get(user_id)

    if not user or user.role != 'admin':
        return jsonify({"message": "Acceso restringido a administradores"}), 403

    payments = Payments.query.all()
    return jsonify([p.serialize() for p in payments]), 200


# Obtener pagos del cliente autenticado
@payment_bp.route('/api/payments/mine', methods=['GET'])
@jwt_required()
def get_my_payments():
    user_id = get_jwt_identity()
    user = User.query.get(user_id)

    if not user or user.role != 'cliente':
        return jsonify({"message": "Solo los clientes pueden ver sus pagos"}), 403

    payments = Payments.query.filter_by(user_id=user.id).all()
    result = [payment.serialize() for payment in payments]

    return jsonify(result), 200


# Obtener un solo pago por ID (admin o dueño)
@payment_bp.route('/api/payments/<int:id>', methods=['GET'])
@jwt_required()
def get_payment(id):
    user_id = get_jwt_identity()
    user = User.query.get(user_id)

    payment = Payments.query.get_or_404(id)

    if user.role != 'admin' and payment.user_id != user.id:
        return jsonify({"message": "No autorizado"}), 403

    return jsonify(payment.serialize()), 200


# Actualizar un pago existente
@payment_bp.route('/api/payments/<int:id>', methods=['PUT'])
@jwt_required()
def update_payment(id):
    user_id = get_jwt_identity()
    user = User.query.get(user_id)

    payment = Payments.query.get_or_404(id)

    if user.role != 'admin' and payment.user_id != user.id:
        return jsonify({"message": "No autorizado"}), 403

    data = request.get_json()
    payment.amount = data.get('amount', payment.amount)
    payment.payment_method = data.get('payment_method', payment.payment_method)
    payment.status = data.get('status', payment.status)

    db.session.commit()
    return jsonify({"message": "Pago actualizado", "payment": payment.serialize()}), 200


# Eliminar un pago
@payment_bp.route('/api/payments/<int:id>', methods=['DELETE'])
@jwt_required()
def delete_payment(id):
    user_id = get_jwt_identity()
    user = User.query.get(user_id)

    payment = Payments.query.get_or_404(id)

    if user.role != 'admin' and payment.user_id != user.id:
        return jsonify({"message": "No autorizado"}), 403

    db.session.delete(payment)
    db.session.commit()
    return jsonify({"message": f"Pago con ID {id} eliminado"}), 200