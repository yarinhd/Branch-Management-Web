"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = require("express");
const utils_1 = require("../utils/AuthenticationJWT/lib/utils");
const validationMW_1 = require("../utils/validations/validationMW");
const wrapper_1 = __importDefault(require("../wrapper"));
const user_controller_1 = __importDefault(require("./user.controller"));
exports.userRouter = (0, express_1.Router)();
exports.userRouter.post('/createBranch/:branchName', utils_1.AuthMiddleware, wrapper_1.default.wrapAsync(validationMW_1.Validator.canCreateOrUpdateBranch), wrapper_1.default.wrapAsync(user_controller_1.default.createBranch));
exports.userRouter.put('/updateBranch/:branchName', utils_1.AuthMiddleware, wrapper_1.default.wrapAsync(validationMW_1.Validator.canCreateOrUpdateBranch), wrapper_1.default.wrapAsync(user_controller_1.default.updateBranch));
// get user by userId.
exports.userRouter.get('/:userId', utils_1.AuthMiddleware, wrapper_1.default.wrapAsync(user_controller_1.default.getUserByUserId));
// get myself user.
exports.userRouter.get('/me', utils_1.AuthMiddleware, wrapper_1.default.wrapAsync(user_controller_1.default.getMyUser));
// get all users of the same group
exports.userRouter.get('/groupUsers/:groupName', utils_1.AuthMiddleware, wrapper_1.default.wrapAsync(validationMW_1.Validator.canGetGroup), wrapper_1.default.wrapAsync(user_controller_1.default.getGroupUsers));
// update user by username
exports.userRouter.put('/:userId', utils_1.AuthMiddleware, wrapper_1.default.wrapAsync(validationMW_1.Validator.canDeletOrUpdateUser), wrapper_1.default.wrapAsync(user_controller_1.default.updateUserByUserId));
// delete user by username
// TODO: add deletion from group and updating the group + documents and notes when user is deleted!
exports.userRouter.delete('/:userId', utils_1.AuthMiddleware, wrapper_1.default.wrapAsync(validationMW_1.Validator.canDeletOrUpdateUser), wrapper_1.default.wrapAsync(user_controller_1.default.deleteUserByUserId));
