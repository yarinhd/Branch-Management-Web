"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const document_model_1 = __importDefault(require("./document.model"));
class DocumentRepository {
    static getDocumentById(documentId) {
        const foundDocument = document_model_1.default.findById(documentId).exec();
        return foundDocument;
    }
    static getAllDocumentsByUserId(userId) {
        const userDoucments = document_model_1.default.find({ userId }).exec();
        return userDoucments;
    }
    static createDocument(newDocument) {
        const addedDocument = document_model_1.default.create(newDocument);
        return addedDocument;
    }
    static updateDocumentById(documentId, documentData) {
        console.log(2, documentData);
        const updatedDocument = document_model_1.default.findByIdAndUpdate(documentId, documentData, {
            new: true,
        }).exec();
        return updatedDocument;
    }
    static deletedDocumentById(documentId) {
        const deletedDocument = document_model_1.default.findByIdAndDelete(documentId).exec();
        return deletedDocument;
    }
}
exports.default = DocumentRepository;
