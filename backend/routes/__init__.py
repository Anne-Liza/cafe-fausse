# routes/__init__.py
from flask import Blueprint

# Import each blueprint
from .reservations_routes import reservations_bp
from .newsletter_routes import newsletter_bp
from .general_routes import general_bp
from .menu_routes import menu_bp
from .orders_routes import orders_bp
from .notifications_routes import notify_bp
from .auth_routes import auth_bp


# List of blueprints to register
all_blueprints = [reservations_bp, newsletter_bp, general_bp, menu_bp, orders_bp, notify_bp, auth_bp]
