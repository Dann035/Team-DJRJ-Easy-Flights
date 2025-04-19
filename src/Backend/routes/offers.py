from flask import request, jsonify, Blueprint
from Backend.models.base import db
from Backend.models.Offers import Offers


offers_bp = Blueprint('offers', __name__)


@offers_bp.route('/', methods=['GET'])
def hello():
    return jsonify({"msg": "Hello from the offers"}), 200