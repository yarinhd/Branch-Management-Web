import { Request, Response } from 'express';
import INote from './note.interface';
import NoteManager from './note.manager';

export default class NoteController {
    static async getNoteById(req: Request, res: Response) {
        // const userAuth: IUser = req.user! as IUser;
        const { noteId } = req.params;
        const noteFound = await NoteManager.getNoteById(noteId);
        res.status(200).json(noteFound);
    }

    static async getAllUserNotes(req: Request, res: Response) {
        const userId = req.query.userId as string;
        const foundNotes: INote[] = await NoteManager.getAllUserNotes(userId);
        res.json(foundNotes);
    }

    static async createNote(req: Request, res: Response) {
        const { userId } = req.params;
        const newNote: Partial<INote> = req.body as Partial<INote>;
        newNote.userId = userId;
        const addedNote = await NoteManager.createNote(newNote);
        res.status(200).json(addedNote);
    }

    static async updateNoteById(req: Request, res: Response) {
        const { noteId } = req.params;
        const noteData = req.body as Partial<INote>;
        const updatedNote = await NoteManager.updateNoteById(noteId, noteData);
        res.status(200).json(updatedNote);
    }

    static async deleteNoteById(req: Request, res: Response) {
        const { noteId } = req.params;
        const deletedNote = await NoteManager.deletedNoteById(noteId);
        res.status(200).json(deletedNote);
    }
}
