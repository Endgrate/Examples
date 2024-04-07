''' Current Endpoints '''

# types includes "googledocs" and "notion"

# /getSessionID/<type>/<user_id>?redirect=<redirect_url><document_id> - GET
# /getDocText/<type>/<session_id> - GET
# /setDocText/<type>/<session_id> - GET
# /webhook/<user_id>/<document_id> - POST

''' General API for ItsNous Notes functionality '''

# Flask Necessecities
from flask import Flask, request
from flask_cors import CORS

# Endgrate API Key Container
from API_KEY import getAPIKEY

# Python Libraries for General Functions
import requests
import json

# Firebase Storage Libraries
import firebase_admin
from firebase_admin import credentials, firestore


''' Neccessities for Flask APP '''

# Defines Endgrate API Key
ENDGRATE_API_KEY = getAPIKEY()

# Creates Flask App
app = Flask(__name__)
CORS(app)

# Google Docs Presets
GOOGLE_DOCS_PRESET = {
  "provider": "googledocs",
  "type": "Document",
  "objectSchema": {
    "type": "object",
    "properties": {
      "text": {
        "type": "string",
        "title": "Document Text"
      }
    },
    "required": [
      "text"
    ],
    "title": "Document"
  }
}

# Notion Presets
NOTION_PRESET = {
  "provider": "Notion",
  "type": "Database",
  "objectSchema": {
    "type": "object",
    "properties": {
      "text": {
        "type": "string",
        "title": "Document Title"
      }
    },
    "required": [
    ],
    "title": "Database"
  }
}

''' Gets Firebase Credentials '''
if not firebase_admin._apps:
  CRED = requests.get("https://itsnous.uc.r.appspot.com/static/serviceAccountKey.json")
  firebase_admin.initialize_app(credentials.Certificate(json.loads(CRED.content)))

''' Debug Function '''
def debug(string):
  if True:
    print(string)

''' Gets actual data after triggerring pull '''
def getPullData(transfer_id, type):

  url = f"https://endgrate.com/api/pull/data?endgrate_type={type}&transfer_id={transfer_id}"

  headers = {
      "accept": "application/json",
      "authorization": f"Bearer {ENDGRATE_API_KEY}"
  }

  response = requests.get(url, headers=headers)

  debug(response.json())

  return response.json()

''' Triggers pull and gets transfer id '''
def pullData(session_id, type):

  url = "https://endgrate.com/api/pull/transfer"

  payload = {
    "endgrate_type": type,
    "session_id": session_id,
    "synchronous": True
  }

  headers = {
      "accept": "application/json",
      "content-type": "application/json",
      "authorization": f"Bearer {ENDGRATE_API_KEY}"
  }

  response = requests.post(url, json=payload, headers=headers)

  debug(response.json())

  return response.json()

''' Pushes Data to Neccessary Integration '''
def pushData(session_id, text, type):

  url = "https://endgrate.com/api/push/transfer"

  payload = {
    "transfer_data": [
      { 
        "data": { 
          "text": text 
        } 
      }
    ],
    "endgrate_type": type,
    "session_id": session_id
  }

  headers = {
      "accept": "application/json",
      "content-type": "application/json",
      "authorization": f"Bearer {ENDGRATE_API_KEY}"
  }

  response = requests.post(url, json=payload, headers=headers)

  debug(response.json())

  return response.json()

''' Reciever for webhook functionality in Endgrate API '''
@app.route('/webhook/<user_id>/<document_id>', methods=['POST'])
def webhook_receiver(user_id, document_id):

  # Gets Payload from Post Request
  data = request.json

  try:

    # Gets firebase credentials
    firebase_admin.get_app()
    db = firestore.client()

    # Updates database entry by changign google_docs_linked_id and linked_google
    ref = db.collection("users").document(user_id).collection("notes").document(document_id)
    ref.update({"google_docs_linked_id": data["session_id"]})
    ref.update({"linked_google": True})

    # Returns object as success
    return ref.get().to_dict(), 200
  
  except Exception as e:

    # In case there is an error this will help with diagnosis
    debug(e)

    # Returns error with status
    return {"error": e}, 500

''' Commits push request '''
@app.route("/setDocText/<type>/<session_id>", methods=['GET'])
def setDocText(type, session_id):

  if type == "notion":
    response = pushData(session_id, request.args.get('text'), NOTION_PRESET["type"])
  elif type == "googledocs":
    response = pushData(session_id, request.args.get('text'), GOOGLE_DOCS_PRESET["type"])

  debug(response)

  return response, 200

''' Gets document text '''
@app.route("/getDocText/<type>/<session_id>", methods=['GET'])
def getDocText(type, session_id):

  if type == "notion":

    # Gets Transfer ID after triggering pull
    transfer_id = pullData(session_id, NOTION_PRESET["type"])["transfer_id"]
    debug(transfer_id)

    # Gets Actual Data
    response = getPullData(transfer_id, NOTION_PRESET["type"])
    debug(response)

  elif type == "googledocs":

    # Gets Transfer ID after triggering pull
    transfer_id = pullData(session_id, GOOGLE_DOCS_PRESET["type"])["transfer_id"]
    debug(transfer_id)

    # Gets Actual Data
    response = getPullData(transfer_id, GOOGLE_DOCS_PRESET["type"])
    debug(response)

  return response, 200

''' Initiates Session and gets Session ID '''
@app.route('/getSessionID/<type>/<user_id>/<document_id>', methods=['GET'])
def getSessionID(type, user_id, document_id):

  if type == "notion":
    chosen_type = NOTION_PRESET
  elif type == "googledocs":
    chosen_type = GOOGLE_DOCS_PRESET
    
  url = "https://endgrate.com/api/session/initiate"

  payload = {
    "configuration_webhook": {
      "endpoint": f"https://itsnous.uc.r.appspot.com/webhook/{user_id}/{document_id}"
    },
    "save_session": True,
    "redirect_url": request.args.get('redirect'),
    "provider": chosen_type["provider"],
    "passthrough_schemas": True,
    "schema": [
      chosen_type["objectSchema"]
    ]
  }

  headers = {
      "accept": "application/json",
      "content-type": "application/json",
      "authorization": f"Bearer {ENDGRATE_API_KEY}"
  }

  response = requests.post(url, json=payload, headers=headers)  

  debug(response.json())

  if response.json()["success"] == True:
    session_id = response.json()["session_id"]
    return {
      "session_id": session_id,
      "auth_url": f"https://endgrate.com/session?session_id={session_id}"
    }, 200

if __name__ == '__main__':
  app.run(debug=True)