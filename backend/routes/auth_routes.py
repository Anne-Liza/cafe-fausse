# backend/routes/auth_routes.py
from flask import Blueprint, request, jsonify
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from datetime import timedelta
from models import db
from models.user_model import User, Role

auth_bp = Blueprint("auth", __name__)

# ✅ Admin login
@auth_bp.route("/api/admin/login", methods=["POST"])
def admin_login():
    data = request.get_json()
    email = data.get("email")
    password = data.get("password")

    user = User.query.filter_by(email=email).first()
    if not user or not user.check_password(password):
        return jsonify({"error": "Invalid email or password"}), 401

    if not user.is_active:
        return jsonify({"error": "Account disabled. Contact admin."}), 403

    token = create_access_token(
        identity={"id": user.id, "email": user.email, "role": user.role.name},
        expires_delta=timedelta(hours=2)
    )

    return jsonify({
        "message": "Login successful",
        "token": token,
        "user": user.to_dict()
    }), 200


# ✅ Simple example protected route
@auth_bp.route("/api/admin/me", methods=["GET"])
@jwt_required()
def get_current_user():
    user = get_jwt_identity()
    return jsonify(user), 200
