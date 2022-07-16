"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("../config");
const group_manager_1 = __importDefault(require("../groups/group.manager"));
const userError_1 = require("../utils/errors/userError");
const user_repository_1 = __importDefault(require("./user.repository"));
class UserManager {
    static async updateBranch(branchName) {
        const updatedBranch = await user_repository_1.default.updateBranch(branchName);
        if (!updatedBranch) {
            throw new userError_1.BranchUpdateError('Faild to update Branch');
        }
        return updatedBranch;
    }
    static async createBranch(branchName) {
        const createdBranch = await user_repository_1.default.createBranch(branchName);
        if (!createdBranch) {
            throw new userError_1.BranchCreationError('Failed to create branch');
        }
        console.log(2, createdBranch);
        return createdBranch;
    }
    /**
     * @param {string} userId user Id as Pk
     * @return {IUser} created User doc
     */
    static async getUserByUserId(userId) {
        const foundUser = await user_repository_1.default.getUserByUserId(userId);
        if (!foundUser) {
            throw new userError_1.UserNotFoundError('User not found');
        }
        return foundUser;
    }
    static async getAllBranchUsers(branchName) {
        const branchUsers = await user_repository_1.default.getAllBranchUsers(branchName);
        if (!branchUsers) {
            throw new userError_1.UserNotFoundError('User not found');
        }
        return branchUsers;
    }
    /**
     * @param {string} groupName group name as PK
     * @return {IUser} group users by goup name docs
     */
    static async getGroupUsers(groupName) {
        await group_manager_1.default.getGroupByName(groupName);
        const groupUsers = await user_repository_1.default.getGroupUsers(groupName);
        if (!groupUsers) {
            throw new userError_1.UserNotFoundError('User Not Found');
        }
        return groupUsers;
    }
    /**
     * @param {string[]} usersId users Id array as PK
     * @return {IUser} array of users populated from array of users Ids
     */
    static async getManyByUsersId(usersId) {
        const foundUsers = await user_repository_1.default.getManyByUsersId(usersId);
        if (!foundUsers) {
            throw new userError_1.UserNotFoundError('User not found - failed while searching users');
        }
        return foundUsers;
    }
    // updating array of users in the same fields
    // for example updating all group users inGroup field
    /**
     * @param {string[]} usersId users Id array as PK
     * @return {IUser} updated users with the same field/s content
     * @example: updating all group users with inGroup field
     */
    static async updateManyByUsersId(usersId, userData) {
        const updatedUsers = await user_repository_1.default.updateManyByUsersId(usersId, userData);
        if (!updatedUsers) {
            throw new userError_1.UserNotFoundError('User not found - failed while updating file');
        }
        return updatedUsers;
    }
    /**
     * @param {IPeopleUser} user user details from people-Api
     * @return {IUser} upserted user with all details (*including* inGroup) based on user param
     * @example: if user already created user will be updated with the new fields content.
     */
    static async upsertUserPersonalAndGroupInfo(user, groupName) {
        console.log(user);
        const { username, fullName, rank, job, serviceEndDate, gender, dateOfBirth } = user;
        const newUser = {
            username,
            fullName,
            rank,
            job,
            gender,
            dateOfBirth,
            serviceEndDate,
            inGroup: groupName,
            isAdmin: false,
        };
        const addedUser = await user_repository_1.default.upsertUserByUsername(newUser.username, newUser);
        if (!addedUser) {
            throw new userError_1.UserNotFoundError("User failed to upsert - could'nt upsert the user");
        }
        return addedUser;
    }
    /**
     * @param {string} userName user Id as PK
     * @return {IUser} upserted user with all details (*excluding* inGroup and is Admin) based on user param
     * @example: if user already created user will be updated with the new fields content.
     */
    static async upsertUserPersonalInfo(userName, user) {
        if (!user) {
            throw new userError_1.UserNotFoundError('User not found in People-API');
        }
        const newUser = {
            ...user,
        };
        const upsertedUser = await user_repository_1.default.upsertUserByUsername(userName, newUser);
        if (!upsertedUser) {
            throw new userError_1.UserNotFoundError("User failed to upsert - could'nt upsert the user");
        }
        return upsertedUser;
    }
    /**
     * @param {string} userId user Id as PK
     * @param {Partial <IUser>} userData user data content for update
     * @return {IUser} updated user with the userData fields content
     */
    static async updateUserByUserId(userId, userData) {
        const updatedUser = await user_repository_1.default.updateUserByUserId(userId, userData);
        if (!updatedUser) {
            throw new userError_1.UserNotFoundError("User failed to update - could'nt update the user");
        }
        return updatedUser;
    }
    /**
     * @param {string} userId user Id as PK
     * @return {IUser} deleted user
     */
    static async deletedUserByUserId(userId) {
        const userGroup = (await UserManager.getUserByUserId(userId)).inGroup;
        if (userGroup) {
            await group_manager_1.default.updateGroupByName(userGroup, { usersId: [userId] }, config_1.config.action.Del);
        }
        const deletedUser = await user_repository_1.default.deletedUserByUserId(userId);
        if (!deletedUser) {
            throw new userError_1.UserNotFoundError("User not found - can't delete user");
        }
        return deletedUser;
    }
    static async deleteManyUserByUserIds(userIds) {
        const deletedUsers = await user_repository_1.default.deleteManyUserByUserIds(userIds);
        if (!deletedUsers) {
            throw new userError_1.UserNotFoundError("User not found - can't delete user");
        }
        console.log('deleted users:', deletedUsers);
        return deletedUsers;
    }
}
exports.default = UserManager;
