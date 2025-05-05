from typing import TYPE_CHECKING
from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy import String, Boolean, ForeignKey, DateTime
from datetime import datetime, timezone
from .base import db

if TYPE_CHECKING:
    from .Roles import Roles
    from .Comments import Comments
    from .Payments import Payments
    from .UserRole import UserRole

class User(db.Model):
    __tablename__ = 'users'
    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(String(120), nullable=False)
    email: Mapped[str] = mapped_column(String(120), unique=True, nullable=False)
    password: Mapped[str] = mapped_column(String(255),nullable=False)
    is_active: Mapped[bool] = mapped_column(Boolean(), nullable=False, default=True)
    created_at: Mapped[datetime] = mapped_column(DateTime, default=lambda: datetime.now(timezone.utc))
    role: Mapped[str] = mapped_column(String(120),nullable=False)
    role_id: Mapped[int] = mapped_column(ForeignKey('roles.id'),nullable=True)

    #relations
    comments = relationship('Comments',back_populates='user',cascade="all, delete-orphan")
    payments = relationship('Payments',back_populates='user',cascade="all, delete-orphan")
    user_roles = relationship('UserRole',back_populates='user')
    companies = relationship('Companies',back_populates='owner',cascade="all, delete-orphan")

    @property
    def roles(self):
        # Devuelve una lista de nombres de roles
        return [user_role.role.name for user_role in self.user_roles]

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "email": self.email,
            "roles": self.roles
        }
