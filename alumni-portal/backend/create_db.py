"""Create the MySQL database if it doesn't exist."""
import pymysql
from dotenv import load_dotenv
import os

# Load .env from backend directory
load_dotenv(os.path.join(os.path.dirname(os.path.abspath(__file__)), '.env'))

host = os.getenv('DB_HOST', 'localhost')
user = os.getenv('DB_USER', 'root')
password = os.getenv('DB_PASSWORD', '')
db_name = os.getenv('DB_NAME', 'alumni_portal_db')

try:
    conn = pymysql.connect(host=host, user=user, password=password)
    cursor = conn.cursor()
    cursor.execute(f"CREATE DATABASE IF NOT EXISTS `{db_name}` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci")
    conn.commit()
    print(f'✓ Database "{db_name}" created or already exists')
    cursor.close()
    conn.close()
except Exception as e:
    print(f'✗ Failed to create database: {e}')
    print('  Please ensure MySQL is running and check backend/.env credentials.')
