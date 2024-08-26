import express from 'express';
import dotenv from 'dotenv';

import authRoutes from './routes/auth.routes.js';
import connectMongoDB from './db/connectMongoDB.js';
import cookieParser from 'cookie-parser';


dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

// app.get('/' , (req , res) => {
//   res.send("Server is ready.")
// })



// console.log(process.env.MONGO_URI);

app.use(express.json());

app.use(express.urlencoded({extended: true})); // for parsing application/x-www-form-urlencoded

app.use(cookieParser());

app.use("/api/auth" , authRoutes);

app.listen(PORT , () => {
  console.log(`server started at port ${PORT}`);
  connectMongoDB();
})