import formidable from 'formidable';
import { IUser } from '../users/user.interface';
import { DocumentSubject } from './document.enum';

export interface IDocument {
    _id?: string;
    subject: DocumentSubject;
    fileName: string | null;
    userId: string | IUser;
    createdAt?: string;
    updatedAt?: string;
}

export interface IFormidableObj {
    fields: formidable.Fields;
    files: formidable.Files;
}
