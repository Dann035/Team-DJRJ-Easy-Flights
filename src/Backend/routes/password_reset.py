from flask import Blueprint, request, jsonify
from src.Backend.models import User, db
from flask_jwt_extended import create_access_token
import random
import string
import datetime
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import os
from dotenv import load_dotenv
from flask_mail import Mail, Message, current_app
from werkzeug.security import generate_password_hash

# Cargar variables de entorno
load_dotenv()

pass_bp = Blueprint('pass', __name__)

# Diccionario para almacenar temporalmente los códigos de verificación
# En producción, esto debería almacenarse en una base de datos
verification_codes = {}

# Función para enviar correo electrónico
def send_email(to_email, subject, body_html):
    try:
        mail = Mail(current_app)
        msg = Message(
            subject=subject,
            recipients=[to_email],
            html=body_html,
            sender=current_app.config.get('MAIL_DEFAULT_SENDER')
        )
        mail.send(msg)
        return True
    except Exception as e:
        print(f"Error al enviar correo: {e}")
        return False

# Ruta para solicitar recuperación de contraseña
@pass_bp.route('reset-password/request', methods=['POST'])
def request_password_reset():
    data = request.get_json()
    email = data.get('email')
    
    if not email:
        return jsonify({'status': 'ERROR', 'message': 'Correo electrónico requerido'}), 400
    
    # Verificar si el usuario existe
    user = User.query.filter_by(email=email).first()
    if not user:
        # Por seguridad, no revelamos que el correo no existe
        return jsonify({'status': 'OK', 'message': 'Si el correo existe, recibirás un código de verificación'}), 200
    
    # Generar código de verificación (6 dígitos)
    verification_code = ''.join(random.choices(string.digits, k=6))
    
    # Almacenar código con expiración (30 minutos)
    expiration_time = datetime.datetime.now() + datetime.timedelta(minutes=30)
    verification_codes[email] = {
        'code': verification_code,
        'expires_at': expiration_time
    }
    
    # Crear el contenido HTML del correo
    html_content = f"""
    <html>
        <head>
            <style>
                body {{ font-family: Arial, sans-serif; line-height: 1.6; color: #333; }}
                .container {{ max-width: 600px; margin: 0 auto; padding: 20px; }}
                .header {{ background: linear-gradient(to right, #1a2980, #26d0ce); color: white; padding: 20px; text-align: center; border-radius: 5px 5px 0 0; }}
                .content {{ padding: 20px; border: 1px solid #ddd; border-top: none; border-radius: 0 0 5px 5px; }}
                .code {{ font-size: 24px; font-weight: bold; background-color: #f5f5f5; padding: 10px; text-align: center; letter-spacing: 5px; margin: 20px 0; }}
                .footer {{ text-align: center; margin-top: 20px; font-size: 12px; color: #999; }}
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <h1>Recuperación de Contraseña</h1>
                </div>
                <div class="content">
                    <p>Estimado/a usuario/a,</p>
                    <p>Recibimos una solicitud para restablecer la contraseña de tu cuenta. Utiliza el siguiente código de verificación para completar el proceso:</p>
                    
                    <div class="code">{verification_code}</div>
                    
                    <p>Este código expirará en 30 minutos.</p>
                    <p>Si no solicitaste restablecer tu contraseña, puedes ignorar este correo.</p>
                    <p>Saludos,<br>El equipo de Easy Flights</p>
                </div>
                <div class="footer">
                    <p>Este es un correo automático, por favor no respondas a este mensaje.</p>
                </div>
            </div>
        </body>
    </html>
    """
    
    # Intentar enviar el correo
    if send_email(email, "Código de verificación - Easy Flights", html_content):
        return jsonify({'status': 'OK', 'message': 'Código de verificación enviado'}), 200
    else:
        return jsonify({'status': 'ERROR', 'message': 'Error al enviar el correo electrónico'}), 500

# Ruta para verificar código
@pass_bp.route('/reset-password/verify', methods=['POST'])
def verify_reset_code():
    data = request.get_json()
    email = data.get('email')
    code = data.get('code')
    
    if not email or not code:
        return jsonify({'status': 'ERROR', 'message': 'Correo y código requeridos'}), 400
    
    # Verificar si existe un código para este email
    if email not in verification_codes:
        return jsonify({'status': 'ERROR', 'message': 'Código inválido o expirado'}), 400
    
    # Obtener datos del código
    code_data = verification_codes[email]
    
    # Verificar si el código ha expirado
    if datetime.datetime.now() > code_data['expires_at']:
        del verification_codes[email]
        return jsonify({'status': 'ERROR', 'message': 'El código ha expirado'}), 400
    
    # Verificar si el código es correcto
    if code != code_data['code']:
        return jsonify({'status': 'ERROR', 'message': 'Código incorrecto'}), 400
    
    # Código verificado correctamente (no eliminamos el código aún, se usará en el reset)
    return jsonify({'status': 'OK', 'message': 'Código verificado correctamente'}), 200

# Ruta para cambiar la contraseña
@pass_bp.route('/reset-password/reset', methods=['POST'])
def reset_password():
    data = request.get_json()
    user_email = data.get('email')
    code = data.get('code')
    new_password = data.get('newPassword')
    
    if not user_email or not code or not new_password:
        return jsonify({'status': 'ERROR', 'message': 'Faltan datos requeridos'}), 400
    
    # Verificar si existe un código para este email
    if user_email not in verification_codes:
        return jsonify({'status': 'ERROR', 'message': 'Código inválido o expirado'}), 400

    # Obtener datos del código
    code_data = verification_codes[user_email]

    # Verificar si el código ha expirado
    if datetime.datetime.now() > code_data['expires_at']:
        del verification_codes[user_email]
        return jsonify({'status': 'ERROR', 'message': 'El código ha expirado'}), 400

    # Verificar si el código es correcto
    if code != code_data['code']:
        return jsonify({'status': 'ERROR', 'message': 'Código incorrecto'}), 400

    # Buscar al usuario en la base de datos
    user = User.query.filter_by(email=user_email).first()
    if not user:
        return jsonify({'status': 'ERROR', 'message': 'Usuario no encontrado'}), 404
    
    # Actualizar la contraseña
    hashed_password = generate_password_hash(new_password)
    user.password = hashed_password
    
    # Guardar cambios en la base de datos
    db.session.commit()
    
    # Eliminar el código de verificación
    del verification_codes[user.email]
    
    return jsonify({'status': 'OK', 'message': 'Contraseña actualizada correctamente'}), 200