from flask import Blueprint, jsonify, send_file
from models import MenuItem
from reportlab.lib.pagesizes import letter
from reportlab.pdfgen import canvas
import io

menu_bp = Blueprint("menu", __name__, url_prefix="/api/menu")

# 🔹 Get all available menu items (visible to the public)
@menu_bp.route("/", methods=["GET"])
def get_menu():
    items = MenuItem.query.filter_by(available=True).all()
    return jsonify([item.serialize() for item in items]), 200

# 🔹 Download the menu as a PDF
@menu_bp.route("/pdf", methods=["GET"])
def generate_menu_pdf():
    buffer = io.BytesIO()
    c = canvas.Canvas(buffer, pagesize=letter)
    width, height = letter

    # Header
    c.setFont("Helvetica-Bold", 22)
    c.drawString(200, height - 80, "Café Fausse Menu")

    c.setFont("Helvetica", 10)
    c.drawString(60, height - 110, "1234 Culinary Ave, Washington DC 20002")
    c.drawString(60, height - 125, "(202) 555-4567")
    c.drawString(60, height - 140, "Mon–Sat: 5 PM–11 PM | Sun: 5 PM–9 PM")

    # Menu items
    y = height - 180
    items = MenuItem.query.filter_by(available=True).all()
    current_category = None

    for item in items:
        # Section title
        if item.category != current_category:
            current_category = item.category
            c.setFont("Helvetica-Bold", 14)
            c.drawString(60, y, current_category or "Uncategorized")
            y -= 20

        # Item name, description, and price
        c.setFont("Helvetica-Bold", 12)
        c.drawString(80, y, item.name)
        c.setFont("Helvetica", 10)
        if item.description:
            c.drawString(80, y - 14, item.description)
        c.drawRightString(width - 60, y, f"${item.price:.2f}")
        y -= 40

        # Page break
        if y < 100:
            c.showPage()
            y = height - 100

    c.save()
    buffer.seek(0)

    return send_file(
        buffer,
        as_attachment=True,
        download_name="menu.pdf",
        mimetype="application/pdf"
    )
