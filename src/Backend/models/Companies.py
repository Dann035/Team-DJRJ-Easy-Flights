from .base import db
from typing import TYPE_CHECKING
from datetime import datetime, timezone
from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy import String, Boolean, ForeignKey, Float, Integer, DateTime, Enum

if TYPE_CHECKING:
    from .Roles import Roles
    from .Comments import Comments
    from .Offers import Offers

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
    rating: Mapped[float] = mapped_column(Float,nullable=False)
    slug: Mapped[str] = mapped_column(String(50),nullable=False)
    status: Mapped[str] = mapped_column(String(50),nullable=False)
    created_at: Mapped[datetime] = mapped_column(DateTime, default=lambda: datetime.now(timezone.utc))
    logo_url: Mapped[str] = mapped_column(String(255),nullable=False)
    role_id: Mapped[int] = mapped_column(ForeignKey('roles.id'),nullable=True, default=3)

    #relations
    comments = relationship('Comments',back_populates='company')
    role = relationship('Roles',back_populates='company')
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
            "rating": self.rating,
            "slug": self.slug,
            "status": self.status
        }