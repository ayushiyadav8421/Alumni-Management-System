from functools import wraps
from flask_jwt_extended import get_jwt_identity, verify_jwt_in_request
from flask import jsonify
from models import Alumni

def role_required(role):
    def decorator(f):
    	@wraps(f)
    	def decorated_function(*args, **kwargs):
    		# Ensure JWT is valid
    		verify_jwt_in_request()
    		
    		# Get user identity from JWT
    		user_id = get_jwt_identity()
    		user = Alumni.query.get(user_id)
    		
    		if not user:
    			return jsonify({'error': 'User not found'}), 404
    			
    		if user.role.lower() != role.lower():
    			return jsonify({'error': f'Access denied: {role} role required'}), 403
    			
    		return f(*args, **kwargs)
    	return decorated_function
    return decorator
