import { Router } from 'express';
import { AuthMiddleware } from '../utils/AuthenticationJWT/lib/utils';
import { Validator } from '../utils/validations/validationMW';
import Wrapper from '../wrapper';
import DocumentController from './document.controller';

export const documentRouter = Router();

// get document by documentId

documentRouter.get(
    '/:documentId',
    AuthMiddleware,
    Wrapper.wrapAsync(Validator.canGetDocument),
    Wrapper.wrapAsync(DocumentController.getDocumentById)
);

// download Document by docuemntId
documentRouter.get(
    '/download/:documentId',
    AuthMiddleware,
    Wrapper.wrapAsync(Validator.canGetDocument),
    Wrapper.wrapAsync(DocumentController.downloadDocumentById)
);

// get all Documents of user by username
documentRouter.get(
    '/',
    AuthMiddleware,
    Wrapper.wrapAsync(Validator.canGetAllDocument),
    Wrapper.wrapAsync(DocumentController.getAllDocumentsByUserId)
);

// create Document
// TODO:UserAuth not working with formidable
documentRouter.post(
    '/:userId',
    AuthMiddleware,
    Wrapper.wrapAsync(Validator.canCreateDocument),
    Wrapper.wrapAsync(DocumentController.createDocument)
);

// update Document by documentId
// TODO: cover youself for updating part of the fields - do checks
documentRouter.put(
    '/:documentId',
    AuthMiddleware,
    Wrapper.wrapAsync(Validator.canUpdateDeleteDocument),
    Wrapper.wrapAsync(DocumentController.updateDocumentById)
);

// delete Document by documentId
documentRouter.delete(
    '/:documentId',
    AuthMiddleware,
    Wrapper.wrapAsync(Validator.canUpdateDeleteDocument),
    Wrapper.wrapAsync(DocumentController.deleteDocumentById)
);
