import time
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()


def generate_id():
    """Generate a timestamp-based ID matching JavaScript's Date.now()."""
    return int(time.time() * 1000)


class Alumni(db.Model):
    __tablename__ = 'alumni'

    id = db.Column(db.BigInteger, primary_key=True, default=generate_id)
    fullName = db.Column(db.String(255), nullable=False)
    email = db.Column(db.String(255), unique=True, nullable=False)
    password = db.Column(db.String(255), nullable=False)
    school = db.Column(db.String(50))
    department = db.Column(db.String(255))
    batchYear = db.Column(db.String(10))
    companyName = db.Column(db.String(255))
    jobTitle = db.Column(db.String(255))
    location = db.Column(db.String(255))
    linkedin = db.Column(db.Text)
    bio = db.Column(db.Text)
    salary = db.Column(db.Float, default=0)
    profile_image = db.Column(db.String(500))
    phoneNumber = db.Column(db.String(50))
    role = db.Column(db.String(20), default='alumni', nullable=False)
    timestamp = db.Column(db.String(50))

    def to_dict(self, include_password=False):
        data = {
            'id': self.id,
            'fullName': self.fullName,
            'email': self.email,
            'school': self.school,
            'department': self.department,
            'batchYear': self.batchYear,
            'companyName': self.companyName,
            'jobTitle': self.jobTitle,
            'location': self.location,
            'linkedin': self.linkedin,
            'bio': self.bio,
            'salary': self.salary,
            'profile_image': self.profile_image,
            'profilePhotoUrl': self.profile_image,   # alias for frontend compat
            'phoneNumber': self.phoneNumber,
            'role': self.role,
            'timestamp': self.timestamp,
        }
        if include_password:
            data['password'] = self.password
        return data


class Event(db.Model):
    __tablename__ = 'events'

    id = db.Column(db.BigInteger, primary_key=True, default=generate_id)
    title = db.Column(db.String(500), nullable=False)
    type = db.Column(db.String(100))
    dateTime = db.Column(db.String(50))
    location = db.Column(db.String(500))
    description = db.Column(db.Text)
    imageUrl = db.Column(db.String(500))
    school = db.Column(db.String(50))
    timestamp = db.Column(db.String(50))

    def to_dict(self):
        return {
            'id': self.id,
            'title': self.title,
            'type': self.type,
            'dateTime': self.dateTime,
            'location': self.location,
            'description': self.description,
            'imageUrl': self.imageUrl,
            'school': self.school,
            'timestamp': self.timestamp,
        }


class Job(db.Model):
    __tablename__ = 'jobs'

    id = db.Column(db.BigInteger, primary_key=True, default=generate_id)
    jobTitle = db.Column(db.String(255))
    companyName = db.Column(db.String(255))
    jobType = db.Column(db.String(100))
    location = db.Column(db.String(255))
    jobDescription = db.Column(db.Text)
    applyLink = db.Column(db.String(500))
    postedBy = db.Column(db.String(255))
    timestamp = db.Column(db.String(50))

    def to_dict(self):
        return {
            'id': self.id,
            'jobTitle': self.jobTitle,
            'companyName': self.companyName,
            'jobType': self.jobType,
            'location': self.location,
            'jobDescription': self.jobDescription,
            'applyLink': self.applyLink,
            'postedBy': self.postedBy,
            'timestamp': self.timestamp,
        }


class Donation(db.Model):
    __tablename__ = 'donations'

    id = db.Column(db.BigInteger, primary_key=True, default=generate_id)
    fullName = db.Column(db.String(255))
    email = db.Column(db.String(255))
    amount = db.Column(db.String(50))
    purpose = db.Column(db.String(255))
    message = db.Column(db.Text)
    timestamp = db.Column(db.String(50))

    def to_dict(self):
        return {
            'id': self.id,
            'fullName': self.fullName,
            'email': self.email,
            'amount': self.amount,
            'purpose': self.purpose,
            'message': self.message,
            'timestamp': self.timestamp,
        }


class ContactMessage(db.Model):
    __tablename__ = 'contact_messages'

    id = db.Column(db.BigInteger, primary_key=True, default=generate_id)
    fullName = db.Column(db.String(255))
    organisation = db.Column(db.String(255))
    designation = db.Column(db.String(255))
    department = db.Column(db.String(255))
    officialEmail = db.Column(db.String(255))
    personalEmail = db.Column(db.String(255))
    mobileNumber = db.Column(db.String(50))
    category = db.Column(db.String(100))
    message = db.Column(db.Text)
    attachmentUrl = db.Column(db.String(500))
    attachmentName = db.Column(db.String(255))
    timestamp = db.Column(db.String(50))

    def to_dict(self):
        return {
            'id': self.id,
            'fullName': self.fullName,
            'organisation': self.organisation,
            'designation': self.designation,
            'department': self.department,
            'officialEmail': self.officialEmail,
            'personalEmail': self.personalEmail,
            'mobileNumber': self.mobileNumber,
            'category': self.category,
            'message': self.message,
            'attachmentUrl': self.attachmentUrl,
            'attachmentName': self.attachmentName,
            'timestamp': self.timestamp,
        }


class Message(db.Model):
    __tablename__ = 'messages'

    id = db.Column(db.BigInteger, primary_key=True, default=generate_id)
    senderId = db.Column(db.BigInteger, nullable=False)
    receiverId = db.Column(db.BigInteger, nullable=False)
    content = db.Column(db.Text)
    senderName = db.Column(db.String(255))
    timestamp = db.Column(db.String(50))

    def to_dict(self):
        return {
            'id': self.id,
            'senderId': self.senderId,
            'receiverId': self.receiverId,
            'content': self.content,
            'senderName': self.senderName,
            'timestamp': self.timestamp,
        }
