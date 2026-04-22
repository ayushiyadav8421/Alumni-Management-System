import os
from datetime import datetime, timezone
from flask import Blueprint, request, jsonify, current_app
from werkzeug.utils import secure_filename
from models import db, ContactMessage

contact_bp = Blueprint('contact', __name__)


@contact_bp.route('/api/contact-message', methods=['POST'])
def create_contact_message():
    try:
        attachment_url = None
        attachment_name = None

        if 'attachment' in request.files:
            file = request.files['attachment']
            if file and file.filename:
                filename = f"{int(datetime.now(timezone.utc).timestamp() * 1000)}-{secure_filename(file.filename)}"
                upload_dir = current_app.config['UPLOAD_FOLDER']
                os.makedirs(upload_dir, exist_ok=True)
                file.save(os.path.join(upload_dir, filename))
                attachment_url = f'/uploads/{filename}'
                attachment_name = file.filename

        new_msg = ContactMessage(
            fullName=request.form.get('fullName'),
            organisation=request.form.get('organisation'),
            designation=request.form.get('designation'),
            department=request.form.get('department'),
            officialEmail=request.form.get('officialEmail'),
            personalEmail=request.form.get('personalEmail'),
            mobileNumber=request.form.get('mobileNumber'),
            category=request.form.get('category'),
            message=request.form.get('message'),
            attachmentUrl=attachment_url,
            attachmentName=attachment_name,
            timestamp=datetime.now(timezone.utc).isoformat(),
        )
        db.session.add(new_msg)
        db.session.commit()

        return jsonify({
            'message': 'Contact message sent successfully',
            'messageData': new_msg.to_dict(),
        }), 201
    except Exception as e:
        db.session.rollback()
        print(f'Contact Message Error: {e}')
        return jsonify({'error': 'Internal server error'}), 500


@contact_bp.route('/api/contact-messages', methods=['GET'])
def get_contact_messages():
    messages = ContactMessage.query.all()
    return jsonify([m.to_dict() for m in messages]), 200
