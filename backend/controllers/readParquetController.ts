import Parquet from 'parquetjs-lite';
import fs from 'fs'

const readParquetFile = async (filePath: string) => {
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
  // return records

  fs.stat('/controllers/stellaralgo_dataset.parquet', (err, stats) => {
    if (err) {
      console.log("error reading from fs", err)
      throw err;
    }

    console.log('stats :>> ', stats);
  })

}

export default readParquetFile