import urllib.request
import json

def post(data):
    req = urllib.request.Request('http://localhost:5000/api/chatbot/query', data=json.dumps(data).encode(), headers={'Content-Type': 'application/json'}, method='POST')
    try:
        with urllib.request.urlopen(req) as resp:
            return json.loads(resp.read().decode())
    except Exception as e:
        return str(e)

print(post({"message": "show alumni from seas"}))
print(post({"message": "from 2021", "context": {"intent": "find_alumni", "school": "SEAS", "step": "filter_type"}}))
