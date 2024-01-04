import readParquetFile from "./readParquetController.js";

// DESC: QUESTION #1 -  Get total price of tickets bought on a specific day for each of the 2 events
// Route: GET /api/parquet/total/price
const getTotalPricePerEvent = async (req, res) => {
  try {
    const contents = await readParquetFile('/Users/iuliiaprokop/Documents/Job Applications/interviews/stellar algo/test_assessment/backend/controllers/stellaralgo_dataset.parquet');
    console.log("contents", contents)
    res.json({ contents: contents })

  } catch (error) {
    console.log('error :>> ', error);
    res.status(500).json({ message: "Failed to read parquet file" })
  }
  // console.log("process ", process.cwd())
  // res.json({ message: process.cwd() })
};

// DESC: QUESTION #2 - The Number of tickets purchased for each ticket type for each of the games respectively
// Route: GET /api/parquet/total/tickets
const getTotalTicketsPerType = () => { };

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