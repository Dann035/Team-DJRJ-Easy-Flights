from flask import Blueprint, request, jsonify, abort
from datetime import datetime
from Backend.models import db, Payments, Offers, User
from flask_jwt_extended import jwt_required, get_jwt_identity

payment_bp = Blueprint('payment_bp', __name__)

# Ruta para crear un nuevo pago
@payment_bp.route('/payments', methods=['POST'])
@jwt_required()  # Asegúrate de que el usuario esté autenticado
def create_payment():
    data = request.get_json()

    # Validación de campos requeridos
    required_fields = ['offer_id', 'payment_method', 'cardholder_name', 'card_number']
    for field in required_fields:
        if field not in data:
            return jsonify({'error': f'Falta el campo {field}'}), 400

    # Verificar si la oferta existe
    offer = Offers.query.get(data['offer_id'])
    if not offer:
        return jsonify({'error': 'Oferta no encontrada'}), 404

    # Obtener el user_id del JWT
    user_id = get_jwt_identity()  # Se obtiene directamente del JWT
    if not user_id:
        return jsonify({'error': 'Usuario no autenticado'}), 401

    user = User.query.get(user_id)
    if not user:
        return jsonify({'error': 'Usuario no encontrado'}), 404

    # Crear el nuevo pago
    payment = Payments(
        amount=offer.price,
        payment_method=data['payment_method'],
        status='completed',
        created_at=datetime.utcnow(),
        cardholder_name=data['cardholder_name'],
        card_number=data['card_number'],
        user_id=user.id,
        offer_id=offer.id
    )

    try:
        db.session.add(payment)
        db.session.commit()
        return jsonify({'message': 'Pago creado exitosamente', 'payment': payment.serialize()}), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

# Ruta para obtener un pago específico
@payment_bp.route('/payments/<int:id>', methods=['GET'])
def get_payment(id):
    payment = Payments.query.get(id)
    if not payment:
        return jsonify({'error': 'Pago no encontrado'}), 404
    return jsonify({'payment': payment.serialize()}), 200

# Ruta para obtener todos los pagos de un usuario
@payment_bp.route('/users/<int:user_id>/payments', methods=['GET'])
def get_user_payments(user_id):
    user = User.query.get(user_id)
    if not user:
        return jsonify({'error': 'Usuario no encontrado'}), 404
    payments = Payments.query.filter_by(user_id=user.id).all()
    return jsonify({'payments': [payment.serialize() for payment in payments]}), 200

# Ruta para actualizar un pago
@payment_bp.route('/payments/<int:id>', methods=['PUT'])
@jwt_required()  # Asegúrate de que el usuario esté autenticado
def update_payment(id):
    # Obtener el user_id del JWT
    user = User.query.get(get_jwt_identity())
    payment = Payments.query.get_or_404(id)

    # Verificar que el usuario sea el propietario del pago o sea un administrador
    if user.role != 'admin' and payment.user_id != user.id:
        return jsonify({"msg": "No autorizado"}), 403

    data = request.get_json()
    payment.payment_method = data.get('payment_method', payment.payment_method)
    payment.status = data.get('status', payment.status)
    payment.purchase_id = data.get('purchase_id', payment.purchase_id)

    db.session.commit()
    return jsonify({"msg": "Pago actualizado", "payment": payment.serialize()}), 200

# Ruta para eliminar un pago
@payment_bp.route('/payments/<int:id>', methods=['DELETE'])
@jwt_required()  # Asegúrate de que el usuario esté autenticado
def delete_payment(id):
    # Obtener el user_id del JWT
    user = User.query.get(get_jwt_identity())
    payment = Payments.query.get_or_404(id)

    # Verificar que el usuario sea el propietario del pago o sea un administrador
    if user.role != 'admin' and payment.user_id != user.id:
        return jsonify({"msg": "No autorizado"}), 403

    db.session.delete(payment)
    db.session.commit()
    return jsonify({"msg": f"Pago con ID {id} eliminado"}), 200