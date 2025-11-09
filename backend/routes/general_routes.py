# routes/general_routes.py
from flask import Blueprint, jsonify
from datetime import datetime
from models import db, Customer, Reservation


general_bp = Blueprint("general_bp", __name__)

@general_bp.route("/", methods=["GET"])
def index():
    return jsonify({
        "message": "Café Fausse API is running",
        "endpoints": [
            "/api/health",
            "/api/reservations",
            "/api/newsletter"
        ]
    })

@general_bp.route("/api/health", methods=["GET"])
def health():
    return jsonify({
        "status": "ok",
        "service": "cafe-fausse-backend",
        "timestamp": datetime.utcnow().isoformat() + "Z"
    })
