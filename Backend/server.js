import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import connectDB from './utils/db.js'
import userRouter from './routes/user.route.js'
import companyRoute from "./routes/company.route.js";
import jobRoute from "./routes/job.route.js"
import connectCloudinary from "./utils/cloudinary.js";


connectCloudinary();

dotenv.config({});
const app = express();

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  cors({
  })
);

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "API Working",
  });
});

const PORT = process.env.PORT || 3000;

//api call
app.use("/api/user", userRouter);
app.use("/api/company", companyRoute);
app.use("/api/job", jobRoute);


app.listen(PORT, () => {
  connectDB();
  console.log(`server started on : ${PORT}`);
})