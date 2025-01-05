import express from "express";
import cors from "cors";
import 'dotenv/config';
import cookieParser from "cookie-parser";

import connectDB from './config/mongodb.js';
import authRouter from "./routes/authRoutes.js";
import userRouter from "./routes/userRoutes.js";

const app = express();
const port = process.env.PORT || 4000

const host = 'https://sing-l8mg.onrender.com/'
connectDB();

const allowedOrigins = ['https://client-ad7d.onrender.com/']




app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: allowedOrigins, credentials: true}))


//API Endpoints
app.get('/', (req,res)=>res.send("API Working"));
app.use('/api/auth', authRouter)
app.use('/api/user', userRouter)



app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  // Optionally redirect to the host URL
  app.get('/', (req, res) => {
    res.redirect(host);
  });
});

