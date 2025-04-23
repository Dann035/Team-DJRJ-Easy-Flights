from sqlalchemy.orm import Mapped, mapped_column,relationship
from sqlalchemy import String, Boolean,ForeignKey,Float,Integer, DateTime,Enum,Text
from .base import db
from typing import TYPE_CHECKING

if TYPE_CHECKING:
    from .User import User
    from .Offers import Offers
    from .Companies import Companies

class Payments(db.Model):
    __tablename__ = 'payments'
    id: Mapped[int] = mapped_column(primary_key=True)
    amount: Mapped[float] = mapped_column(Float,nullable=False)
    payment_method: Mapped[str] = mapped_column(String(120))
    created_at: Mapped[str] = mapped_column(String(120))
    status:Mapped[str] = mapped_column(String(120))
    user_id: Mapped[int] = mapped_column(ForeignKey('user.id'))
    offer_id: Mapped[int] = mapped_column(ForeignKey('offers.id'))
    payment_method: Mapped[str] = mapped_column(String(120),nullable=True)
    created_at: Mapped[str] = mapped_column(String(120),nullable=True)
    status:Mapped[str] = mapped_column(String(120),nullable=True)
    user_id: Mapped[int] = mapped_column(ForeignKey('user.id'),nullable=True)
    offer_id: Mapped[int] = mapped_column(ForeignKey('offers.id'),nullable=True)


    #relations
    user = relationship('User',back_populates='payments')
    offert = relationship('Offers',back_populates='payments')

    #serialize
    def serialize(self):
        return {
            "id": self.id,
            "amount": self.amount,
            "payment_method": self.payment_method,
            "created_at": self.created_at,
            "status": self.status,
        }
