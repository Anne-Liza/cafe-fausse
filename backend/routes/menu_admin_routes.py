from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from models import db, Admin, MenuItem

menu_admin_bp = Blueprint("menu_admin", __name__, url_prefix="/api/admin/menu")

# 🔹 Add new dish
@menu_admin_bp.route("/add", methods=["POST"])
@jwt_required(optional=True)  # optional for now while testing paused
def add_menu_item():
    data = request.get_json()

    new_item = MenuItem(
        name=data["name"],
        description=data.get("description", ""),
        price=data["price"],
        image_url=data.get("image_url", ""),
        category=data.get("category", ""),
        available=data.get("available", True),
    )

    db.session.add(new_item)
    db.session.commit()
    return jsonify({"msg": "Menu item added", "item": new_item.serialize()}), 201


# 🔹 Update dish
@menu_admin_bp.route("/update/<int:id>", methods=["PUT"])
@jwt_required(optional=True)
def update_menu_item(id):
    item = MenuItem.query.get(id)
    if not item:
        return jsonify({"error": "Item not found"}), 404

    data = request.get_json()
    item.name = data.get("name", item.name)
    item.description = data.get("description", item.description)
    item.price = data.get("price", item.price)
    item.image_url = data.get("image_url", item.image_url)
    item.category = data.get("category", item.category)
    item.available = data.get("available", item.available)

    db.session.commit()
    return jsonify({"msg": "Item updated", "item": item.serialize()}), 200


# 🔹 Delete dish
@menu_admin_bp.route("/delete/<int:id>", methods=["DELETE"])
@jwt_required(optional=True)
def delete_menu_item(id):
    item = MenuItem.query.get(id)
    if not item:
        return jsonify({"error": "Item not found"}), 404

    db.session.delete(item)
    db.session.commit()
    return jsonify({"msg": "Item deleted"}), 200


# 🔹 Toggle availability
@menu_admin_bp.route("/toggle/<int:id>", methods=["PATCH"])
@jwt_required(optional=True)
def toggle_availability(id):
    item = MenuItem.query.get(id)
    if not item:
        return jsonify({"error": "Item not found"}), 404

    item.available = not item.available
    db.session.commit()
    return jsonify({
        "msg": "Item availability toggled",
        "available": item.available
    }), 200
