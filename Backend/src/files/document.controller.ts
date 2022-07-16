import { Request, Response } from 'express';
import formidable from 'formidable';
import { IDocument, IFormidableObj } from './document.interface';
import DocumentManager from './document.manager';

export default class DocumentController {
    static async getDocumentById(req: Request, res: Response) {
        const documentId = req.params.documentId as string;
        const foundDocument: IDocument = await DocumentManager.getDocumentById(documentId);
        res.json(foundDocument);
    }

    static async downloadDocumentById(req: Request, res: Response) {
        const documentId = req.params.documentId as string;
        await DocumentManager.downloadDocumentById(documentId, res);
    }

    static async getAllDocumentsByUserId(req: Request, res: Response) {
        const { userId } = req.query;
        const userDocuments: IDocument[] = await DocumentManager.getAllDocumentsByUserId(userId as string);
        res.json(userDocuments);
    }

    static async createDocument(req: Request, res: Response) {
        const { userId } = req.params;

        const form = formidable({ multiples: false });

        // TODO: ask almog how i add catch to the promise!
        const formfields: IFormidableObj = await new Promise((resolve, reject) => {
            form.parse(req, (err, fields, files) => {
                if (err) {
                    reject(err);
                    return;
                }

                // eslint-disable-next-line no-unreachable
                resolve({ fields, files });
            });
        });
        // TODO: ask almog if that is ok
        if (formfields instanceof Error) {
            throw formfields;
        }

        const addedDocument = await DocumentManager.createDocument(formfields, userId);
        res.json(addedDocument);
    }

    static async updateDocumentById(req: Request, res: Response) {
        const documentId = req.params.documentId as string;
        const documentData = req.body as Partial<IDocument>;
        const updatedDocument = await DocumentManager.updateDocumentById(documentId, documentData);
        res.status(200).json(updatedDocument);
    }

    static async deleteDocumentById(req: Request, res: Response) {
        const documentId = req.params.documentId as string;
        const deletedDocument = await DocumentManager.deletedDocumentById(documentId);
        res.status(200).json(deletedDocument);
    }
}
