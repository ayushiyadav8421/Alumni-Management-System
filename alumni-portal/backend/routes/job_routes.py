from datetime import datetime, timezone
from flask import Blueprint, request, jsonify
from models import db, Job
from utils.auth_utils import role_required

job_bp = Blueprint('jobs', __name__)


@job_bp.route('/api/jobs', methods=['POST'])
@role_required('alumni')
def create_job():
    try:
        data = request.get_json()
        new_job = Job(
            jobTitle=data.get('jobTitle'),
            companyName=data.get('companyName'),
            jobType=data.get('jobType'),
            location=data.get('location'),
            jobDescription=data.get('jobDescription'),
            applyLink=data.get('applyLink'),
            postedBy=data.get('postedBy'),
            timestamp=datetime.now(timezone.utc).isoformat(),
        )
        db.session.add(new_job)
        db.session.commit()

        return jsonify({
            'message': 'Job posted successfully',
            'job': new_job.to_dict(),
        }), 201
    except Exception as e:
        db.session.rollback()
        print(f'Job Post Error: {e}')
        return jsonify({'error': 'Internal server error'}), 500


@job_bp.route('/api/jobs', methods=['GET'])
def get_jobs():
    jobs = Job.query.all()
    return jsonify([j.to_dict() for j in jobs]), 200
