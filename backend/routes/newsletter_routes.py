# routes/newsletter_routes.py
from flask import Blueprint, request, jsonify
from models import db, Customer
from models import db, Customer, Reservation


newsletter_bp = Blueprint("newsletter_bp", __name__)

@newsletter_bp.route("/api/newsletter", methods=["POST"])
def newsletter_signup():
    data = request.get_json() or {}
    email = data.get("email")
    name = data.get("name")
    phone = data.get("phone")

    if not email:
        return jsonify({"error": "Email is required"}), 400

    customer = Customer.query.filter_by(email=email).first()
    if customer is None:
        customer = Customer(
            name=name or "Guest",
            email=email,
            phone=phone,
            newsletter_signup=True
        )
        db.session.add(customer)
    else:
        customer.name = name or customer.name
        customer.phone = phone or customer.phone
        customer.newsletter_signup = True

    db.session.commit()
    return jsonify({
        "message": "Newsletter signup successful",
        "customer_id": customer.id
    }), 201
