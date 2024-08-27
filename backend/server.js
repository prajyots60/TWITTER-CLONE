import express from 'express';
import dotenv from 'dotenv';
import {v2 as cloudinary} from 'cloudinary';

import authRoutes from './routes/auth.routes.js';
import userRoutes from './routes/user.routes.js';
import connectMongoDB from './db/connectMongoDB.js';
import cookieParser from 'cookie-parser';


dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const app = express();
const PORT = process.env.PORT || 8000;

app.use(express.json());

app.use(express.urlencoded({extended: true})); // for parsing application/x-www-form-urlencoded

app.use(cookieParser());

app.use("/api/auth" , authRoutes);
app.use("/api/users" , userRoutes);

app.listen(PORT , () => {
  console.log(`server started at port ${PORT}`);
  connectMongoDB();
})