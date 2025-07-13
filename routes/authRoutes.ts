import express, { NextFunction, Router, Request, Response} from "express";
import { registerUser } from "../controllers/registerUser";
import { users } from "../data/usersArray";
import { loginUser } from "../controllers/loginUser";


export const authRouter: Router = express.Router();

authRouter.route("/login").post(
    async (req: Request, res: Response, next: NextFunction) => {
        await loginUser(req, res, next);
    }
);

authRouter.route("/register").post(
    async (req: Request, res: Response, next: NextFunction) => {
        await registerUser(req, res, next);
    } 
);

