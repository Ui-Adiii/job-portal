import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import connectDB from './utils/db.js'
import userRouter from './routes/user.route.js'
import companyRoute from "./routes/company.route.js";
import jobRoute from "./routes/job.route.js";

dotenv.config({});
const app = express();

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  cors({
    origin: "https://localhost:5173",
    credentials: true,
  })
);

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "API Working",
  });
});

const PORT = process.env.PORT || 3000;

//api call
app.use("/api/v1/user", userRouter);
app.use("/api/v1/company", companyRoute);
app.use("/api/v1/job", jobRoute);


app.listen(PORT, () => {
  connectDB();
  console.log(`server started on : ${PORT}`);
})