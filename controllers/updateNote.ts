import { Request, Response, NextFunction } from "express";
import { Note, NotesResponse } from "../interfaces/types";
import { notes } from "../data/notesArray";

export const updateNote = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const body = req.body;
        const noteId = Number(req.params.id);
        const { title, content } = body;
        const userId: number | undefined = req.user?.user.id;

        //if id is not there
        if ((!userId ||  typeof userId !== 'number') || (!title || typeof title !== 'string') || (!content || typeof content !== 'string') ||  (!noteId || typeof noteId !== 'number')) {
            const missingIdErrorResponse: NotesResponse = {
                success: false,
                message: "Missing noteId or userId"
            }
            res.status(404).json(missingIdErrorResponse);
            return;
        }

        const noteToUpdate: Note | undefined = notes.find(note => note.userId === userId && note.id === noteId);

        if (noteToUpdate === null || noteToUpdate === undefined){
            const verifyingNoteOwnerIssue: NotesResponse = {
                success: false,
                message: "non-existent note or user does not own note"
            };
            res.status(404).json(verifyingNoteOwnerIssue);
            return;
        }
        
        // Updating below
        const noteToUpdateIdx: number = notes.findIndex(note => note.userId === userId && note.id === noteId);
        if (noteToUpdateIdx === -1) {
            const unsuccessfulNoteUpdate: NotesResponse = {
                success: false,
                message: "Cannot find note."        
            };
            return;
        }

        notes[noteToUpdateIdx].title = title;
        notes[noteToUpdateIdx].content = content;
        notes[noteToUpdateIdx].updatedAt = new Date().toISOString();

        // Send a success response
        const successfulNoteUpdate: NotesResponse = {
            success: true,
            message: "Note updated successfully."
        };

        res.status(200).json(successfulNoteUpdate);
        return;



    } catch (error) {
        console.error('Error fetching favorite repositories:', error);
        res.status(500).json({ success: false, message: 'Internal server error.' });
        return;
    }
}