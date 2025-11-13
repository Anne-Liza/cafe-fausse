from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from models import db, Admin

admin_crud_bp = Blueprint("admin_crud", __name__, url_prefix="/api/admin")

# Helper: check SuperAdmin
def require_superadmin(user):
    if user.role != "SuperAdmin":
        return jsonify({"error": "Access denied — SuperAdmin only"}), 403

# 🔹 CREATE admin
@admin_crud_bp.route("/create", methods=["POST"])
@jwt_required()
def create_admin():
    current_user_id = get_jwt_identity()
    current_user = Admin.query.get(current_user_id)

    if not current_user or current_user.role != "SuperAdmin":
        return jsonify({"error": "Access denied — SuperAdmin only"}), 403

    data = request.get_json()
    new_admin = Admin(
        name=data["name"],
        email=data["email"],
        role=data.get("role", "Staff")
    )
    new_admin.set_password(data["password"])
    db.session.add(new_admin)
    db.session.commit()

    return jsonify({"msg": "Admin created successfully", "admin": new_admin.serialize()}), 201

# 🔹 LIST all admins
@admin_crud_bp.route("/list", methods=["GET"])
@jwt_required()
def list_admins():
    admins = Admin.query.all()
    return jsonify([a.serialize() for a in admins]), 200

# 🔹 UPDATE admin
@admin_crud_bp.route("/update/<int:id>", methods=["PUT"])
@jwt_required()
def update_admin(id):
    current_user_id = get_jwt_identity()
    current_user = Admin.query.get(current_user_id)
    if not current_user or current_user.role != "SuperAdmin":
        return jsonify({"error": "Access denied — SuperAdmin only"}), 403

    admin = Admin.query.get(id)
    if not admin:
        return jsonify({"error": "Admin not found"}), 404

    data = request.get_json()
    admin.name = data.get("name", admin.name)
    admin.email = data.get("email", admin.email)
    admin.role = data.get("role", admin.role)
    admin.is_active = data.get("is_active", admin.is_active)
    db.session.commit()
    return jsonify({"msg": "Admin updated", "admin": admin.serialize()}), 200

# 🔹 DELETE admin
@admin_crud_bp.route("/delete/<int:id>", methods=["DELETE"])
@jwt_required()
def delete_admin(id):
    current_user_id = get_jwt_identity()
    current_user = Admin.query.get(current_user_id)
    if not current_user or current_user.role != "SuperAdmin":
        return jsonify({"error": "Access denied — SuperAdmin only"}), 403

    admin = Admin.query.get(id)
    if not admin:
        return jsonify({"error": "Admin not found"}), 404

    db.session.delete(admin)
    db.session.commit()
    return jsonify({"msg": "Admin deleted successfully"}), 200
