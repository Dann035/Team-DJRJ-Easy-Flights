from flask import request, jsonify, Blueprint
from src.Backend.models import db, Companies
from werkzeug.security import generate_password_hash


company_bp = Blueprint('company', __name__)


#obtener todas las compañias 
@company_bp.route('/company', methods=['GET'])
def get_all_companies():
    companies = Companies.query.all()
    return jsonify([company.serialize() for company in companies]), 200

#obtener por ID 
@company_bp.route('/company/<int:id>', methods=['GET'])
def get_company(id):
    company = Companies.query.get(id)
    if not company:
        return jsonify({"msg": "Company not found"}), 404
    return jsonify(company.serialize()), 200


#eliminar compañia 
@company_bp.route('/company/<int:id>', methods=['DELETE'])
def delete_company(id):
    company = Companies.query.get(id)
    if not company:
        return jsonify({"msg": "Company not found"}), 404

    db.session.delete(company)
    db.session.commit()

    return jsonify({
        "msg": "Company deleted successfully"
    }), 200
