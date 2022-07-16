import { IDocument } from './document.interface';
import DocumentModel from './document.model';

export default class DocumentRepository {
    static getDocumentById(documentId: string): Promise<IDocument | null> {
        const foundDocument: Promise<IDocument | null> = DocumentModel.findById(documentId).exec();
        return foundDocument;
    }

    static getAllDocumentsByUserId(userId: string) {
        const userDoucments: Promise<IDocument[] | null> = DocumentModel.find({ userId }).exec();
        return userDoucments;
    }

    static createDocument(newDocument: IDocument): Promise<IDocument | null> {
        const addedDocument: Promise<IDocument | null> = DocumentModel.create(newDocument);
        return addedDocument;
    }

    static updateDocumentById(documentId: string, documentData: Partial<IDocument>): Promise<IDocument | null> {
        console.log(2, documentData);

        const updatedDocument: Promise<IDocument | null> = DocumentModel.findByIdAndUpdate(documentId, documentData, {
            new: true,
        }).exec();
        return updatedDocument;
    }

    static deletedDocumentById(documentId: string): Promise<IDocument | null> {
        const deletedDocument: Promise<IDocument | null> = DocumentModel.findByIdAndDelete(documentId).exec();
        return deletedDocument;
    }
}
