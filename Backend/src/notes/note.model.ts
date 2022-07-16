import mongoose from 'mongoose';
import INote from './note.interface';

const NoteSchema = new mongoose.Schema(
    {
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
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
            index: true,
        },
    },
    {
        timestamps: true,
    }
);

const NoteModel = mongoose.model<INote & mongoose.Document>('Note', NoteSchema);
export default NoteModel;
