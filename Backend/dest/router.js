"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.appRouter = void 0;
const express_1 = require("express");
const document_router_1 = require("./files/document.router");
const group_router_1 = require("./groups/group.router");
const note_router_1 = require("./notes/note.router");
const user_router_1 = require("./users/user.router");
const authentication_router_1 = require("./utils/AuthenticationJWT/authentication.router");
exports.appRouter = (0, express_1.Router)();
exports.appRouter.use('/api/auth', authentication_router_1.authRouter);
exports.appRouter.use('/api/user', user_router_1.userRouter);
exports.appRouter.use('/api/group', group_router_1.groupRouter);
exports.appRouter.use('/api/note', note_router_1.noteRouter);
exports.appRouter.use('/api/document', document_router_1.documentRouter);
