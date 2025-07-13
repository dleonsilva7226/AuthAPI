import { Request, Response, NextFunction } from "express";
import { Note, NotesResponse } from "../interfaces/types";
import { notes } from "../data/notesArray";

export const deleteNote = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const noteId = Number(req.params.id);
        const userId = req.user?.user.id; 
        
        //if id is not there
        if ((!userId ||  typeof userId !== 'number') || (!noteId || typeof noteId !== 'number')) {
            const missingIdErrorResponse: NotesResponse = {
                success: false,
                message: "Missing noteId or userId"
            }
            res.status(404).json(missingIdErrorResponse);
            return;
        }

        //checks if the repo is and if user owns the repo
        const noteToDelete: Note | undefined = notes.find(note => note.userId === userId && note.id === noteId);
        
        if (noteToDelete === null || noteToDelete === undefined){
            const verifyingNoteOwnerIssue: NotesResponse = {
                success: false,
                message: "non-existent note id or user does not own note"
            };

            res.status(404).json(verifyingNoteOwnerIssue);
        }


        //check if deletion occurred
        const deletedNote: Note | undefined = notes.find(note => note.userId === userId && note.id === noteId);

        if (deletedNote !== undefined) {
            const deletionFailed: NotesResponse = {
                success: false,
                message: "Deletion of note failed."
            };

            res.status(404).json(deletionFailed);
            return;
        }

        // If deletion was successful, send a success response
        const successfulNoteDeletion: NotesResponse = {
            success: true,
            message: "Note deleted successfully."
        };

        res.status(200).json(successfulNoteDeletion);


    } catch (error) {
        console.error('Error fetching favorite repositories:', error);
        res.status(500).json({ success: false, message: 'Internal server error.' });
        return;
    }
}