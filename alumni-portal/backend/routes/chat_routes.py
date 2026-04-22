from datetime import datetime, timezone
from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required
from models import db, Message

chat_bp = Blueprint('chat', __name__)


@chat_bp.route('/api/messages', methods=['GET'])
def get_messages():
    sender_id = request.args.get('senderId')
    receiver_id = request.args.get('receiverId')

    if not sender_id or not receiver_id:
        messages = Message.query.all()
        return jsonify([m.to_dict() for m in messages]), 200

    # Filter conversation between two users (both directions)
    conversation = Message.query.filter(
        db.or_(
            db.and_(
                Message.senderId == int(sender_id),
                Message.receiverId == int(receiver_id),
            ),
            db.and_(
                Message.senderId == int(receiver_id),
                Message.receiverId == int(sender_id),
            ),
        )
    ).order_by(Message.timestamp.asc()).all()

    return jsonify([m.to_dict() for m in conversation]), 200


@chat_bp.route('/api/messages', methods=['POST'])
@jwt_required()
def send_message():
    try:
        data = request.get_json()
        new_msg = Message(
            senderId=int(data.get('senderId', 0)),
            receiverId=int(data.get('receiverId', 0)),
            content=data.get('content', ''),
            senderName=data.get('senderName', ''),
            timestamp=datetime.now(timezone.utc).isoformat(),
        )
        db.session.add(new_msg)
        db.session.commit()
        return jsonify(new_msg.to_dict()), 201
    except Exception as e:
        db.session.rollback()
        print(f'Message Send Error: {e}')
        return jsonify({'error': 'Internal server error'}), 500
