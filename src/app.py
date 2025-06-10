from src.Backend.utils import APIException, generate_sitemap
from src.Backend.models.base import db
from src.Backend.models import User, Roles, Companies, Payments, Comments 
from src.Backend.routes import api, admin
from src.Backend.admin import setup_admin
from src.Backend.commands import setup_commands
import cloudinary
import os
from flask import Flask, request, jsonify, url_for, send_from_directory
from flask_migrate import Migrate
from flask_swagger import swagger
from flask_jwt_extended import JWTManager
from flask_cors import CORS
from flask_mail import Mail




# from models import Person
ENV = "development" if os.getenv("FLASK_DEBUG") == "1" else "production"
static_file_dir = os.path.join(os.path.dirname(
    os.path.realpath(__file__)), '../public/')
app = Flask(__name__)
app.url_map.strict_slashes = False


# configure jwt authentication

app.config['JWT_SECRET_KEY'] = 'secret'
jwt = JWTManager(app)



# database condiguration
db_url = os.getenv("DATABASE_URL")
if db_url is not None:
    app.config['SQLALCHEMY_DATABASE_URI'] = db_url.replace(
        "postgres://", "postgresql://")
else:
    app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:////tmp/test.db"

app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['UPLOAD_FOLDER'] = 'static/avatars'
app.config['ALLOWED_EXTENSIONS'] = {'png', 'jpg', 'jpeg'}


app.config['MAIL_SERVER'] = 'smtp.gmail.com'
app.config['MAIL_PORT'] = 587
app.config['MAIL_USE_TLS'] = True
app.config['MAIL_USERNAME'] = os.getenv('EMAIL_USER', 'landadlh603@gmail.com')
app.config['MAIL_PASSWORD'] = os.getenv('EMAIL_PASSWORD', 'shtr kbgw jxsj emtq')
app.config['MAIL_DEFAULT_SENDER'] = os.getenv('EMAIL_FROM', 'Easy Flights <noreply@easyflights.com>')


MIGRATE = Migrate(app, db, compare_type=True)
db.init_app(app)

CORS(app, origins=["*"], supports_credentials=True)


# add the admin
setup_admin(app)

# add the admin
setup_commands(app)

# Add all endpoints form the API with a "api" prefix
app.register_blueprint(api, url_prefix='/api')

# Handle/serialize errors like a JSON object


@app.errorhandler(APIException)
def handle_invalid_usage(error):
    return jsonify(error.to_dict()), error.status_code

# generate sitemap with all your endpoints


@app.route('/')
def sitemap():
    if ENV == "development":
        return generate_sitemap(app)
    return send_from_directory(static_file_dir, 'index.html')

# any other endpoint will try to serve it like a static file
@app.route('/<path:path>', methods=['GET'])
def serve_any_other_file(path):
    if not os.path.isfile(os.path.join(static_file_dir, path)):
        path = 'index.html'
    response = send_from_directory(static_file_dir, path)
    response.cache_control.max_age = 0  # avoid cache memory
    return response


# this only runs if `$ python src/main.py` is executed
port = int(os.environ.get('PORT', 3001))
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=port, debug=True)
