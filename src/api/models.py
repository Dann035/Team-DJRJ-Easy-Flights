from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import String, Boolean,ForeignKey,Float,Integer, DateTime,Enum
from sqlalchemy.orm import Mapped, mapped_column,relationship
import os
import enum
from flask import Flask
from dotenv import load_dotenv
from datetime import datetime, timezone

load_dotenv()

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy()

class User(db.Model):
    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(String(120), nullable=False)
    email: Mapped[str] = mapped_column(String(120), unique=True, nullable=False)
    password: Mapped[str] = mapped_column(String(),nullable=False)
    #role_id: Mapped[int] = mapped_column(ForeignKey('roles.id'),nullable=True)
    is_active: Mapped[bool] = mapped_column(Boolean(), nullable=False, default=True)

    #relations
    #comments = relationship('Comments',back_populates='users')
    #payments = relationship('Payments',back_populates='users')
    #roles = relationship('Roles',back_populates='users')
    

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "email": self.email
        }
    

class Roles(db.Model):
    id:Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(String(120),unique=True,nullable=False)

    #relations
    #users = relationship('User',back_populates='roles')
    #company = relationship('Companies',back_populates='roles')

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
        }
    

#class MediaType(enum.Enum):
#    Image = "image"


class Companies(db.Model):
    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(String(120))
    description: Mapped[str] = mapped_column(String(255),nullable=False)
    email: Mapped[str] = mapped_column(String(120), unique=True, nullable=False)#email corporativo
    phone: Mapped[str] = mapped_column(String(50),nullable=False)
    website: Mapped[str] = mapped_column(String(250),nullable=False)
    country: Mapped[str] = mapped_column(String(50),nullable=False)
    logo_url: Mapped[str] = mapped_column(String(255),nullable=False)
    rating: Mapped[float] = mapped_column(Float,nullable=False)
    slug: Mapped[str] = mapped_column(String(120),nullable=False)
    created_at: Mapped[datetime] = mapped_column(DateTime, default=lambda: datetime.now(timezone.utc))
    status: Mapped[str] = mapped_column(String(50),nullable=False)
    #role_id: Mapped[int] = mapped_column(ForeignKey('roles.id'))
    #logo_url: Mapped[MediaType] = mapped_column(Enum(MediaType,name="mediatype_enum"),nullable=False)

    #relations
    #roles = relationship('Roles',back_populates='company')
    #offer = relationship('Offers',back_populates='company')
    #comments = relationship('Comments',back_populates='company')
    

    #serialize
    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "description": self.description,
            "email": self.email,
            "phone": self.phone,
            "website": self.website,
            "country": self.country,
            "logo_url": self.logo_url,
            "rating": self.rating,
            "slug": self.slug,
            "status": self.status
        }

class Offers(db.Model):
    id: Mapped[int] = mapped_column(primary_key=True)
    title: Mapped[str] = mapped_column(String(120), nullable=False) 
    description: Mapped[str] = mapped_column(String(520))
    price:Mapped[float] = mapped_column(Float, nullable=False)
    type_offert:Mapped[str] = mapped_column(String(120))
    image_url: Mapped[int]
    company_id: Mapped[int] = mapped_column(ForeignKey('companies.id'))
    created_at: Mapped[datetime] = mapped_column(DateTime)

    #relations
    #company = relationship('Companies',back_populates='offers')
    #comments = relationship('Comments',back_populates='offers')
    #payments = relationship('Payments',back_populates='offers')

    #serialize
    def serialize(self):
        return {
            "id": self.id,
            "title": self.title,
            "description": self.description,
            "price": self.price,
            "image_url": self.image_url,
            "created_at": self.created_at,
        }
class Comments(db.Model):
    id: Mapped[int] = mapped_column(primary_key=True)
    user_id: Mapped[int] = mapped_column(ForeignKey('user.id'))
    offer_id: Mapped[int] = mapped_column(ForeignKey('offers.id'))
    company_id: Mapped[int] = mapped_column(ForeignKey('companies.id'))
    content: Mapped[str] = mapped_column(String(520))
    created_at: Mapped[str] = mapped_column(String(120))


    #relations
    #offer = relationship('Offers',back_populates='comments')
    #company = relationship('Companies',back_populates='comments')
    #users = relationship('User',back_populates='comments')

    #serialize
    def serialize(self):
        return {
            "id": self.id,
            "content": self.content,
            "created_at": self.created_at,
        }
class Payments(db.Model):
    id: Mapped[int] = mapped_column(primary_key=True)
    user_id: Mapped[int] = mapped_column(ForeignKey('user.id'))
    offer_id: Mapped[int] = mapped_column(ForeignKey('offers.id'))
    amount: Mapped[float] = mapped_column(Float,nullable=False)
    payment_method: Mapped[str] = mapped_column(String(120))
    created_at: Mapped[str] = mapped_column(String(120))
    status:Mapped[str] = mapped_column(String(120))

    #relations
    #users = relationship('User',back_populates='payments')
    #offer = relationship('Offers',back_populates='payments')

    #serialize
    def serialize(self):
        return {
            "id": self.id,
            "amount": self.amount,
            "payment_method": self.payment_method,
            "created_at": self.created_at,
            "status": self.status,
        }

