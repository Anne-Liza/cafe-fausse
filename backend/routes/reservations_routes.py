# routes/reservations_routes.py
from flask import Blueprint, jsonify, request
from datetime import datetime
import random
from models import db, Customer, Reservation

reservations_bp = Blueprint("reservations_bp", __name__)

@reservations_bp.route("/api/reservations", methods=["POST"])
def create_reservation():
    data = request.get_json() or {}

    name = data.get("name")
    email = data.get("email")
    phone = data.get("phone")
    time_slot_str = data.get("time_slot")
    guests = data.get("guests")

    if not email or not name or not time_slot_str:
        return jsonify({"error": "name, email, and time_slot are required"}), 400

    try:
        time_slot = datetime.fromisoformat(time_slot_str)
    except ValueError:
        return jsonify({"error": "Invalid time_slot format"}), 400

    TOTAL_TABLES = 30
    customer = Customer.query.filter_by(email=email).first()

    if customer is None:
        customer = Customer(name=name, email=email, phone=phone)
        db.session.add(customer)
        db.session.flush()
    else:
        customer.name = name
        if phone:
            customer.phone = phone

    existing = Reservation.query.filter_by(time_slot=time_slot).all()
    if len(existing) >= TOTAL_TABLES:
        return jsonify({"error": "Selected time slot is fully booked"}), 400

    taken_tables = {r.table_number for r in existing}
    free_tables = [t for t in range(1, TOTAL_TABLES + 1) if t not in taken_tables]

    table_number = random.choice(free_tables)
    reservation = Reservation(
        customer_id=customer.id,
        time_slot=time_slot,
        table_number=table_number
    )

    db.session.add(reservation)
    db.session.commit()

    return jsonify({
        "message": "Reservation created successfully",
        "reservation": {
            "id": reservation.id,
            "customer": customer.name,
            "email": customer.email,
            "table_number": reservation.table_number,
            "time_slot": reservation.time_slot.isoformat()
        }
    }), 201

@reservations_bp.route("/api/reservations", methods=["GET"])
def list_reservations():
    reservations = Reservation.query.all()
    data = [
        {
            "id": r.id,
            "customer": r.customer.name,
            "email": r.customer.email,
            "time_slot": r.time_slot.isoformat(),
            "table_number": r.table_number
        }
        for r in reservations
    ]
    return jsonify(data), 200
