from flask import Flask
from flask_cors import CORS

import pandas as pd
app = Flask(__name__)

cors = CORS(app, resources={r"/api/*": {"origins": "http://localhost:4321"}})

df = pd.read_parquet("./stellaralgo_dataset.parquet")

@app.route('/api/heartbeat', methods=['GET'])
def heartbeat():
   return {"message": "Server is live"}


# DESC: QUESTION #1 -  Get total price of tickets bought on a specific day for each of the 2 events
# Time Complexity: Potentially O(n)
@app.route('/api/parquet/total/price/<date>', methods=['GET'])

def get_total_per_event(date):
  result = df.query(f"`Purchase Date` == '{date}'").groupby('Event Name')['Price'].sum().reset_index(name='total')
  return result.to_dict(orient='records')

# DESC: QUESTION #2 - The Number of tickets purchased for each ticket type for each of the games respectively
# Time complexity: Potentially O(n)
@app.route('/api/parquet/total/tickets')
def get_total_tickets():
   result = df.groupby(['Event Name', 'Ticket Type']).size().reset_index(name='total')
   return result.to_dict(orient='records')

# DESC: QUESTION #3 - First Name that purchased the highest total $ of tickets
# Time Complexity: Potentially O(n)
@app.route('/api/parquet/highest/totalName')
def get_highest_total():
  result = df.groupby('First Name')['Price'].sum().idxmax()
  return result

# DESC: QUESTION #4 - First Name that purchased the highest number of total tickets
# Time Complexity: Potentially O(n)
@app.route('/api/parquet/highest/ticketsName')
def get_highest_tickets_name():
  result = df['First Name'].value_counts().idxmax()
  return result

# DESC: QUESTION #5 - Total purchase price for each ticket type for each game.
# Time Complexity: Potentially O(n)
@app.route('/api/parquet/total/purchase')
def get_total_purchase():
   result = df.groupby(['Event Name', 'Ticket Type'])['Price'].sum().reset_index(name='total')

   return result.to_dict(orient='records')

if __name__ == '__main__':
    app.run(debug=True)