from flask import Flask
app = Flask(__name__)

@app.route('/api/parquet/getAll', methods=['GET'])

def get_all_data():
  return {"message": "Hello World!"}

if __name__=='__main__':
  app.run(debug=True)