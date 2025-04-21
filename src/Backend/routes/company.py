from flask import request, jsonify, Blueprint
from Backend.models import db, Companies
from werkzeug.security import generate_password_hash


company_bp = Blueprint('company', __name__)


@company_bp.route('/signup/company', methods=['POST'])
def signup_company():
    try:
        company_name = request.json.get('name', None)
        company_password = str(request.json.get('password', None))
        company_description = request.json.get('description', None)
        company_email = request.json.get('email', None)
        company_phone = request.json.get('phone', None)
        company_website = request.json.get('website', None)
        company_country = request.json.get('country', None)
        company_logo_url = request.json.get('logo_url', None)
        company_rating = request.json.get('rating', None)
        company_slug = request.json.get('slug', None)
        company_status = request.json.get('status', None)
        company_role = request.json.get('role', None)

        if not company_name:
            return jsonify({"msg": "Missing company name"}), 400
        if not company_password:
            return jsonify({"msg": "Missing company password"}), 400
        if not company_description:
            return jsonify({"msg": "Missing company description"}), 400
        if not company_email:
            return jsonify({"msg": "Missing company email"}), 400
        if not company_phone:
            return jsonify({"msg": "Missing company phone"}), 400
        if not company_website:
            return jsonify({"msg": "Missing company website"}), 400
        if not company_country:
            return jsonify({"msg": "Missing company country"}), 400
        if not company_logo_url:
            return jsonify({"msg": "Missing company logo_url"}), 400
        if not company_rating:
            return jsonify({"msg": "Missing company rating"}), 400
        if not company_slug:
            return jsonify({"msg": "Missing company slug"}), 400
        if not company_status:
            return jsonify({"msg": "Missing company status"}), 400
        if not company_role:
            return jsonify({"msg": "Missing company role"}), 400

        company = Companies.query.filter_by(email=company_email).first()
        if company:
            return jsonify({"msg": "Company already exists"}), 409

        password_hash = generate_password_hash(company_password)
        new_company = Companies(
            name=company_name,
            email=company_email,
            password=password_hash,
            description=company_description,
            phone=company_phone,
            website=company_website,
            country=company_country,
            logo_url=company_logo_url,
            rating=company_rating,
            slug=company_slug,
            status=company_status,
            role = company_role
        )
        db.session.add(new_company)
        db.session.commit()
        return jsonify({
            "msg": "Company created"}), 201 
    except Exception as e:
        return jsonify({"msg": "Error creating company","Error": str(e)}), 400
