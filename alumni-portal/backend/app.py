import os
import sys

from flask import Flask, send_from_directory
from flask_cors import CORS
from flask_jwt_extended import JWTManager

from config import Config
from models import db

from routes.auth_routes import auth_bp
from routes.alumni_routes import alumni_bp
from routes.event_routes import event_bp
from routes.chat_routes import chat_bp
from routes.contact_routes import contact_bp
from routes.donation_routes import donation_bp
from routes.job_routes import job_bp
from routes.chatbot_routes import chatbot_bp


def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    # Initialise extensions
    db.init_app(app)
    
    # Configure CORS
    allowed_origins = os.getenv('ALLOWED_ORIGINS', '*')
    if allowed_origins != '*':
        allowed_origins = allowed_origins.split(',')
    CORS(app, origins=allowed_origins)
    
    JWTManager(app)

    # Register all route blueprints
    app.register_blueprint(auth_bp)
    app.register_blueprint(alumni_bp)
    app.register_blueprint(event_bp)
    app.register_blueprint(chat_bp)
    app.register_blueprint(contact_bp)
    app.register_blueprint(donation_bp)
    app.register_blueprint(job_bp)
    app.register_blueprint(chatbot_bp)

    # Static file serving for uploads
    @app.route('/uploads/<path:filename>')
    def serve_upload(filename):
        return send_from_directory(app.config['UPLOAD_FOLDER'], filename)

    # Root health-check (matches Express behaviour)
    @app.route('/')
    def index():
        return 'Alumni Portal API is running...'

    # Create uploads directory
    os.makedirs(app.config['UPLOAD_FOLDER'], exist_ok=True)

    # Create database tables
    with app.app_context():
        db.create_all()
        print('[OK] Database tables created / verified')

    return app


if __name__ == '__main__':
    app = create_app()
    port = int(os.getenv('PORT', 5000))
    print(f'[OK] Flask server is running on http://localhost:{port}')
    app.run(host='0.0.0.0', port=port, debug=True)
