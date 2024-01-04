// import readParquetFile from "./readParquetController.js";
import db from '../config/duckdb.js';
const filePath = '/Users/iuliiaprokop/Documents/Job Applications/interviews/stellar algo/test_assessment/backend/controllers/stellaralgo_dataset.parquet'

// DESC: QUESTION #1 -  Get total price of tickets bought on a specific day for each of the 2 events
// Route: GET /api/parquet/total/price/:date
const getTotalPricePerEvent = (req, res) => {
  const date = req.params.date
  try {
    db.all(`SELECT SUM(Price) AS TotalPrice FROM "${filePath}" WHERE "Purchase Date" = '${date}'`, function (err, response) {
      if (err) {
        console.log("error from readParquetFile", err)
        throw err;
      }
      console.log('res', response)
      res.status(200).json(response[0])
    })
  } catch (error) {
    console.log('error :>> ', error);
    res.status(500).json({ message: "Failed to read parquet file" })
  }
};

// DESC: QUESTION #2 - The Number of tickets purchased for each ticket type for each of the games respectively
// Route: GET /api/parquet/total/tickets
const getTotalTicketsPerType = (req, res) => {
  try {
    db.all(`SELECT * FROM '${filePath}' ORDER BY Price DESC LIMIT 5`, function (err, response) {
      if (err) {
        console.log("error from readParquetFile", err)
        throw err;
      }
      console.log('res', response)
      res.status(200).json({ parquetContents: response })
    })
  } catch (error) {
    console.log('error :>> ', error);
    res.status(500).json({ message: "Failed to read parquet file" })
  }
};

// DESC: QUESTION #3 - First Name that purchased the highest total $ of tickets
// Route: GET /api/parquet/highestTotalName
const getHighestTotalName = () => { };

// DESC: QUESTION #4 - First Name that purchased the highest number of total tickets
// Route: GET /api/parquet/highestTicketsName
const getHighestTicketsName = () => { };

// DESC: QUESTION #5 - Total purchase price for each ticket type for each game.
// Route: GET /api/parquet/totalPurchase
const getTotalPurchasePerGame = () => { };

export {
  getTotalPricePerEvent,
  getTotalTicketsPerType,
  getHighestTotalName,
  getHighestTicketsName,
  getTotalPurchasePerGame
}