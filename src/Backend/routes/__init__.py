
from flask import Blueprint

from .user import user_bp
from .admin import admin_bp
from .offers import offers_bp
from .company import company_bp
from .comment import comments_bp
from .payment import payment_bp
from .user_profile_routes import profile_bp
from .password_reset import auth_bp
from flask_cors import CORS

# Allow CORS requests to this API
api = Blueprint('api', __name__)
CORS(api, origins="*")

# Registra los blueprints de cada módulo
api.register_blueprint(user_bp)
api.register_blueprint(admin_bp)
api.register_blueprint(offers_bp)
api.register_blueprint(company_bp)
api.register_blueprint(payment_bp)
api.register_blueprint(comments_bp)
api.register_blueprint(profile_bp)
api.register_blueprint(auth_bp)