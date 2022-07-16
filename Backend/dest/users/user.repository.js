"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../utils/utils");
const user_model_1 = __importDefault(require("./user.model"));
class UserRepository {
    static updateBranch(branchName) {
        const updatedBranch = (0, utils_1.updateBranch)(branchName);
        return updatedBranch;
    }
    static getAllBranchUsers(branchName) {
        const branchUsers = (0, utils_1.getAllBranchUsers)(branchName);
        return branchUsers;
    }
    static createBranch(branchName) {
        const createdBranch = (0, utils_1.createBranch)(branchName);
        return createdBranch;
    }
    static upsertUserByUsername(username, userData) {
        const upsertedUser = user_model_1.default.findOneAndUpdate({ username }, userData, {
            upsert: true,
            new: true,
        }).exec();
        return upsertedUser;
    }
    static getUserByUserId(userId) {
        const foundUser = user_model_1.default.findOne({ _id: userId }).exec();
        return foundUser;
    }
    static getGroupUsers(inGroup) {
        const groupUsers = user_model_1.default.find({ inGroup }).exec();
        return groupUsers;
    }
    static getManyByUsersId(usersId) {
        const foundUsers = user_model_1.default.find({
            _id: { $in: usersId },
        }).exec();
        return foundUsers;
    }
    static async updateManyByUsersId(usersId, userData) {
        const updatedUsers = await user_model_1.default.updateMany({}, userData).exec();
        console.log(updatedUsers);
        return updatedUsers;
    }
    // static createUser(newUser: IUser): Promise<IUser> {
    //     const addedUser: Promise<IUser> = UserModel.create(newUser);
    //     return addedUser;
    // }
    static updateUserByUserId(userId, userData) {
        const updatedUser = user_model_1.default.findOneAndUpdate({ _id: userId }, userData, {
            new: true,
        }).exec();
        return updatedUser;
    }
    static deletedUserByUserId(userId) {
        const deletedUser = user_model_1.default.findOneAndDelete({ _id: userId }).exec();
        return deletedUser;
    }
    static deleteManyUserByUserIds(userIds) {
        const foundUsers = user_model_1.default.deleteMany({
            _id: { $in: userIds },
        }).exec();
        return foundUsers;
    }
}
exports.default = UserRepository;
