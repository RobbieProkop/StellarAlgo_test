from flask import Flask, request, jsonify
import pandas as pd
app = Flask(__name__)


df = pd.read_parquet("./stellaralgo_dataset.parquet")
# print(df)

# Question 1
@app.route('/api/parquet/total/price/<date>', methods=['GET'])

def get_total_per_event(date):
  result = df.query(f"`Purchase Date` == '{date}'").groupby('Event Name')['Price'].sum().reset_index(name='Total')
  return result.to_dict(orient='records')

# Question 2
@app.route('/api/parquet/total/tickets')
def get_total_tickets():
   result = df.groupby(['Event Name', 'Ticket Type']).size().reset_index(name='total')
   return result.to_dict(orient='records')

# Question 3
@app.route('/api/parquet/highest/totalName')
def get_highest_total():
  result = df.groupby('First Name').size().reset_index(name='total')
  result_dict = result.to_dict(orient="records")

  highest = max(result_dict, key=lambda x: x['total']) 
  return highest["First Name"]
# def get_highest_total_name():
# # Question 4
# @app.route('/api/parquet/highest/ticketsName')
# def get_highest_tickets_name():
# # Question 5
# @app.route('/api/parquet/total/purchase')
# def get_total_purchase():

# print(get_total_per_event('02-Apr-23'))
if __name__ == '__main__':
    app.run(debug=True)