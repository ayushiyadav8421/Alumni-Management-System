import os
from datetime import datetime, timezone
from flask import Blueprint, request, jsonify, current_app
from flask_jwt_extended import jwt_required
from werkzeug.utils import secure_filename
from werkzeug.security import generate_password_hash
from models import db, Alumni

alumni_bp = Blueprint('alumni', __name__)


def allowed_file(filename):
    allowed = current_app.config.get('ALLOWED_EXTENSIONS', set())
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in allowed


# -------------------------------------------------------------------
# GET /api/alumni/top-achievers  (must be registered BEFORE /:id)
# -------------------------------------------------------------------
@alumni_bp.route('/api/alumni/top-achievers', methods=['GET'])
def top_achievers():
    try:
        # Only alumni can be top achievers
        all_alumni = Alumni.query.filter(Alumni.role == 'alumni').all()
        schools = ['SEAS', 'ESLA', 'PSB']
        result = []
        for school in schools:
            school_alumni = [
                a for a in all_alumni
                if a.school and a.school.upper() == school
            ]
            if not school_alumni:
                continue
            top = max(school_alumni, key=lambda a: a.salary or 0)
            result.append(top.to_dict())
        return jsonify(result), 200
    except Exception as e:
        print(f'Top Achievers Error: {e}')
        return jsonify({'error': 'Internal server error fetching top achievers'}), 500


# -------------------------------------------------------------------
# GET /api/alumni/count-by-school
# -------------------------------------------------------------------
@alumni_bp.route('/api/alumni/count-by-school', methods=['GET'])
def count_by_school():
    try:
        # Only count alumni for school statistics
        all_alumni = Alumni.query.filter(Alumni.role == 'alumni').all()
        counts = {}
        for a in all_alumni:
            school = a.school.upper() if a.school else 'UNKNOWN'
            counts[school] = counts.get(school, 0) + 1
        return jsonify(counts), 200
    except Exception as e:
        print(f'School Counts Error: {e}')
        return jsonify({'error': 'Internal server error fetching school counts'}), 500


# -------------------------------------------------------------------
# GET /api/alumni          ?school=SEAS
# -------------------------------------------------------------------
@alumni_bp.route('/api/alumni', methods=['GET'])
def get_alumni():
    try:
        school = request.args.get('school')
        role_filter = request.args.get('role', 'alumni') # Default to alumni
        
        query = Alumni.query
        
        # Apply role filter
        if role_filter != 'all':
            query = query.filter(Alumni.role == role_filter)
            
        if school:
            query = query.filter(
                db.func.upper(Alumni.school) == school.upper()
            )
        query = query.order_by(Alumni.timestamp.desc())
        alumni_list = query.all()
        return jsonify([a.to_dict() for a in alumni_list]), 200
    except Exception as e:
        print(f'Fetch Error: {e}')
        return jsonify({'error': 'Internal server error while fetching alumni'}), 500


# -------------------------------------------------------------------
# GET /api/students
# -------------------------------------------------------------------
@alumni_bp.route('/api/students', methods=['GET'])
def get_students():
    try:
        school = request.args.get('school')
        query = Alumni.query.filter(Alumni.role == 'student')
        if school:
            query = query.filter(
                db.func.upper(Alumni.school) == school.upper()
            )
        query = query.order_by(Alumni.timestamp.desc())
        student_list = query.all()
        return jsonify([a.to_dict() for a in student_list]), 200
    except Exception as e:
        print(f'Fetch Students Error: {e}')
        return jsonify({'error': 'Internal server error while fetching students'}), 500


# -------------------------------------------------------------------
# POST /api/alumni   (registration — public, multipart/form-data)
# -------------------------------------------------------------------
@alumni_bp.route('/api/alumni', methods=['POST'])
def register_alumni():
    try:
        fullName = request.form.get('fullName')
        email = request.form.get('email')
        password = request.form.get('password')
        school = request.form.get('school')
        department = request.form.get('department')
        batchYear = request.form.get('batchYear')
        companyName = request.form.get('companyName')
        jobTitle = request.form.get('jobTitle')
        location = request.form.get('location')
        linkedin = request.form.get('linkedin')
        bio = request.form.get('bio')
        salary_raw = request.form.get('salary')
        salary = float(salary_raw) if salary_raw else 0
        role = request.form.get('role', 'alumni')

        profile_image = None
        if 'profilePhoto' in request.files:
            file = request.files['profilePhoto']
            if file and file.filename:
                filename = f"{int(datetime.now(timezone.utc).timestamp() * 1000)}-{secure_filename(file.filename)}"
                upload_dir = current_app.config['UPLOAD_FOLDER']
                os.makedirs(upload_dir, exist_ok=True)
                file.save(os.path.join(upload_dir, filename))
                profile_image = f'/uploads/{filename}'

        hashed_pw = generate_password_hash(password)

        new_alumni = Alumni(
            fullName=fullName,
            email=email,
            password=hashed_pw,
            school=school,
            department=department,
            batchYear=batchYear,
            companyName=companyName,
            jobTitle=jobTitle,
            location=location,
            linkedin=linkedin,
            bio=bio,
            salary=salary,
            profile_image=profile_image,
            role=role,
            timestamp=datetime.now(timezone.utc).isoformat(),
        )
        db.session.add(new_alumni)
        db.session.commit()

        return jsonify({
            'message': 'Registration successful',
            'id': new_alumni.id,
        }), 201
    except Exception as e:
        db.session.rollback()
        print(f'Registration Error: {e}')
        return jsonify({'error': 'Internal server error during registration'}), 500


# -------------------------------------------------------------------
# PUT /api/alumni/<id>   (protected)
# -------------------------------------------------------------------
@alumni_bp.route('/api/alumni/<int:alumni_id>', methods=['PUT'])
@jwt_required()
def update_alumni(alumni_id):
    try:
        alumni = Alumni.query.get(alumni_id)
        if not alumni:
            return jsonify({'error': 'Alumni not found'}), 404

        # Accept both JSON and form-data
        if request.content_type and 'multipart/form-data' in request.content_type:
            data = request.form
        else:
            data = request.get_json() or {}

        if data.get('fullName'):
            alumni.fullName = data['fullName']
        if data.get('email'):
            alumni.email = data['email']
        if data.get('school'):
            alumni.school = data['school']
        if data.get('department'):
            alumni.department = data['department']
        if data.get('batchYear'):
            alumni.batchYear = data['batchYear']
        if data.get('companyName'):
            alumni.companyName = data['companyName']
        if data.get('jobTitle'):
            alumni.jobTitle = data['jobTitle']
        if data.get('location'):
            alumni.location = data['location']
        if data.get('linkedin'):
            alumni.linkedin = data['linkedin']
        if data.get('bio'):
            alumni.bio = data['bio']
        if data.get('phoneNumber'):
            alumni.phoneNumber = data['phoneNumber']
        if data.get('salary'):
            alumni.salary = float(data['salary'])

        if 'profilePhoto' in request.files:
            file = request.files['profilePhoto']
            if file and file.filename:
                filename = f"{int(datetime.now(timezone.utc).timestamp() * 1000)}-{secure_filename(file.filename)}"
                upload_dir = current_app.config['UPLOAD_FOLDER']
                os.makedirs(upload_dir, exist_ok=True)
                file.save(os.path.join(upload_dir, filename))
                alumni.profile_image = f'/uploads/{filename}'

        db.session.commit()
        return jsonify({'message': 'Profile updated successfully'}), 200
    except Exception as e:
        db.session.rollback()
        print(f'Update Error: {e}')
        return jsonify({'error': 'Internal server error during update'}), 500


# -------------------------------------------------------------------
# DELETE /api/alumni/<id>   (protected)
# -------------------------------------------------------------------
@alumni_bp.route('/api/alumni/<int:alumni_id>', methods=['DELETE'])
@jwt_required()
def delete_alumni(alumni_id):
    try:
        alumni = Alumni.query.get(alumni_id)
        if not alumni:
            return jsonify({'error': 'Alumni not found'}), 404

        # Delete profile photo file if exists
        if alumni.profile_image:
            file_path = os.path.join(
                current_app.config['UPLOAD_FOLDER'],
                alumni.profile_image.lstrip('/uploads/')
            )
            if os.path.exists(file_path):
                os.remove(file_path)

        db.session.delete(alumni)
        db.session.commit()
        return jsonify({'message': 'Alumni removed successfully'}), 200
    except Exception as e:
        db.session.rollback()
        print(f'Delete Error: {e}')
        return jsonify({'error': 'Internal server error during deletion'}), 500
