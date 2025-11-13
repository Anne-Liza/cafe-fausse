from flask import Flask
from flask_cors import CORS
from config import Config
from models import db
from routes import all_blueprints
from flask_jwt_extended import JWTManager

jwt = JWTManager()

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)
    CORS(app, resources={r"/api/*": {"origins": "*"}})
    db.init_app(app)
    jwt.init_app(app)

    # Register all blueprints
    for bp in all_blueprints:
        app.register_blueprint(bp)

    return app

import os
print("🔍 JWT_SECRET_KEY:", os.getenv("JWT_SECRET_KEY"))
print("🔍 DATABASE_URL:", os.getenv("DATABASE_URL"))


if __name__ == "__main__":
    app = create_app()
    with app.app_context():
        db.create_all()
        print("✅ Database tables created successfully.")
    app.run(debug=True)



