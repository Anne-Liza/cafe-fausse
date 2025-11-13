# models/__init__.py
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

# Import models so they are registered with SQLAlchemy
from .customer_model import Customer
from .reservation_model import Reservation
from .user_model import Role, User
from .admin import Admin
from .menu_item import MenuItem

