import INote from './note.interface';
import NoteModel from './note.model';

export default class NoteRepository {
    static getAllUserNotes(username: string): Promise<INote[] | null> {
        const foundNotes: Promise<INote[] | null> = NoteModel.find({ userId: username }).exec();
        return foundNotes;
    }

    static createNote(newNote: Partial<INote>): Promise<INote | null> {
        const addedNote: Promise<INote | null> = NoteModel.create(newNote);
        return addedNote;
    }

    static getNoteById(noteId: string): Promise<INote | null> {
        const foundNote: Promise<INote | null> = NoteModel.findById(noteId).exec();
        return foundNote;
    }

    static updateNoteById(noteId: string, noteData: Partial<INote>): Promise<INote | null> {
        const updatedNote: Promise<INote | null> = NoteModel.findByIdAndUpdate(noteId, noteData, { new: true }).exec();
        return updatedNote;
    }

    static deletedNoteById(noteId: string): Promise<INote | null> {
        const deletedNote: Promise<INote | null> = NoteModel.findByIdAndDelete(noteId).exec();
        return deletedNote;
    }
}
