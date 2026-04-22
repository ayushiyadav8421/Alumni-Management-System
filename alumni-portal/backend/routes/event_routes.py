import os
from datetime import datetime, timezone
from flask import Blueprint, request, jsonify, current_app
from flask_jwt_extended import jwt_required
from werkzeug.utils import secure_filename
from models import db, Event
from utils.auth_utils import role_required

event_bp = Blueprint('events', __name__)


@event_bp.route('/api/events', methods=['GET'])
def get_events():
    school = request.args.get('school')
    query = Event.query
    if school:
        query = query.filter(
            db.func.upper(Event.school) == school.upper()
        )
    events = query.order_by(Event.dateTime.asc()).all()
    return jsonify([e.to_dict() for e in events]), 200


@event_bp.route('/api/events', methods=['POST'])
@role_required('alumni')
def create_event():
    try:
        image_url = None
        if 'eventImage' in request.files:
            file = request.files['eventImage']
            if file and file.filename:
                filename = f"{int(datetime.now(timezone.utc).timestamp() * 1000)}-{secure_filename(file.filename)}"
                upload_dir = current_app.config['UPLOAD_FOLDER']
                os.makedirs(upload_dir, exist_ok=True)
                file.save(os.path.join(upload_dir, filename))
                image_url = f'/uploads/{filename}'

        new_event = Event(
            title=request.form.get('title'),
            type=request.form.get('type'),
            dateTime=request.form.get('dateTime'),
            location=request.form.get('location'),
            description=request.form.get('description'),
            imageUrl=image_url,
            school=request.form.get('school'),
            timestamp=datetime.now(timezone.utc).isoformat(),
        )
        db.session.add(new_event)
        db.session.commit()

        return jsonify({
            'message': 'Event added successfully',
            'event': new_event.to_dict(),
        }), 201
    except Exception as e:
        db.session.rollback()
        print(f'Event Creation Error: {e}')
        return jsonify({'error': 'Internal server error'}), 500
