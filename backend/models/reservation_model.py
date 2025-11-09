# models/reservation_model.py
from datetime import datetime
from models import db

class Reservation(db.Model):
    __tablename__ = "reservations"

    id = db.Column(db.Integer, primary_key=True)
    customer_id = db.Column(db.Integer, db.ForeignKey("customers.id"), nullable=False)
    time_slot = db.Column(db.DateTime, nullable=False)
    table_number = db.Column(db.Integer, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow, nullable=False)

    def __repr__(self):
        return f"<Reservation {self.id} Table {self.table_number} at {self.time_slot}>"

    def to_dict(self):
        """Return reservation data in JSON-friendly format."""
        return {
            "id": self.id,
            "customer_id": self.customer_id,
            "time_slot": self.time_slot.isoformat(),
            "table_number": self.table_number,
            "created_at": self.created_at.isoformat()
        }
