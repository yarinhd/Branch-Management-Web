"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const note_model_1 = __importDefault(require("./note.model"));
class NoteRepository {
    static getAllUserNotes(username) {
        const foundNotes = note_model_1.default.find({ userId: username }).exec();
        return foundNotes;
    }
    static createNote(newNote) {
        const addedNote = note_model_1.default.create(newNote);
        return addedNote;
    }
    static getNoteById(noteId) {
        const foundNote = note_model_1.default.findById(noteId).exec();
        return foundNote;
    }
    static updateNoteById(noteId, noteData) {
        const updatedNote = note_model_1.default.findByIdAndUpdate(noteId, noteData, { new: true }).exec();
        return updatedNote;
    }
    static deletedNoteById(noteId) {
        const deletedNote = note_model_1.default.findByIdAndDelete(noteId).exec();
        return deletedNote;
    }
}
exports.default = NoteRepository;
