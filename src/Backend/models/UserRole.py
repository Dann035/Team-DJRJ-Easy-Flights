from typing import TYPE_CHECKING
from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy import Integer, DateTime, ForeignKey
from datetime import datetime, timezone
from .base import db

if TYPE_CHECKING:
    from .User import User
    from .Roles import Roles
    from .Companies import Companies

class UserRole(db.Model):
    __tablename__ = 'user_role'
    id:Mapped[int] = mapped_column(primary_key=True)
    user_id: Mapped[int] = mapped_column(Integer,ForeignKey('users.id'),nullable=True)
    company_id: Mapped[int] = mapped_column(Integer,ForeignKey('companies.id'),nullable=True)
    role_id: Mapped[int] = mapped_column(Integer,ForeignKey('roles.id'))
    assigned_at: Mapped[datetime] = mapped_column(DateTime, default=lambda: datetime.now(timezone.utc))

    #relations
    user = relationship('User',back_populates='user_roles')
    company = relationship('Companies',back_populates='company_roles')
    role = relationship('Roles',back_populates='user_roles')

    def serialize(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "role_id": self.role_id,
        }