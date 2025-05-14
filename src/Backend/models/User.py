import os
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
    suscription: Mapped[str] = mapped_column(String(120),nullable=True,default="FREE")
    avatar: Mapped[str] = mapped_column(String(255),nullable=True)
    is_active: Mapped[bool] = mapped_column(Boolean(), nullable=False, default=True)
    created_at: Mapped[datetime] = mapped_column(DateTime, default=lambda: datetime.now(timezone.utc))
    role: Mapped[str] = mapped_column(String(120),nullable=False)
    role_id: Mapped[int] = mapped_column(ForeignKey('roles.id'),nullable=True)

    #relations
    comments = relationship('Comments',back_populates='user',cascade="all, delete-orphan")
    payments = relationship('Payments',back_populates='user',cascade="all, delete-orphan")
    user_roles = relationship('UserRole',back_populates='user',cascade="all, delete-orphan")
    companies = relationship('Companies',back_populates='owner',cascade="all, delete-orphan")

    @property
    def roles(self):
        # Devuelve una lista de nombres de roles
        return [user_role.role.name for user_role in self.user_roles]

    def serialize(self):
        avatar_path = self.avatar

        if avatar_path and avatar_path.strip() != "":
            # Si es una URL (Cloudinary), la devolvemos tal cual
            if avatar_path.startswith("http"):
                pass  # avatar_path ya es la URL correcta
            else:
                # Es un archivo local, comprobamos si existe
                avatar_file = avatar_path[1:] if avatar_path.startswith('/') else avatar_path
                if not os.path.exists(avatar_file):
                    avatar_path = None
        else:
            avatar_path = None
        
        return {
            "id": self.id,
            "name": self.name,
            "email": self.email,
            "suscription": self.suscription,
            "avatar": avatar_path,
            "roles": self.roles
        }
