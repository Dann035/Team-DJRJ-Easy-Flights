from typing import TYPE_CHECKING
from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy import String
from .base import db

if TYPE_CHECKING:
    from .User import User
    from .Companies import Companies
    from .UserRole import UserRole


class Roles(db.Model):
    __tablename__ = 'roles'
    id:Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(String(120),unique=True,nullable=False)

    #relations
    user_roles = relationship('UserRole',back_populates='role')
    # company = relationship('Companies',back_populates='role',cascade="all, delete-orphan")

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
        }
