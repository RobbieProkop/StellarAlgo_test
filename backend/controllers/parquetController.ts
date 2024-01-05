// import readParquetFile from "./readParquetController.js";
import db from '../config/duckdb.js';
import { ParquetObj, Q1, Q2, Q3Names, Q5, Q5Data } from '../models/parquetModels.js';

const filePath = '/Users/iuliiaprokop/Documents/Job Applications/interviews/stellar algo/test_assessment/backend/controllers/stellaralgo_dataset.parquet'
const event1 = "Wolves vs Knights";
const event2 = "Wolves vs SunRays";

const eventNames = ['Wolves vs Knights', 'Wolves vs SunRays']

const con = db.connect();

const getAll = (req, res) => {
  try {
    con.all(`SELECT * FROM '${filePath}' WHERE "Last Name" = 'Mccarthy'`, function (err, response) {
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

// DESC: QUESTION #1 -  Get total price of tickets bought on a specific day for each of the 2 events
// Route: GET /api/parquet/total/price/:date
const getTotalPricePerEvent = async (req, res) => {
  const date = req.params.date
  try {
    const sum1: number = await new Promise((resolve, reject) => {
      con.all(`SELECT SUM(Price) AS totalPrice1 FROM "${filePath}" WHERE "Purchase Date" = '${date}' AND "Event Name" = '${event1}';`, function (err, res) {
        if (err) {
          console.log("error from readParquetFile", err)
          reject(err);
        }
        resolve(res[0].totalPrice1)
      })
    })

    const sum2: number = await new Promise((resolve, reject) => {
      con.all(`SELECT SUM(Price) AS totalPrice2 FROM "${filePath}" WHERE "Purchase Date" = '${date}' AND "Event Name" = '${event2}';`, function (err, res) {
        if (err) {
          console.log("error from readParquetFile", err)
          reject(err);
        }
        resolve(res[0].totalPrice2)
      })
    })
    const result: Q1 = { event1Sum: sum1, event2Sum: sum2 }

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

    const ticketTypes = ['Package', 'Individual', 'Full Season'];
    for (const eventName of eventNames) {
      const eventObj: Q2[] = []
      result[eventName] = await (async () => {
        for (const ticketType of ticketTypes) {
          const response: ParquetObj[] = await new Promise((resolve, reject) => {
            con.all(`SELECT * FROM '${filePath}' WHERE "Ticket Type" = '${ticketType}' AND "Event Name" = '${eventName}'`, function (err, data: ParquetObj[]) {
              if (err) {
                console.log("error from Q2", err)
                reject(err)
              }
              resolve(data)
            })
          })
          eventObj.push({
            type: ticketType,
            event: eventName,
            totalNumTickets: response.length
          });
        }
        return eventObj;
      })();
    }

    console.log('result :>> ', result);
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
    const data: Q3Names[] = await new Promise((resolve, reject) => {
      con.all(`SELECT "First Name", "Last Name", "Price" FROM "${filePath}"`, function (err, data: Q3Names[]) {
        if (err) {
          console.log("error from highest total name", err);
          reject(err);
        }
        resolve(data)
      })
    })

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

    console.log('highestName, highestAmount :>> ', highestName, highestAmount);

    res.status(200).json(highestName)

  } catch (error) {
    console.log('error :>> ', error);
    res.status(500).json({ message: "Failed to get name of highest $ purchase", error })
  }
};

// DESC: QUESTION #4 - First Name that purchased the highest number of total tickets
// Route: GET /api/parquet/highest/ticketsName
const getHighestTicketsName = async (req, res) => {

};

// DESC: QUESTION #5 - Total purchase price for each ticket type for each game.
// Route: GET /api/parquet/total/purchase
const getTotalPurchasePerGame = async (req, res) => {
  try {
    let result = {};

    const ticketTypes = ['Package', 'Individual', 'Full Season'];
    for (const eventName of eventNames) {
      const eventObj: Q5[] = []
      result[eventName] = await (async () => {
        for (const ticketType of ticketTypes) {
          const response = await new Promise<Q5Data>((resolve, reject) => {
            con.all(`SELECT SUM(Price) AS sum  FROM '${filePath}' WHERE "Ticket Type" = '${ticketType}' AND "Event Name" = '${eventName}'`, function (err, data) {
              if (err) {
                console.log("error from Q2", err)
                reject(err)
              }
              resolve(data[0].sum)

            })
          })
          eventObj.push({
            type: ticketType,
            event: eventName,
            totalPurchasePrice: response
          });
        }
        return eventObj;
      })();
    }

    console.log('result :>> ', result);
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