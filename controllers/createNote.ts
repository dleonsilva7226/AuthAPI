import { Request, Response, NextFunction } from "express";
import { Note } from "../interfaces/types";
import generateNoteId from "../helpers/generateNoteID";
import { notes } from "../data/notesArray";

export const createNote = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const body = req.body;
        const { title, content } = body;
        const userId: number | undefined = req.user?.user.id;

        // Validate input
        if (!title || typeof title !== 'string' || !content || typeof content !== 'string' || !userId) {
            res.status(400).json({
                success: false,
                message: "Missing required fields"
            });
            return;
        }

        const now: string = new Date().toISOString();

        const newNote: Note = {
            id: generateNoteId(notes),
            title: title,
            content: content,
            userId: userId,
            createdAt: now,
            updatedAt: now
        }

        // add to notes array
        notes.push(newNote);

        // If creation was successful, send a success response
        res.status(200).json({
            success: true,
            message: "New note created successfully",
        });
        return;
    } catch (error) {
        console.error('Error', error);
        res.status(500).json({ success: false, message: 'Internal server error.' });
        return;
    }
}