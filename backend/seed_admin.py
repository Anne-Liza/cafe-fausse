# backend/seed_admin.py
from models import db
from models.user_model import User, Role


def seed_roles_and_super_admin():
    # 1. Ensure roles exist
    role_names = [
        ("SuperAdmin", "Full access to all admin features"),
        ("HeadChef", "Manage menu items and availability"),
        ("HeadOfMarketing", "Manage gallery, content, promotions"),
        ("ReservationsManager", "Manage reservations and guest bookings"),
    ]

    for name, desc in role_names:
        if not Role.query.filter_by(name=name).first():
            db.session.add(Role(name=name, description=desc))

    db.session.commit()

    # 2. Create SuperAdmin user if none exists
    admin_email = "admin@cafefausse.com"
    existing_admin = User.query.filter_by(email=admin_email).first()

    if not existing_admin:
        super_role = Role.query.filter_by(name="SuperAdmin").first()
        admin = User(
            name="Super Admin",
            email=admin_email,
            role=super_role,
        )
        admin.set_password("ChangeMe123!")  # <-- you will change this after login
        db.session.add(admin)
        db.session.commit()
        print(f"✅ Created SuperAdmin user: {admin_email} / ChangeMe123!")
    else:
        print("SuperAdmin already exists:", existing_admin.email)
