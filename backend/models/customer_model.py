# models/customer_model.py
from datetime import datetime
from models import db

class Customer(db.Model):
    __tablename__ = "customers"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), nullable=False)
    email = db.Column(db.String(255), nullable=False, unique=True)
    phone = db.Column(db.String(50))
    newsletter_signup = db.Column(db.Boolean, default=False, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow, nullable=False)

    # Relationship: one customer → many reservations
    reservations = db.relationship("Reservation", backref="customer", lazy=True)

    def __repr__(self):
        return f"<Customer {self.id} {self.email}>"

    def to_dict(self):
        """Helper method to easily serialize the object to JSON."""
        return {
            "id": self.id,
            "name": self.name,
            "email": self.email,
            "phone": self.phone,
            "newsletter_signup": self.newsletter_signup,
            "created_at": self.created_at.isoformat()
        }
