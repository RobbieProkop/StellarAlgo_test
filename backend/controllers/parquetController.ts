// import readParquetFile from "./readParquetController.js";
import db from '../config/duckdb.js';
import { ParquetObj, Q1, Q1Data, Q2, Q3Names, Q4Data, Q5, Q5Data } from '../models/parquetModels.js';

const filePath = '/Users/iuliiaprokop/Documents/Job Applications/interviews/stellar algo/test_assessment/backend/config/stellaralgo_dataset.parquet'
const event1 = "Wolves vs Knights";
const event2 = "Wolves vs SunRays";

const eventNames = ['Wolves vs Knights', 'Wolves vs SunRays'];
const ticketTypes = ['Package', 'Individual', 'Full Season'];

const con = db.connect();

// generic queryDatabase helper function
const queryDatabase = async <T>(query: string): Promise<T[]> => {
  return new Promise((resolve, reject) => {
    con.all(query, function (err, data: T[]) {
      if (err) {
        console.log("Error ==> ", err);
        reject(err)
      } else {
        resolve(data)
      }
    })
  })
}

// DESC: Get all data from the parquet file
// Route: /api/parquet/getAll
const getAll = async (req, res) => {
  try {
    const query = `SELECT * FROM '${filePath}' `
    const response = await queryDatabase<ParquetObj[]>(query)
    if (response) {
      res.status(200).json({ parquetContents: response })
    }
  } catch (error) {
    console.log('error :>> ', error);
    res.status(500).json({ message: "Failed to read parquet file" })
  }
};

// DESC: QUESTION #1 -  Get total price of tickets bought on a specific day for each of the 2 events
// Route: GET /api/parquet/total/price/:date
const getTotalPricePerEvent = async (req, res) => {
  const date = req.params.date
  try {
    const query = `SELECT SUM(Price) AS totalPrice FROM "${filePath}" WHERE "Purchase Date" = '${date}' AND "Event Name" = '${event1}'`;
    const query2 = `SELECT SUM(Price) AS totalPrice FROM "${filePath}" WHERE "Purchase Date" = '${date}' AND "Event Name" = '${event2}'`;

    const sum1 = await queryDatabase<Q1Data>(query)
    const sum2 = await queryDatabase<Q1Data>(query2)

    const result: Q1 = { event1Sum: sum1[0].totalPrice, event2Sum: sum2[0].totalPrice }
    res.status(200).json(result)

  } catch (error) {
    console.log('error :>> ', error);
    res.status(500).json({ message: "Failed to read parquet file", error })
  }

};

// DESC: QUESTION #2 - The Number of tickets purchased for each ticket type for each of the games respectively
// Route: GET /api/parquet/total/tickets
const getTotalTicketsPerType = async (req, res) => {
  try {
    let result = {};
    for (const eventName of eventNames) {
      const eventObj: Q2[] = []
      //assign data to result using an IIFE
      result[eventName] = await (async () => {
        for (const ticketType of ticketTypes) {

          const query = `SELECT * FROM '${filePath}' WHERE "Ticket Type" = '${ticketType}' AND "Event Name" = '${eventName}'`
          const response: ParquetObj[] = await queryDatabase(query)
          eventObj.push({
            'Ticket Type': ticketType,
            'Event Name': eventName,
            total: response.length
          });
        }
        return eventObj;
      })();
    }

    res.status(200).json(result)

  } catch (error) {
    console.log('error :>> ', error);
    res.status(500).json({ message: "Failed to read parquet file", error })
  }
};

// DESC: QUESTION #3 - First Name that purchased the highest total $ of tickets
// Route: GET /api/parquet/highest/totalName
const getHighestTotalName = async (req, res) => {
  try {
    const query = `SELECT "First Name", "Last Name", "Price" FROM "${filePath}"`
    const data: Q3Names[] = await queryDatabase(query)
    const priceMap = new Map<string, number>();

    data.forEach(purchase => {
      const nameKey = `${purchase["First Name"]} ${purchase["Last Name"]}`;
      if (priceMap.has(nameKey)) {
        priceMap.set(nameKey, priceMap.get(nameKey) + purchase["Price"])
      } else {
        priceMap.set(nameKey, purchase["Price"]);
      }
    })

    let highestName = "";
    let highestAmount = 0;

    priceMap.forEach((total, name) => {
      if (total > highestAmount) {
        highestAmount = total;
        highestName = name.split(" ")[0];
      }
    })

    res.status(200).json(highestName)

  } catch (error) {
    console.log('error :>> ', error);
    res.status(500).json({ message: "Failed to get name of highest $ purchase", error })
  }
};

// DESC: QUESTION #4 - First Name that purchased the highest number of total tickets
// Route: GET /api/parquet/highest/ticketsName
// Not sure if this question is looking for the individual who purchased the highest number of tickets and returning the first name, or simply the first name that bought the highest number of tickets (could be multiple Johns for example)

const getHighestTicketsName = async (req, res) => {
  try {
    const query = `SELECT "First Name", "Last Name" FROM "${filePath}"`;
    const data: Q4Data[] = await queryDatabase(query)
    const priceMap = new Map<string, number>();

    data.forEach(purchase => {
      const nameKey = `${purchase["First Name"]} ${purchase["Last Name"]}`;
      if (priceMap.has(nameKey)) {
        priceMap.set(nameKey, priceMap.get(nameKey) + 1)
      } else {
        priceMap.set(nameKey, 1);
      }
    })

    let highestName = "";
    let highestAmount = 0;

    priceMap.forEach((total, name) => {
      if (total > highestAmount) {
        highestAmount = total;
        highestName = name.split(" ")[0];
      }
    })

    res.status(200).json(highestName)

  } catch (error) {
    console.log('error :>> ', error);
    res.status(500).json({ message: "Failed to get name of highest $ purchase", error })
  }
};

// DESC: QUESTION #5 - Total purchase price for each ticket type for each game.
// Route: GET /api/parquet/total/purchase
const getTotalPurchasePerGame = async (req, res) => {
  try {
    let result = {};

    for (const eventName of eventNames) {
      const eventObj: Q5[] = []
      //instead of using an IIFE, as in Q2, we will use a function and call it after
      const resultPurchaseName = async () => {
        for (const ticketType of ticketTypes) {
          const query = `SELECT SUM(Price) AS sum  FROM '${filePath}' WHERE "Ticket Type" = '${ticketType}' AND "Event Name" = '${eventName}'`
          const response = await queryDatabase<Q5Data>(query)

          eventObj.push({
            'Ticket Type': ticketType,
            'Event Name': eventName,
            total: response[0].sum
          });
        }
        return eventObj;
      }
      result[eventName] = await resultPurchaseName()
    }
    res.status(200).json(result)

  } catch (error) {
    console.log('error :>> ', error);
    res.status(500).json({ message: "Failed to read parquet file", error })
  }
};

export {
  getTotalPricePerEvent,
  getTotalTicketsPerType,
  getHighestTotalName,
  getHighestTicketsName,
  getTotalPurchasePerGame,
  getAll
}