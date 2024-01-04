import express from 'express';
import dotenv from 'dotenv';
import errorHandler from "./middleware/errorMiddleware.js";

const PORT = process.env.PORT || 8080;
dotenv.config();

const app = express();

//Body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));


app.get("/api/heartbeat", async(req,res) => {
  try {
    res.json({message: "Server Heartbeat"})
  } catch (error) {
    console.log('error from server :>> ', error);
    res.status(500).json({error: "Something went wrong with the heartbeat"})
  }
})

app.use(errorHandler);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))