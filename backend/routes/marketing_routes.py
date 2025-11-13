from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required
from utils.decorators import role_required
from models import db

marketing_bp = Blueprint("marketing", __name__, url_prefix="/api/marketing")

# Example promo message table (we can later migrate this to a model)
PROMO_MESSAGE = {"headline": "Stay Longer & Save", "subtext": "Receive 15% off..."}

@marketing_bp.route("/update_promo", methods=["PUT"])
@jwt_required()
@role_required("SuperAdmin", "Marketing")
def update_promo():
    data = request.get_json()
    PROMO_MESSAGE["headline"] = data.get("headline", PROMO_MESSAGE["headline"])
    PROMO_MESSAGE["subtext"] = data.get("subtext", PROMO_MESSAGE["subtext"])
    return jsonify({"msg": "Promo updated", "promo": PROMO_MESSAGE}), 200

@marketing_bp.route("/get_promo", methods=["GET"])
def get_promo():
    return jsonify(PROMO_MESSAGE), 200
