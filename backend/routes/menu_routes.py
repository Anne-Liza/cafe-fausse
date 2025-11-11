from flask import Blueprint, send_file
from reportlab.lib.pagesizes import letter
from reportlab.pdfgen import canvas
import io

menu_bp = Blueprint("menu", __name__)

@menu_bp.route("/api/menu/pdf", methods=["GET"])
def generate_menu_pdf():
    buffer = io.BytesIO()
    c = canvas.Canvas(buffer, pagesize=letter)
    width, height = letter

    # --- Header ---
    c.setFont("Helvetica-Bold", 22)
    c.drawString(200, height - 80, "Café Fausse Menu")

    # --- Info ---
    c.setFont("Helvetica", 10)
    c.drawString(60, height - 110, "1234 Culinary Ave, Suite 100, Washington DC 20002")
    c.drawString(60, height - 125, "(202) 555-4567")
    c.drawString(60, height - 140, "Mon–Sat: 5 PM–11 PM | Sun: 5 PM–9 PM")

    # --- Menu Data ---
    sections = {
        "Starters": [
            ("Heirloom Tomato Salad", "Fresh basil, burrata, balsamic reduction", "$14"),
            ("Truffle Mushroom Soup", "Wild mushrooms, cream, truffle oil drizzle", "$12"),
        ],
        "Mains": [
            ("Pan-Seared Salmon", "Lemon beurre blanc, seasonal vegetables", "$28"),
            ("Filet Mignon", "8oz tenderloin, truffle mash, red wine jus", "$38"),
        ],
    }

    y = height - 180
    for section, items in sections.items():
        c.setFont("Helvetica-Bold", 14)
        c.drawString(60, y, section)
        y -= 20
        for name, desc, price in items:
            c.setFont("Helvetica-Bold", 12)
            c.drawString(80, y, name)
            c.setFont("Helvetica", 10)
            c.drawString(80, y - 14, desc)
            c.drawRightString(width - 60, y, price)
            y -= 40
        y -= 10

    # ✅ Finalize the PDF correctly
    c.save()
    buffer.seek(0)

    # ✅ Return as attachment
    return send_file(
        buffer,
        as_attachment=True,
        download_name="menu.pdf",
        mimetype="application/pdf"
    )
