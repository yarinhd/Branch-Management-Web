"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const note_manager_1 = __importDefault(require("./note.manager"));
class NoteController {
    static async getNoteById(req, res) {
        // const userAuth: IUser = req.user! as IUser;
        const { noteId } = req.params;
        const noteFound = await note_manager_1.default.getNoteById(noteId);
        res.status(200).json(noteFound);
    }
    static async getAllUserNotes(req, res) {
        const userId = req.query.userId;
        const foundNotes = await note_manager_1.default.getAllUserNotes(userId);
        res.json(foundNotes);
    }
    static async createNote(req, res) {
        const { userId } = req.params;
        const newNote = req.body;
        newNote.userId = userId;
        const addedNote = await note_manager_1.default.createNote(newNote);
        res.status(200).json(addedNote);
    }
    static async updateNoteById(req, res) {
        const { noteId } = req.params;
        const noteData = req.body;
        const updatedNote = await note_manager_1.default.updateNoteById(noteId, noteData);
        res.status(200).json(updatedNote);
    }
    static async deleteNoteById(req, res) {
        const { noteId } = req.params;
        const deletedNote = await note_manager_1.default.deletedNoteById(noteId);
        res.status(200).json(deletedNote);
    }
}
exports.default = NoteController;
