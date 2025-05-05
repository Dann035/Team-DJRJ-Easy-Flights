from .base import db
from typing import TYPE_CHECKING
from datetime import datetime, timezone
from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy import String, Boolean, ForeignKey, Float, Integer, DateTime, Enum

if TYPE_CHECKING:
    from .Roles import Roles
    from .Comments import Comments
    from .Offers import Offers
    from .UserRole import UserRole

class Companies(db.Model):
    __tablename__ = 'companies'
    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(String(120))
    password: Mapped[str] = mapped_column(String(512),nullable=False)
    description: Mapped[str] = mapped_column(String(),nullable=False)
    email: Mapped[str] = mapped_column(String(50), unique=True, nullable=False)#email corporativo
    phone: Mapped[int] = mapped_column(String(20),nullable=False)
    website: Mapped[str] = mapped_column(String(120),nullable=False)
    country: Mapped[str] = mapped_column(String(50),nullable=False)
    logo_url: Mapped[str] = mapped_column(String(255),nullable=False)
    slug: Mapped[str] = mapped_column(String(50),nullable=False)
    status: Mapped[str] = mapped_column(String(50),nullable=False)
    created_at: Mapped[datetime] = mapped_column(DateTime, default=lambda: datetime.now(timezone.utc))
    logo_url: Mapped[str] = mapped_column(String(255),nullable=False)
    owner_id: Mapped[int] = mapped_column(ForeignKey('users.id'),nullable=True)

    #relations
    owner = relationship('User',back_populates='companies')
    comments = relationship('Comments',back_populates='company')
    company_roles = relationship('UserRole',back_populates='company')
    offert = relationship('Offers',back_populates='company')

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
            "slug": self.slug,
            "status": self.status
        }