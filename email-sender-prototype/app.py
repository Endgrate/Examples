from flask import Flask, request, redirect, jsonify, render_template
import requests
import os
from dotenv import load_dotenv , find_dotenv

app = Flask(__name__)

#Pulling the API key from .env file
env_path = find_dotenv()
if env_path:
    load_dotenv(env_path)
else:
    print("Warning: .env file not found.")
Key = os.getenv("Key")

# URLs for API requests
POSTurl = "https://endgrate.com/api/push/transfer"
url = "https://endgrate.com/api/push/initiate"

# Headers for the request
headers = {
    "accept": "application/json",
    "content-type": "application/json",
    "authorization": "Bearer " + Key
}
print(headers)
# Global variable for SessionID
SessionID = None

@app.route('/')
def home():
    return render_template('home.html')

@app.route('/initiate', methods=['GET'])
def initiate():
    global SessionID
    payload = {
        "provider": "gmail",
        "save_session": True,
        "schema": [
            {
                "properties": {
                    "Recipient_Email": {
                        "format": "email",
                        "type": "string",
                        "title": "Recipient Email"
                    },
                    "Sender_Email": {
                        "format": "email",
                        "type": "string",
                        "title": "Sender Email"
                    },
                    "Subject": {
                        "format": "string",
                        "type": "string",
                        "title": "Subject"
                    },
                    "Body": {
                        "format": "Long-String",
                        "type": "string",
                        "title": "Body Text"
                    }
                },
                "type": "object",
                "title": "Send_Email"
            }
        ],
        "resource_selection": True
    }

    try:
        response = requests.post(url, json=payload, headers=headers)
        if response.status_code == 200:
            response_data = response.json()
            if response_data.get("success"):
                SessionID = response_data["session_id"]
                return render_template('initiate.html', session_id=SessionID, success=True)
            else:
                return render_template('initiate.html', error_message=response_data.get("error", "Unknown error during initiation."), success=False)
        else:
            return render_template('initiate.html', error_message=f"Failed to initiate session with status code {response.status_code}: {response.text}", success=False)
    except requests.exceptions.RequestException as e:
        return render_template('initiate.html', error_message=str(e), success=False)

#Redirects to the Send_Email page
@app.route('/send-email', methods=['GET', 'POST'])
def send_email():
    global SessionID
    if not SessionID:
        #Makes sure session is initiated and valid
        return render_template('send_email.html', message="Session ID is not set. Please initiate a session first.", form_data=None)

    if request.method == 'POST':
        RecipientEmail = request.form['RecipientEmail']
        subject = request.form['subject']
        BodyTxt = request.form['BodyTxt']

        payload = {
            "session_id": SessionID,
            "endgrate_type": "Send_Email",
            "transfer_data": [{
                "data": {
                    "Recipient_Email": RecipientEmail,
                    "Subject": subject,
                    "Body": BodyTxt
                }
            }]
        }

        response = requests.post(POSTurl, json=payload, headers=headers)
        if response.status_code == 200:
            message = "Email sent successfully!"
        else:
            message = f"Failed to send email. Status code: {response.status_code}"
        return render_template('send_email.html', message=message, form_data=request.form)

    return render_template('send_email.html', form_data=None)

if __name__ == '__main__':
    app.run(debug=True)
