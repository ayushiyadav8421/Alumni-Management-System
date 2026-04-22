"""
Seed script — migrates existing data from server/db.json into MySQL.

Usage:
    python backend/seed.py

Reads ../server/db.json and inserts all records into the MySQL database.
Existing alumni passwords are hashed during import.
"""

import json
import os
import shutil
import sys

# Ensure backend package is importable
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from werkzeug.security import generate_password_hash
from app import create_app
from models import db, Alumni, Event, Job, Donation, ContactMessage, Message


def seed():
    app = create_app()

    # Path to existing JSON database
    db_json_path = os.path.join(
        os.path.dirname(os.path.abspath(__file__)), '..', 'server', 'db.json'
    )

    if not os.path.exists(db_json_path):
        print('✗ server/db.json not found. Nothing to seed.')
        return

    with open(db_json_path, 'r', encoding='utf-8') as f:
        data = json.load(f)

    # Copy uploads from server/uploads to backend/uploads
    src_uploads = os.path.join(
        os.path.dirname(os.path.abspath(__file__)), '..', 'server', 'uploads'
    )
    dst_uploads = os.path.join(
        os.path.dirname(os.path.abspath(__file__)), 'uploads'
    )
    os.makedirs(dst_uploads, exist_ok=True)

    if os.path.exists(src_uploads):
        for filename in os.listdir(src_uploads):
            src_file = os.path.join(src_uploads, filename)
            dst_file = os.path.join(dst_uploads, filename)
            if os.path.isfile(src_file) and not os.path.exists(dst_file):
                shutil.copy2(src_file, dst_file)
                print(f'  Copied upload: {filename}')

    with app.app_context():
        # --- Alumni ---
        for item in data.get('alumni', []):
            if Alumni.query.get(item['id']):
                continue
            alumni = Alumni(
                id=item['id'],
                fullName=item.get('fullName', ''),
                email=item.get('email', ''),
                password=generate_password_hash(item.get('password', '')),
                school=item.get('school', ''),
                department=item.get('department', ''),
                batchYear=item.get('batchYear', ''),
                companyName=item.get('companyName', ''),
                jobTitle=item.get('jobTitle', ''),
                location=item.get('location', ''),
                linkedin=item.get('linkedin', ''),
                bio=item.get('bio', ''),
                salary=float(item.get('salary', 0)),
                profile_image=item.get('profilePhotoUrl') or item.get('profile_image'),
                phoneNumber=item.get('phoneNumber', ''),
                timestamp=item.get('timestamp', ''),
            )
            db.session.add(alumni)
        print(f'  Seeded {len(data.get("alumni", []))} alumni records')

        # --- Events ---
        for item in data.get('events', []):
            if Event.query.get(item['id']):
                continue
            event = Event(
                id=item['id'],
                title=item.get('title', ''),
                type=item.get('type', ''),
                dateTime=item.get('dateTime', ''),
                location=item.get('location', ''),
                description=item.get('description', ''),
                imageUrl=item.get('imageUrl'),
                school=item.get('school', ''),
                timestamp=item.get('timestamp', ''),
            )
            db.session.add(event)
        print(f'  Seeded {len(data.get("events", []))} event records')

        # --- Jobs ---
        for item in data.get('jobs', []):
            if Job.query.get(item['id']):
                continue
            job = Job(
                id=item['id'],
                jobTitle=item.get('jobTitle', ''),
                companyName=item.get('companyName', ''),
                jobType=item.get('jobType', ''),
                location=item.get('location', ''),
                jobDescription=item.get('jobDescription', ''),
                applyLink=item.get('applyLink', ''),
                postedBy=item.get('postedBy', ''),
                timestamp=item.get('timestamp', ''),
            )
            db.session.add(job)
        print(f'  Seeded {len(data.get("jobs", []))} job records')

        # --- Donations ---
        for item in data.get('donations', []):
            if Donation.query.get(item['id']):
                continue
            donation = Donation(
                id=item['id'],
                fullName=item.get('fullName', ''),
                email=item.get('email', ''),
                amount=str(item.get('amount', '')),
                purpose=item.get('purpose', ''),
                message=item.get('message', ''),
                timestamp=item.get('timestamp', ''),
            )
            db.session.add(donation)
        print(f'  Seeded {len(data.get("donations", []))} donation records')

        # --- Contact Messages ---
        for item in data.get('contactMessages', []):
            if ContactMessage.query.get(item['id']):
                continue
            contact = ContactMessage(
                id=item['id'],
                fullName=item.get('fullName', ''),
                organisation=item.get('organisation', ''),
                designation=item.get('designation', ''),
                department=item.get('department', ''),
                officialEmail=item.get('officialEmail', ''),
                personalEmail=item.get('personalEmail', ''),
                mobileNumber=item.get('mobileNumber', ''),
                category=item.get('category', ''),
                message=item.get('message', ''),
                attachmentUrl=item.get('attachmentUrl'),
                attachmentName=item.get('attachmentName'),
                timestamp=item.get('timestamp', ''),
            )
            db.session.add(contact)
        print(f'  Seeded {len(data.get("contactMessages", []))} contact messages')

        # --- Chat Messages ---
        for item in data.get('messages', []):
            if Message.query.get(item['id']):
                continue
            msg = Message(
                id=item['id'],
                senderId=int(item.get('senderId', 0)),
                receiverId=int(item.get('receiverId', 0)),
                content=item.get('content', item.get('text', '')),
                senderName=item.get('senderName', ''),
                timestamp=item.get('timestamp', ''),
            )
            db.session.add(msg)
        print(f'  Seeded {len(data.get("messages", []))} chat messages')

        db.session.commit()
        print('✓ Database seeding complete!')


if __name__ == '__main__':
    seed()
