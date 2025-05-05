from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from models import db, User, Payment  # Asegúrate de que esto esté bien importado

payment_bp = Blueprint('payment', __name__)

# Crear un nuevo pago después de la aprobación de PayPal
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

    if not all([payer_name, amount, order_id]):
        return jsonify({"message": "Faltan datos obligatorios"}), 400

    payment = Payment(
        payer_name=payer_name,
        amount=amount,
        order_id=order_id,
        user_id=user.id
    )

    db.session.add(payment)
    db.session.commit()

    return jsonify({"message": "Pago registrado con éxito"}), 201


# Obtener pagos del cliente autenticado
@payment_bp.route('/api/payments/mine', methods=['GET'])
@jwt_required()
def get_my_payments():
    user_id = get_jwt_identity()
    user = User.query.get(user_id)

    if not user or user.role != 'cliente':
        return jsonify({"message": "Solo los clientes pueden ver sus pagos"}), 403

    payments = Payment.query.filter_by(user_id=user.id).all()
    result = [{
        "id": p.id,
        "payer_name": p.payer_name,
        "amount": str(p.amount),
        "order_id": p.order_id,
        "created_at": p.created_at.isoformat()
    } for p in payments]

    return jsonify(result), 200