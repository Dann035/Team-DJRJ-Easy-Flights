import os
from .models import db, User, Roles, Companies, Comments, Payments, Offers, UserRole
from flask_admin import Admin
from flask_admin.contrib.sqla import ModelView


def setup_admin(app):
    app.secret_key = os.environ.get('FLASK_APP_KEY', 'sample key')
    app.config['FLASK_ADMIN_SWATCH'] = 'cerulean'
    admin = Admin(app, name='Easy Flights Admin', template_mode='bootstrap4')

    
    # Add your models here, for example this is how we add a the User model to the admin
    admin.add_view(ModelView(User, db.session))
    admin.add_view(ModelView(Roles, db.session))
    admin.add_view(ModelView(Companies, db.session))
    admin.add_view(ModelView(Comments, db.session))
    admin.add_view(ModelView(Payments, db.session))
    admin.add_view(ModelView(Offers, db.session))
    admin.add_view(ModelView(UserRole, db.session))
    # You can duplicate that line to add mew models
    # admin.add_view(ModelView(YourModelName, db.session))