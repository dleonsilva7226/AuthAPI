import express from "express";
import { Application } from "express";
import cors from "cors";
import { authRouter } from "../routes/authRoutes";
import { userRouter } from "../routes/userRoutes";
import dotenv from 'dotenv';
dotenv.config();

const PORT: number = parseInt(process.env.PORT || "8000", 10);
const app: Application = express();

// middleware
app.use(cors());
app.use(express.json());

// auth routes
app.use("/auth", authRouter);

// notes routes
app.use("/user", userRouter);

// listening on port
app.listen(PORT, () => {
    console.log(`Server is listening on http://localhost:${PORT}`);
});