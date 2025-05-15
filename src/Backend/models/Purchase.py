from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy import ForeignKey, Integer, Float, DateTime
from datetime import datetime
from .base import db
from typing import TYPE_CHECKING

if TYPE_CHECKING:
    from .User import User
    from .Offers import Offers
    from .Payments import Payments

class Purchase(db.Model):
    __tablename__ = 'purchases'

    id: Mapped[int] = mapped_column(primary_key=True)
    user_id: Mapped[int] = mapped_column(ForeignKey('users.id'), nullable=False)
    offer_id: Mapped[int] = mapped_column(ForeignKey('offers.id'), nullable=False)
    total_amount: Mapped[float] = mapped_column(Float, nullable=False)
    purchase_date: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)

    # Relaciones
    user = relationship('User', back_populates='purchases')
    offer = relationship('Offers')
    payments = relationship('Payments', back_populates='purchase')

    def serialize(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "offer_id": self.offer_id,
            "total_amount": self.total_amount,
            "purchase_date": self.purchase_date.isoformat() if self.purchase_date else None,
            "offer": self.offer.serialize() if self.offer else None,
            "payments": [payment.serialize() for payment in self.payments] if self.payments else None,
        }