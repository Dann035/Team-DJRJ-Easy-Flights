from flask import request, jsonify, Blueprint
from api.models.base import db
from api.models.Comments import Comments


comments_bp = Blueprint('comments', __name__, url_prefix='/api/admin')


@comments_bp.route('/', methods=['GET'])
def hello():
    return jsonify({"msg": "Hello from the comments"}), 200