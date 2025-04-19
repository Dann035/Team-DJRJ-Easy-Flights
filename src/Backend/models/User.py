from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy import String, Boolean, ForeignKey
from .base import db

class User(db.Model):
    __tablename__ = 'user'
    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(String(120), nullable=False)
    email: Mapped[str] = mapped_column(String(120), unique=True, nullable=False)
    password: Mapped[str] = mapped_column(String(255),nullable=False)
    is_active: Mapped[bool] = mapped_column(Boolean(), nullable=False, default=True)
    role_id: Mapped[int] = mapped_column(ForeignKey('roles.id'),nullable=True)


    #relations
    comments = relationship('Comments',back_populates='user',cascade="all, delete-orphan")
    payments = relationship('Payments',back_populates='user',cascade="all, delete-orphan")
    role = relationship('Roles',back_populates='user')


    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "email": self.email
        }