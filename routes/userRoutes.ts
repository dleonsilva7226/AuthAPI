import express, { NextFunction, Router, Request, Response } from 'express'
import { authenticateToken } from '../middleware/authenticateToken';
import { getNotes, createNote, deleteNote, updateNote } from '../controllers';

export const userRouter: Router = express.Router();

userRouter.use(authenticateToken);

userRouter.route("/notes").get(
    async (req: Request, res: Response, next: NextFunction) => {
        await getNotes(req, res, next);
    }
);

userRouter.route("/notes").post(
    async (req: Request, res: Response, next: NextFunction) => {
        await createNote(req, res, next);
    }
);

userRouter.route("/notes/:id").put(
    async (req: Request, res: Response, next: NextFunction) => {
        await updateNote(req, res, next);
    }
);

userRouter.route("/notes/:id").delete(
    async (req: Request, res: Response, next: NextFunction) => {
        await deleteNote(req, res, next);
    }
);