import re
from flask import Blueprint, request, jsonify
from models import db, Alumni, Event, Job

chatbot_bp = Blueprint('chatbot', __name__)

@chatbot_bp.route('/api/chatbot/query', methods=['POST'])
def handle_query():
    data = request.get_json() or {}
    message = data.get('message', '').strip().lower()
    context = data.get('context', {})

    new_context = dict(context)
    intent = new_context.get('intent', None)
    
    # NLP Regex Parsers
    match_school = re.search(r'\b(seas|esla|psb)\b', message)
    match_batch = re.search(r'\b(20\d{2})\b', message)
    match_salary = re.search(r'\b(\d+)\s*(?:lpa|lakhs?)\b', message)
    
    # Priority Overrides
    if 'alumni' in message or 'find' in message or 'search' in message:
        if not intent and not any(kw in message for kw in ['event', 'job', 'register', 'profile', 'contact', 'donation', 'salary']):
            intent = 'find_alumni'
            new_context['intent'] = 'find_alumni'
            new_context['step'] = 'start'

    if 'filter again' in message:
        intent = 'find_alumni'
        new_context['intent'] = 'find_alumni'
        new_context['step'] = 'filter_type'
        
    # Static Intents
    if any(kw in message for kw in ['event', 'upcoming']):
        events = Event.query.order_by(Event.id.desc()).limit(5).all()
        if not events:
             return jsonify({"text": "No upcoming events found.", "options": ["Find Alumni", "Main Menu"], "context": {}})
        return jsonify({
            "text": "Here are the upcoming events:",
            "data": [e.to_dict() for e in events],
            "type": "event_list",
            "options": ["Find Alumni", "Jobs and Placements"],
            "context": {}
        })
        
    elif any(kw in message for kw in ['job', 'placement', 'hiring']):
        jobs = Job.query.order_by(Job.id.desc()).limit(5).all()
        if not jobs:
             return jsonify({"text": "No jobs found.", "options": ["Find Alumni", "Main Menu"], "context": {}})
        return jsonify({
            "text": "Here are some available jobs and placements:",
            "data": [j.to_dict() for j in jobs],
            "type": "job_list",
            "options": ["Upcoming Events", "Main Menu"],
            "context": {}
        })
        
    elif 'register' in message:
        return jsonify({"text": "To register, click on the Register button at the top right of the navigation bar, provide your details, and verify your email.", "options": ["Main Menu"], "context": {}})
        
    elif 'profile' in message or 'edit' in message or 'update' in message:
        return jsonify({"text": "To edit your profile, log in to your account, navigate to the Alumni Directory, and click the 'Edit Profile' button on the right panel.", "options": ["Main Menu"], "context": {}})
        
    elif 'donation' in message:
        return jsonify({"text": "You can support the university by visiting the Donations page from the main navigation menu.", "options": ["Main Menu"], "context": {}})

    elif 'contact' in message:
        return jsonify({"text": "You can reach the Alumni Office at alumni.office@srmap.edu.in or call us at +91 00000 00000.", "options": ["Main Menu"], "context": {}})
    
    elif 'top salary' in message:
        alumni = Alumni.query.order_by(Alumni.salary.desc()).limit(5).all()
        if not alumni:
            return jsonify({"text": "No top salary alumni records found.", "options": ["Main Menu"], "context": {}})
        return jsonify({
            "text": "Here are the top salary alumni:",
            "data": [a.to_dict() for a in alumni],
            "type": "alumni_list",
            "options": ["Find Alumni", "Upcoming Events"],
            "context": {}
        })
        
    elif 'main menu' in message:
        return jsonify({
            "text": "How can I help you today?",
            "options": ["Find Alumni", "Top Salary Alumni", "Upcoming Events", "Jobs and Placements", "Register Help", "Update Profile Help", "Contact Info"],
            "context": {}
        })

    # Alumni Intent Flow (State Machine)
    if intent == 'find_alumni':
        step = new_context.get('step', 'start')
        
        # Unconditional Extraction
        if match_school:
            new_context['school'] = match_school.group(1).upper()
            if step in ['start', 'route_school_choice']:
                step = 'filter_type'
                new_context['step'] = step
                
        if match_batch:
            new_context['filter'] = 'batchYear'
            new_context['filter_val'] = match_batch.group(1)
            step = 'execute'
            new_context['step'] = step

        # Detect Company from common names instantly
        common_companies = ['microsoft', 'google', 'amazon', 'tcs', 'wipro', 'infosys', 'paypal', 'apple', 'meta']
        for comp in common_companies:
            if comp in message:
                new_context['filter'] = 'companyName'
                new_context['filter_val'] = comp.capitalize()
                step = 'execute'
                new_context['step'] = step
                break

        if step == 'start':
            # Check if user already provided enough context (e.g., "Find alumni from 2021")
            if new_context.get('school') and new_context.get('filter'):
                step = 'execute'
            elif new_context.get('school'):
                step = 'filter_type'
            else:
                new_context['step'] = 'route_first_choice'
                return jsonify({
                    "text": "Which filter would you like to use?",
                    "options": ["School", "Batch year", "Company", "Salary"],
                    "context": new_context
                })
                
        if step == 'route_first_choice':
            if 'school' in message:
                new_context['step'] = 'route_school_choice'
                return jsonify({
                    "text": "Which school are you looking for?",
                    "options": ["SEAS", "ESLA", "PSB"],
                    "context": new_context
                })
            elif 'batch' in message:
                new_context['step'] = 'ask_value'
                new_context['filter'] = 'batchYear'
                return jsonify({
                    "text": "Which batch year? (e.g., 2021, 2024)",
                    "options": ["2021", "2022", "2023", "2024"],
                    "context": new_context
                })
            elif 'company' in message:
                new_context['step'] = 'ask_value'
                new_context['filter'] = 'companyName'
                return jsonify({
                    "text": "Which company? (e.g., Microsoft, Google)",
                    "options": ["Microsoft", "Google", "Amazon", "TCS"],
                    "context": new_context
                })
            elif 'salary' in message:
                new_context['step'] = 'ask_value'
                new_context['filter'] = 'salary'
                return jsonify({
                    "text": "Minimum salary in LPA? (e.g., 10, 20)",
                    "options": ["10", "20", "30", "40"],
                    "context": new_context
                })
            else:
                 # Fallthrough to execute in case they typed a raw value
                 pass
                 
        if step == 'route_school_choice':
            # If they didn't match via match_school
            if message.upper() in ['SEAS', 'ESLA', 'PSB']:
                new_context['school'] = message.upper()
                new_context['step'] = 'filter_type'
            else:
                return jsonify({
                    "text": "Please select a valid school.",
                    "options": ["SEAS", "ESLA", "PSB"],
                    "context": new_context
                })

        if step == 'filter_type':
            if 'batch' in message:
                new_context['step'] = 'ask_value'
                new_context['filter'] = 'batchYear'
                return jsonify({
                    "text": "Which batch year? (e.g., 2021, 2024)",
                    "options": ["2021", "2022", "2023", "2024"],
                    "context": new_context
                })
            elif 'company' in message:
                new_context['step'] = 'ask_value'
                new_context['filter'] = 'companyName'
                return jsonify({
                    "text": "Which company? (e.g., Microsoft, Google)",
                    "options": ["Microsoft", "Google", "Amazon", "TCS"],
                    "context": new_context
                })
            elif 'see all' in message or 'show all' in message:
                new_context['step'] = 'execute'
                new_context['filter'] = None
                new_context['filter_val'] = None
            else:
                return jsonify({
                    "text": f"Do you want to filter by batch year or company?",
                    "options": ["Batch year", "Company", "See all"],
                    "context": new_context
                })
                
        if step == 'ask_value':
            # Receive raw input value
            filter_col = new_context.get('filter')
            filter_val = message
            
            if filter_col == 'batchYear' and match_batch:
                filter_val = match_batch.group(1)
            elif filter_col == 'salary' and match_salary:
                filter_val = match_salary.group(1)
                
            new_context['filter_val'] = filter_val
            new_context['step'] = 'execute'
            step = 'execute'

        if step == 'execute':
            school = new_context.get('school', '')
            filter_col = new_context.get('filter')
            filter_val = new_context.get('filter_val')

            query = Alumni.query

            if school and school in ['SEAS', 'ESLA', 'PSB']:
                query = query.filter(Alumni.school == school)

            if filter_col and filter_val:
                if filter_col == 'batchYear':
                    query = query.filter(Alumni.batchYear == filter_val)
                elif filter_col == 'companyName':
                    clean_val = re.sub(r'working at|at|in', '', filter_val).strip()
                    query = query.filter(Alumni.companyName.ilike(f"%{clean_val}%"))
                elif filter_col == 'salary':
                    try:
                        # Salary is stored in raw INR (e.g., 7500000 = 75 LPA)
                        min_sal_lpa = float(filter_val)
                        query = query.filter(Alumni.salary >= int(min_sal_lpa * 100000))
                    except ValueError:
                        pass

            alumni = query.limit(10).all()

            criteria_texts = []
            if school: criteria_texts.append(school)
            if filter_col and filter_val:
                criteria_texts.append(f"({filter_col}: {filter_val})")
                
            resp_text = f"Here are alumni matching your criteria: {' '.join(criteria_texts)}".strip()

            if not alumni:
                return jsonify({
                    "text": "No alumni found matching your criteria. Try another filter.",
                    "options": ["Filter again", "Main Menu"],
                    "context": new_context
                })

            return jsonify({
                "text": resp_text,
                "data": [a.to_dict() for a in alumni],
                "type": "alumni_list",
                "options": ["Filter again", "Main Menu"],
                "context": new_context
            })

    # Strict Fallback
    return jsonify({
        "text": "I'm not sure I understand. I can help you find alumni, upcoming events, jobs, or guide you on how to register and edit your profile.",
        "options": ["Find Alumni", "Top Salary Alumni", "Upcoming Events", "Jobs and Placements"],
        "context": {}
    })
