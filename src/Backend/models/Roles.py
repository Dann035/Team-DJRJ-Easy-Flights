from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy import String
from Backend.models.base import db


class Roles(db.Model):
    __tablename__ = 'roles'
    id:Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(String(120),unique=True,nullable=False)

    #relations
    user = relationship('User',back_populates='role',cascade="all, delete-orphan")
    company = relationship('Companies',back_populates='role',cascade="all, delete-orphan")

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
        }
