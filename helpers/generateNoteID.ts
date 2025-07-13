import type { Note } from "../interfaces/types";

const generateNoteId = (notes: Note[]) => {
  return notes.length + 1;
}

export default generateNoteId;