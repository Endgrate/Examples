import requests
from flask import Flask
import requests
from flask_cors import CORS
from API_KEY import getAPIKEY

app = Flask(__name__)
CORS(app)

ALPACA_PAPER_TRADING_KEY = getAPIKEY()[0]
ALPACA_PAPER_TRADING_SECRET = getAPIKEY()[1]

def getNewsWithToken(token, personalized, stock_list):
  
  headers = {
    "Apca-Api-Key-Id": ALPACA_PAPER_TRADING_KEY,
    "Apca-Api-Secret-Key": ALPACA_PAPER_TRADING_SECRET
  }

  options = {
    "exclude_contentless": "true",
    "include_content": "true",
    "page_token": token,
  }

  if personalized == True:
    options["symbols"] = stock_list

  requestLoad = requests.get(f"https://data.alpaca.markets/v1beta1/news", headers=headers, params=options).json()

  return requestLoad["news"], requestLoad["next_page_token"]

def getNews(personalized, stock_list):

  headers = {
    "Apca-Api-Key-Id": ALPACA_PAPER_TRADING_KEY,
    "Apca-Api-Secret-Key": ALPACA_PAPER_TRADING_SECRET
  }

  options = {
    "exclude_contentless": "true",
    "include_content": "true"
  }

  if personalized == True:
    print(stock_list)
    options["symbols"] = stock_list

  requestLoad = requests.get(f"https://data.alpaca.markets/v1beta1/news", headers=headers, params=options).json()

  return requestLoad["news"], requestLoad["next_page_token"]

@app.route('/getNews/<page_id>', methods=['GET'])
def getProcessedNews(page_id):

  initialNews, initialPageToken = getNews(False, [])
  relevant_stocks = []

  for id in range(int(page_id)):
    initialNews, initialPageToken = getNewsWithToken(initialPageToken, False, [])

  for newsObject in initialNews:
    relevant_stocks += newsObject["symbols"]
  
  return {
    "news": initialNews,
    "relevant_stocks": list(set(relevant_stocks))
  }, 200

@app.route('/getPersonalizedNews/<page_id>/<stock_list>', methods=['GET'])
def getProcessedNewsPersonalized(page_id, stock_list):

  stock_list = [r.strip() for r in stock_list.split(",")]
  stock_list_string = ""
  relevant_stocks = []

  for symbol in stock_list:
    stock_list_string += f"{symbol},"

  initialNews, initialPageToken = getNews(True, stock_list_string)

  for id in range(int(page_id)):
    initialNews, initialPageToken = getNewsWithToken(initialPageToken, True, stock_list_string)

  for newsObject in initialNews:
    relevant_stocks += newsObject["symbols"]
  
  return {
    "news": initialNews,
    "relevant_stocks": list(set(relevant_stocks))
  }, 200

if __name__ == '__main__':
  app.run(debug=True)