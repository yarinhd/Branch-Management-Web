"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isManagerOrUserByUserId = exports.isManagerByGroupName = exports.isManagerByUserId = exports.getGroupManagers = void 0;
const group_manager_1 = __importDefault(require("../../groups/group.manager"));
const user_manager_1 = __importDefault(require("../../users/user.manager"));
const userError_1 = require("../errors/userError");
/**
 * @param {string} groupname http request
 * @return {Promise<string[]>} array with admin users Id
 * the function works recursively and making an array of users admins based on group name hierarchy
 * @example if goupname is team so the array will include [teamManagerId, madorManagerId, branchManagerId]
 */
async function getGroupManagers(groupname) {
    const populatedGroup = await group_manager_1.default.getGroupByName(groupname);
    const admins = [];
    admins.push(String(populatedGroup.manager));
    if (!populatedGroup.parentName) {
        return admins;
    }
    const fatherGroup = await group_manager_1.default.getGroupByName(populatedGroup.parentName);
    if (!fatherGroup) {
        throw new userError_1.GroupNotFoundError('Group not found - failed while creating admins list');
    }
    const superiorAdmin = await getGroupManagers(fatherGroup.name);
    return admins.concat(superiorAdmin);
}
exports.getGroupManagers = getGroupManagers;
/**
 * @param {IUser} loggedUser connected user with valid token (populated token)
 * @param {string | null} userId user Id
 * @return {null} equivalet to true
 * the function check if the logged user is manager in his group hierarchy - if its true will return null
 * group is extract from userId - for getting the users admins at the hierarchy.
 */
async function isManagerByUserId(loggedUser, userId) {
    if (loggedUser.isAdmin) {
        return;
    }
    if (userId) {
        const user = await user_manager_1.default.getUserByUserId(userId);
        const userGroupName = user.inGroup;
        if (!userGroupName) {
            throw new userError_1.UserWithoutGroupError('user dont have group!');
        }
        const groupAdmins = await getGroupManagers(userGroupName);
        if (groupAdmins.includes(String(loggedUser._id))) {
            return;
        }
        throw new userError_1.UnAuthorizedError('User is not authorized!');
    }
    throw new userError_1.MissingParamsError('Missing params - need to send userId');
}
exports.isManagerByUserId = isManagerByUserId;
/**
 * @param {IUser} loggedUser connected user with valid token (populated token)
 * @param {string | null} groupName group name
 * @return {null} equivalet to true
 * the function check if the logged user is manager in his group hierarchy - if its true will return null
 */
async function isManagerByGroupName(loggedUser, groupName) {
    if (loggedUser.isAdmin) {
        return;
    }
    if (groupName) {
        const groupAdmins = await getGroupManagers(groupName);
        if (groupAdmins.includes(String(loggedUser._id))) {
            return;
        }
        throw new userError_1.UnAuthorizedError('User is not authorized!');
    }
    throw new userError_1.MissingParamsError('Missing params - no groupName field');
}
exports.isManagerByGroupName = isManagerByGroupName;
/**
 * @param {IUser} loggedUser connected user with valid token (populated token)
 * @param {string | null} userId user Id
 * @return {null} equivalet to true
 * the function check if the logged user is manager in his group hierarchy or belong to the logged user
 * if its true will return null
 */
async function isManagerOrUserByUserId(loggedUser, userId) {
    let groupAdmins = [];
    if (loggedUser.isAdmin) {
        return;
    }
    if (userId) {
        if (String(userId) === String(loggedUser._id)) {
            return;
        }
        const noteGroupName = (await user_manager_1.default.getUserByUserId(userId)).inGroup;
        if (!noteGroupName) {
            throw new userError_1.UserWithoutGroupError("note creator user don't has group!");
        }
        groupAdmins = await getGroupManagers(noteGroupName);
        if (groupAdmins.includes(String(loggedUser._id))) {
            return;
        }
        throw new userError_1.UnAuthorizedError('User is not authorized!');
    }
    throw new userError_1.MissingParamsError('Missing params - no note userId field');
}
exports.isManagerOrUserByUserId = isManagerOrUserByUserId;
