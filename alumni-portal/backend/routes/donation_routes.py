from datetime import datetime, timezone
from flask import Blueprint, request, jsonify
from models import db, Donation

donation_bp = Blueprint('donations', __name__)


@donation_bp.route('/api/donations', methods=['POST'])
def create_donation():
    try:
        data = request.get_json()
        new_donation = Donation(
            fullName=data.get('fullName'),
            email=data.get('email'),
            amount=data.get('amount'),
            purpose=data.get('purpose'),
            message=data.get('message', ''),
            timestamp=datetime.now(timezone.utc).isoformat(),
        )
        db.session.add(new_donation)
        db.session.commit()

        return jsonify({
            'message': 'Donation recorded successfully',
            'donation': new_donation.to_dict(),
        }), 201
    except Exception as e:
        db.session.rollback()
        print(f'Donation Error: {e}')
        return jsonify({'error': 'Internal server error'}), 500


@donation_bp.route('/api/donations', methods=['GET'])
def get_donations():
    donations = Donation.query.all()
    return jsonify([d.to_dict() for d in donations]), 200
