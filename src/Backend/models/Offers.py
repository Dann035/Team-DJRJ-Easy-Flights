from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy import String, Boolean, ForeignKey,DateTime, Float, Text
from datetime import datetime, timezone
from Backend.models.base import db

class Offers(db.Model):
    __tablename__ = 'offers'
    id: Mapped[int] = mapped_column(primary_key=True)
    title: Mapped[str] = mapped_column(String(120), nullable=False) 
    description: Mapped[str] = mapped_column(Text, nullable=True)
    price:Mapped[float] = mapped_column(Float, nullable=False)
    type_offert:Mapped[str] = mapped_column(String(120))
    image_url: Mapped[str] = mapped_column(Text, nullable=False)
    created_at: Mapped[datetime] = mapped_column(DateTime)
    company_id: Mapped[int] = mapped_column(ForeignKey('companies.id'))

    #relations
    comments = relationship('Comments',back_populates='offert')
    company = relationship('Companies',back_populates='offert')
    payments = relationship('Payments',back_populates='offert')

    #serialize
    def serialize(self):
        return {
            "id": self.id,
            "title": self.title,
            "description": self.description,
            "price": self.price,
            "image_url": self.image_url,
            "created_at": self.created_at,
            "type_offert": self.type_offert
        }