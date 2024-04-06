# Libraries
from flask import Flask, render_template, request, url_for, flash, redirect, send_from_directory, jsonify
import json
import numpy as np
import plotly
import plotly.graph_objects as go
from plotly.subplots import make_subplots
import atexit
import requests
from datetime import datetime
from dotenv import load_dotenv
import os

# Load Environment Variables
load_dotenv()

SECRET_KEY = os.getenv("SECRET_KEY")
ENDGRATE_API_KEY = os.getenv("ENDGRATE_API_KEY")
APPLICATION_URL = os.getenv("APPLICATION_URL")

# Defines Web Application
app = Flask(__name__) # defines web application
app.config['SECRET_KEY'] = SECRET_KEY # creates secret key

# Configuring Payload & Headers
payload = {
    "configuration_webhook": { "endpoint": f"{APPLICATION_URL}callback" },
    "provider": "googleanalytics",
    "schema": [{ "endgrate_type": "analytics-page_analytics" }]
}
headers = {
    "accept": "application/json",
    "content-type": "application/json",
    "authorization": f"Bearer {ENDGRATE_API_KEY}"
}

# Get Session Id With Post Request
response = requests.post("https://endgrate.com/api/pull/initiate", json=payload, headers=headers)
ENDGRATE_SESSION_ID = response.json()["session_id"]
print(f"Endgrate Session ID: {ENDGRATE_SESSION_ID}")

# Defining Auth Variables
AUTHENTICATED = False
LAST_FETCH = None
OLD_DATA = None

# Fetch Endgrate Data
def get_endgrate_data():
    # Global Variables for Recording Data
    global LAST_FETCH
    global OLD_DATA
    if LAST_FETCH != None:
        t = (datetime.now() - LAST_FETCH)
        if t.seconds/60 <= 5:
            return OLD_DATA
    LAST_FETCH = datetime.now()

    # Payload & Headers
    payload = {
        "session_id": ENDGRATE_SESSION_ID,
        "endgrate_type": "analytics-page_analytics",
        "synchronous": True
    }
    headers = {
        "accept": "application/json",
        "content-type": "application/json",
        "authorization": f"Bearer {ENDGRATE_API_KEY}"
    }

    # Transfer Id
    response = requests.post("https://endgrate.com/api/pull/transfer", json=payload, headers=headers)
    transfer_id = response.json()["transfer_id"]

    # Get Data
    url = f"https://endgrate.com/api/pull/data?endgrate_type=analytics-page_analytics&transfer_id={transfer_id}"
    response = requests.get(url, headers={"accept": "application/json","authorization": f"Bearer {ENDGRATE_API_KEY}"})
    data = response.json()

    # Save & Return Data
    OLD_DATA = data
    return data

# Ending Session
def delete_session():
    payload = { "session_id": f"{ENDGRATE_SESSION_ID}" }
    requests.post("https://endgrate.com/api/session/delete", json=payload, headers=headers)

# Authenticating With Endgrate
@app.route('/auth')
def auth():
    global AUTHENTICATED
    AUTHENTICATED = True
    return redirect("https://endgrate.com/session?session_id=" + ENDGRATE_SESSION_ID)

# Home Page
@app.route('/')
def index():
    return render_template('index.html')

# Google Analytics
@app.route('/google_analytics')
def google_analytics():
    if AUTHENTICATED: 
        data=get_endgrate_data()
        for a in range(5):
            if data == "<Response 540 bytes [200 OK]>":
                data=get_endgrate_data()
        datapoints=data["transfer_data"]
        dictionary={}

        for b in range(len(datapoints)):
            items=datapoints[b]["data"]
            keys=list(items.keys())
            for c in range(len(items)):
                if type(items[keys[c]]) == float or type(items[keys[c]]) == int:
                    if b == 0:
                        dictionary[keys[c]]=[items[keys[c]]]
                    else:
                        dictionary[keys[c]].append(items[keys[c]])

        #Grid of Subplots for Information
        fig=make_subplots(rows=(len(dictionary)//2), cols=2)
        for d in range(len(dictionary)):
            fig.add_trace(go.Scatter(y=np.array(dictionary[list(dictionary.keys())[d]]), name=list(dictionary.keys())[d]), row=((d//2)+1), col=((d%2)+1))
        
        # Export Plot as JSON
        graphJSON = json.dumps(fig, cls=plotly.utils.PlotlyJSONEncoder)

        # Return Output Page
        return render_template('google_analytics.html', plot=graphJSON)
    
    return render_template('authentication.html', do_auth=True) #return output page

# Running Main
if __name__ == '__main__':
    app.run(debug=True) # run application

# Delete Session on Exit
atexit.register(delete_session)