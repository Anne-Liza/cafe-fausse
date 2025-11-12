# backend/models/user_model.py
from models import db
from werkzeug.security import generate_password_hash, check_password_hash


class Role(db.Model):
    __tablename__ = "roles"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), unique=True, nullable=False)   # e.g. "SuperAdmin"
    description = db.Column(db.String(255))

    def __repr__(self):
        return f"<Role {self.name}>"


class User(db.Model):
    __tablename__ = "users"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.String(255), nullable=False)
    is_active = db.Column(db.Boolean, default=True)

    role_id = db.Column(db.Integer, db.ForeignKey("roles.id"))
    role = db.relationship("Role", backref="users")

    def set_password(self, password: str):
        """Store a hashed version of the password."""
        self.password_hash = generate_password_hash(password)

    def check_password(self, password: str) -> bool:
        """Verify a plain-text password against the stored hash."""
        return check_password_hash(self.password_hash, password)

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "email": self.email,
            "role": self.role.name if self.role else None,
            "is_active": self.is_active,
        }

    def __repr__(self):
        return f"<User {self.email}>"
