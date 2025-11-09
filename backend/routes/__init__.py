# routes/__init__.py
from flask import Blueprint

# Import each blueprint
from .reservations_routes import reservations_bp
from .newsletter_routes import newsletter_bp
from .general_routes import general_bp
from models import db, Customer, Reservation


# List of blueprints to register
all_blueprints = [reservations_bp, newsletter_bp, general_bp]
