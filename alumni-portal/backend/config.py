import os
from datetime import timedelta
from dotenv import load_dotenv

load_dotenv()

class Config:

    # Database
    DATABASE_URL = os.getenv('DATABASE_URL')

    if DATABASE_URL:
        if DATABASE_URL.startswith("postgres://"):
            DATABASE_URL = DATABASE_URL.replace("postgres://", "postgresql://", 1)

        SQLALCHEMY_DATABASE_URI = DATABASE_URL

    else:
        BASE_DIR = os.path.abspath(os.path.dirname(__file__))

        SQLALCHEMY_DATABASE_URI = "sqlite:///" + os.path.join(BASE_DIR, "alumni.db")

    SQLALCHEMY_TRACK_MODIFICATIONS = False


    # JWT
    JWT_SECRET_KEY = os.getenv('JWT_SECRET_KEY', 'super-secret-key')
    JWT_ACCESS_TOKEN_EXPIRES = timedelta(days=7)


    # Uploads
    UPLOAD_FOLDER = os.path.join(
        os.path.dirname(os.path.abspath(__file__)), 'uploads'
    )

    MAX_CONTENT_LENGTH = 16 * 1024 * 1024

    ALLOWED_EXTENSIONS = {'jpg', 'jpeg', 'png', 'gif', 'pdf', 'doc', 'docx'}
