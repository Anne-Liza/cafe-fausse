# backend/routes/notifications_routes.py
from flask import Blueprint, request, jsonify
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import os

notify_bp = Blueprint("notify", __name__)

@notify_bp.route("/api/notify/order", methods=["POST"])
def send_order_email():
    data = request.get_json()
    customer_email = data.get("email")
    customer_name = data.get("name")
    total = data.get("total")
    order_id = data.get("order_id")
    payment = data.get("payment")

    if not customer_email:
        return jsonify({"error": "Email is required"}), 400

    try:
        sender_email = os.getenv("MAIL_USERNAME", "cafefausse.orders@gmail.com")
        sender_pass = os.getenv("MAIL_PASSWORD")

        msg = MIMEMultipart("alternative")
        msg["Subject"] = f"Café Fausse Order Confirmation — {order_id}"
        msg["From"] = sender_email
        msg["To"] = customer_email

        html = f"""
        <html>
          <body style="font-family: Arial, sans-serif;">
            <h2 style="color:#a44b23;">Thank you, {customer_name or 'Guest'}!</h2>
            <p>Your order has been confirmed.</p>
            <table style="border-collapse:collapse;">
              <tr><td><strong>Order ID:</strong></td><td>{order_id}</td></tr>
              <tr><td><strong>Payment Method:</strong></td><td>{payment}</td></tr>
              <tr><td><strong>Total Paid:</strong></td><td>KSH {total}</td></tr>
            </table>
            <p style="margin-top:1em;">We’ll notify you once your order is on its way.</p>
            <p style="color:gray;">Warm regards,<br>Café Fausse Team</p>
          </body>
        </html>
        """

        msg.attach(MIMEText(html, "html"))

        # Configure and send via Gmail SMTP (for testing)
        with smtplib.SMTP_SSL("smtp.gmail.com", 465) as server:
            server.login(sender_email, sender_pass)
            server.sendmail(sender_email, customer_email, msg.as_string())

        print(f"✅ Sent order confirmation to {customer_email}")
        return jsonify({"message": "Email sent"}), 200

    except Exception as e:
        print(f"Email error: {e}")
        return jsonify({"error": str(e)}), 500
