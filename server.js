import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./config/mongodb.js";
import connectCloudinary from "./config/cloudinary.js";
import adminRouter from "./routes/adminRoute.js";
import doctorRouter from "./routes/doctorRoute.js";
import userRouter from "./routes/userRouter.js";

const app = express();
connectDB();
connectCloudinary();

// Allow multiple origins safely
const allowedOrigins = [
  "https://vercel-adminpanel.vercel.app",
  "https://vercel-frontend-coral-two.vercel.app"
];

app.use(
  cors({
    origin: allowedOrigins, // simply pass an array
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "atoken"],
    credentials: true
  })
);

// Handle OPTIONS preflight
app.options("*", cors());

app.use(express.json());

app.use("/api/admin", adminRouter);
app.use("/api/doctor", doctorRouter);
app.use("/api/user", userRouter);

app.get("/", (req, res) => {
  res.status(200).send("API Working");
});

export default app; // REQUIRED ON VERCEL
