# backend/routes/orders_routes.py
from flask import Blueprint, request, jsonify
from models import db
import requests
import os

orders_bp = Blueprint("orders", __name__)

@orders_bp.route("/api/orders", methods=["POST"])
def create_order():
    data = request.get_json()
    customer = data.get("customer", {})
    items = data.get("items", [])
    total = data.get("total")
    payment = data.get("payment", "pending")

    if not customer.get("email"):
        return jsonify({"error": "Customer email is required"}), 400

    # For now, just log to console (you can add a real DB model later)
    print("🧾 New order received:")
    print("Customer:", customer)
    print("Items:")
    for item in items:
        print(f"- {item.get('quantity')} x {item.get('name')} @ {item.get('price')}")
    print("Total:", total)

    # Optional: send confirmation email through our notify route
    try:
        notify_url = os.getenv("NOTIFY_URL", "http://127.0.0.1:5000/api/notify/order")
        payload = {
            "email": customer.get("email"),
            "name": customer.get("name"),
            "total": total,
            "order_id": "CF-" + str(os.urandom(4).hex()),
            "payment": payment,
        }
        requests.post(notify_url, json=payload, timeout=5)
        print("✅ Email notification triggered")
    except Exception as e:
        print("⚠️ Could not send email:", e)

    return jsonify({"message": "Order saved and notification sent"}), 201
