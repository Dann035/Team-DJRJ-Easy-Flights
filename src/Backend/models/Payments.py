from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy import String, ForeignKey, Float, DateTime, Integer
from datetime import datetime
from .base import db
from typing import TYPE_CHECKING

if TYPE_CHECKING:
    from .User import User
    from .Offers import Offers
    from .Companies import Companies
    from .Purchase import Purchase

class Payments(db.Model):
    __tablename__ = 'payments'
    
    id: Mapped[int] = mapped_column(primary_key=True)
    amount: Mapped[float] = mapped_column(Float, nullable=False)
    payment_method: Mapped[str] = mapped_column(String(120), nullable=False)
    status: Mapped[str] = mapped_column(String(120), nullable=False)
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)

    cardholder_name: Mapped[str] = mapped_column(String(120), nullable=True)
    card_number: Mapped[str] = mapped_column(String(20), nullable=True)  # Se almacena parcialmente

    user_id: Mapped[int] = mapped_column(ForeignKey('users.id'), nullable=False)
    offer_id: Mapped[int] = mapped_column(ForeignKey('offers.id'), nullable=False)
    purchase_id: Mapped[int] = mapped_column(ForeignKey('purchases.id'), nullable=True)

    # Relaciones
    user = relationship('User', back_populates='payments')
    offer = relationship('Offers', back_populates='payments')
    purchase = relationship('Purchase', back_populates='payments')

    def serialize(self):
        return {
            "id": self.id,
            "amount": self.amount,
            "payment_method": self.payment_method,
            "status": self.status,
            "created_at": self.created_at.isoformat() if self.created_at else None,
            "cardholderName": self.cardholder_name,
            "cardNumber": self.card_number[-4:] if self.card_number else None,
            "user_id": self.user_id,
            "offer_id": self.offer_id,
            "purchase_id": self.purchase_id
        }