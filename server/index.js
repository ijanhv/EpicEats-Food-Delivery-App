import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import bodyParser from "body-parser";
import UserRoute from './routes/User.js'
import MenuRoute from './routes/MenuItem.js'
import OrderRoute from './routes/Order.js'


const app = express();
dotenv.config();
mongoose.set("strictQuery", true);



const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.log("Error connecting to database", error);
  }
};

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.json());
app.use(cookieParser());

app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong";

  return res.status(errorStatus).send(errorMessage);
});



app.listen(8800, () => {
  connect();
  console.log("Server is running on port 8800");
});


app.use('/api/user', UserRoute)
app.use('/api/menu', MenuRoute)
app.use('/api/order', OrderRoute)

