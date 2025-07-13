import express from "express";
import { Application } from "express";
import cors from "cors";
import { authRouter } from "../routes/authRoutes";
import { users } from "../data/usersArray";
import dotenv from 'dotenv';
dotenv.config();
// import { notesRouter } from "../routes/notesRoutes";


const PORT: number = parseInt(process.env.PORT || "8000", 10);
const app: Application = express();

// middleware
app.use(cors());
app.use(express.json());

// auth routes
app.use("/auth", authRouter);

// notes routes
// app.use("/notes", notesRouter);

// listening on port
app.listen(PORT, () => {
    console.log(`Server is listening on http://localhost:${PORT}`);
});