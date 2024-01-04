import Parquet from 'parquetjs-lite';
import db from '../config/duckdb.js';

const readParquetFile = async (filePath: string) => {
  db.all(`SELECT * FROM ${filePath} LIMIT 5`, function (err, res) {
    if (err) {
      console.log("error from readParquetFile", err)
      throw err;
    }
    console.log('res', res)
    return res
  })
  // // create new ParquetReader that reads from 'fruits.parquet`
  // let reader = await Parquet.ParquetReader.openFile(filePath);

  // // create a new cursor
  // let cursor = reader.getCursor();

  // // read all records from the file and print them
  // const records: any[] = [];
  // let record = null
  // while (record = await cursor.next()) {
  //   records.push(record);
  // }
  // await reader.close();
  // console.log("records", records)
  // return records


}

export default readParquetFile