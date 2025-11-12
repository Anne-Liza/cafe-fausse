# backend/utils/auth_utils.py
from functools import wraps
from flask_jwt_extended import get_jwt_identity, jwt_required
from flask import jsonify

def role_required(allowed_roles):
    """Restrict route access to specified roles."""
    def decorator(f):
        @wraps(f)
        @jwt_required()
        def wrapper(*args, **kwargs):
            user = get_jwt_identity()
            if user["role"] not in allowed_roles:
                return jsonify({"error": "Unauthorized: insufficient privileges"}), 403
            return f(*args, **kwargs)
        return wrapper
    return decorator
