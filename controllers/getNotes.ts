import { Request, Response, NextFunction } from "express";
import { notes } from "../data/notesArray";
import type { Note } from "../interfaces/types";

export const getNotes = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const userId: number | undefined = req.user?.user.id;
        if (!userId) {
            const noUserId = 
            res.status(401).json({ success: false, message: 'Unauthorized: User ID not found.' });
            return;
        }

        const userNotes: Note[] = notes.filter(currNote => currNote.userId === userId);

        if (!userNotes || userNotes.length === 0) {
            res.status(404).json(
                { success: false, message: 'No favorite repositories found.' }
            );
            return;
        }

        res.status(200).json(userNotes);
        return;
    } catch (error) {
        console.error('Error fetching favorite repositories:', error);
        res.status(500).json({ success: false, message: 'Internal server error.' });
        return;
    }
}