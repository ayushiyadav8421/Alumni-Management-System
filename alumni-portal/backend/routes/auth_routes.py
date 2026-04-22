from flask import Blueprint, request, jsonify
from flask_jwt_extended import create_access_token
from werkzeug.security import generate_password_hash, check_password_hash
from models import db, Alumni

auth_bp = Blueprint('auth', __name__)


@auth_bp.route('/api/login', methods=['POST'])
def login():
    """Authenticate user and return JWT token + user data."""
    data = request.get_json()
    if not data:
        return jsonify({'error': 'Request body is required'}), 400

    email = data.get('email', '').strip()
    password = data.get('password', '').strip()
    role = data.get('role', '').strip().lower()

    if not email or not password or not role:
        return jsonify({'error': 'Email, password, and role are required'}), 400

    alumni = Alumni.query.filter(
        db.func.lower(Alumni.email) == email.lower()
    ).first()

    if not alumni:
        return jsonify({'error': 'User not found'}), 404

    if alumni.role.lower() != role:
        return jsonify({'error': f'Access denied: You are not registered as {role}'}), 403

    if not check_password_hash(alumni.password, password):
        return jsonify({'error': 'Invalid password'}), 401

    # Create JWT token with the alumni ID as identity
    token = create_access_token(identity=str(alumni.id))

    return jsonify({
        'token': token,
        'user': alumni.to_dict()
    }), 200
