from flask import jsonify

def validate_company(company_name,company_password, company_description, company_email, company_phone, company_website, company_country, company_logo_url, company_rating, company_slug, company_status):
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