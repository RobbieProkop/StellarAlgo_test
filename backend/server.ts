import express from 'express';
import dotenv from 'dotenv';
import errorHandler from "./middleware/errorMiddleware.js";

const PORT = process.env.PORT || 8080;
dotenv.config();

const app = express();

//Body Parser Middleware
app.use(express.json());


// app.get("/api/heartbeat", async(req,res) => {
//   try {
    
//   } catch (error) {
    
//   }
// })

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))