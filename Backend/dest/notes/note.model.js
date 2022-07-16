"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const NoteSchema = new mongoose_1.default.Schema({
    subject: {
        type: String,
        required: true,
        default: 'Subject not entered',
    },
    text: {
        type: String,
        required: true,
        default: 'Text not entered',
    },
    userId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        index: true,
    },
}, {
    timestamps: true,
});
const NoteModel = mongoose_1.default.model('Note', NoteSchema);
exports.default = NoteModel;
