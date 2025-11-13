from functools import wraps
from flask import jsonify
from flask_jwt_extended import get_jwt_identity
from models import Admin

def role_required(*roles):
    """Allows access only to admins with certain roles."""
    def wrapper(fn):
        @wraps(fn)
        def decorator(*args, **kwargs):
            identity = get_jwt_identity()
            if not identity:
                return jsonify({"error": "Authentication required"}), 401

            user = Admin.query.get(identity["id"])
            if not user or user.role not in roles:
                return jsonify({"error": "Access denied"}), 403

            return fn(*args, **kwargs)
        return decorator
    return wrapper
