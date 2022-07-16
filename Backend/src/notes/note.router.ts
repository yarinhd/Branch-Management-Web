import { Router } from 'express';
import { AuthMiddleware } from '../utils/AuthenticationJWT/lib/utils';
import { Validator } from '../utils/validations/validationMW';
import Wrapper from '../wrapper';
import NoteController from './note.controller';

export const noteRouter = Router();
// get Note by noteId
noteRouter.get(
    '/:noteId',
    AuthMiddleware,
    Wrapper.wrapAsync(Validator.canGetNote),
    Wrapper.wrapAsync(NoteController.getNoteById)
);
// get all Notes of user by username query
noteRouter.get(
    '/',
    AuthMiddleware,
    Wrapper.wrapAsync(Validator.canGetAllNote),
    Wrapper.wrapAsync(NoteController.getAllUserNotes)
);
// @@THINK ABOUT ALL THE CREATE OF EVERY API!
// create Note by request body
noteRouter.post(
    '/:userId',
    AuthMiddleware,
    Wrapper.wrapAsync(Validator.canCreateNote),
    Wrapper.wrapAsync(NoteController.createNote)
);

// update Note by noteId
noteRouter.put(
    '/:noteId',
    AuthMiddleware,
    Wrapper.wrapAsync(Validator.canUpdateDeleteNote),
    Wrapper.wrapAsync(NoteController.updateNoteById)
);

// delete Note by noteId
noteRouter.delete(
    '/:noteId',
    AuthMiddleware,
    Wrapper.wrapAsync(Validator.canUpdateDeleteNote),
    Wrapper.wrapAsync(NoteController.deleteNoteById)
);
