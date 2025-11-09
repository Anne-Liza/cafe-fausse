# app.py
from flask import Flask
from flask_cors import CORS
from config import Config
from models import db
from routes import all_blueprints

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)
    CORS(app, resources={r"/api/*": {"origins": "*"}})
    db.init_app(app)

    # Register all blueprints
    for bp in all_blueprints:
        app.register_blueprint(bp)

    return app

if __name__ == "__main__":
    app = create_app()
    with app.app_context():
        db.create_all()
    app.run(debug=True)
