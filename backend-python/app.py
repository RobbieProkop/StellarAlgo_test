from flask import Flask, request, jsonify
import pandas as pd
app = Flask(__name__)


df = pd.read_parquet("./stellaralgo_dataset.parquet")
# print(df)

# DESC: QUESTION #1 -  Get total price of tickets bought on a specific day for each of the 2 events
@app.route('/api/parquet/total/price/<date>', methods=['GET'])

def get_total_per_event(date):
  result = df.query(f"`Purchase Date` == '{date}'").groupby('Event Name')['Price'].sum().reset_index(name='total')
  return result.to_dict(orient='records')

# DESC: QUESTION #2 - The Number of tickets purchased for each ticket type for each of the games respectively
@app.route('/api/parquet/total/tickets')
def get_total_tickets():
   result = df.groupby(['Event Name', 'Ticket Type']).size().reset_index(name='total')
   return result.to_dict(orient='records')

# DESC: QUESTION #3 - First Name that purchased the highest total $ of tickets
@app.route('/api/parquet/highest/totalName')
def get_highest_total():
  result = df.groupby('First Name')['Price'].sum().reset_index(name='total')
  result_dict = result.to_dict(orient="records")

  highest = max(result_dict, key=lambda x: x['total']) 
  return highest['First Name']

# DESC: QUESTION #4 - First Name that purchased the highest number of total tickets
@app.route('/api/parquet/highest/ticketsName')
def get_highest_tickets_name():
  result = df.groupby('First Name').size().reset_index(name='total')
  result_dict = result.to_dict(orient="records")

  highest = max(result_dict, key=lambda x: x['total']) 
  return highest['First Name']

# DESC: QUESTION #5 - Total purchase price for each ticket type for each game.
@app.route('/api/parquet/total/purchase')
def get_total_purchase():
   result = df.groupby(['Event Name', 'Ticket Type'])['Price'].sum().reset_index(name='total')

   return result.to_dict(orient='records')

# print(get_total_per_event('02-Apr-23'))
if __name__ == '__main__':
    app.run(debug=True)