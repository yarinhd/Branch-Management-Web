import { DeleteResult } from 'mongodb';
import { config } from '../config';
import GroupManager from '../groups/group.manager';
import { BranchCreationError, BranchUpdateError, UserNotFoundError } from '../utils/errors/userError';
import { IUser } from './user.interface';
import UserRepository from './user.repository';
import { IPeopleUser } from '../utils/people-api-mock/people_user.interface';

export default class UserManager {
    static async updateBranch(branchName: string) {
        const updatedBranch = await UserRepository.updateBranch(branchName);
        if (!updatedBranch) {
            throw new BranchUpdateError('Faild to update Branch');
        }
        return updatedBranch;
    }

    static async createBranch(branchName: string) {
        const createdBranch = await UserRepository.createBranch(branchName);
        if (!createdBranch) {
            throw new BranchCreationError('Failed to create branch');
        }
        console.log(2, createdBranch);

        return createdBranch;
    }

    /**
     * @param {string} userId user Id as Pk
     * @return {IUser} created User doc
     */
    static async getUserByUserId(userId: string) {
        const foundUser = await UserRepository.getUserByUserId(userId);
        if (!foundUser) {
            throw new UserNotFoundError('User not found');
        }
        return foundUser;
    }

    static async getAllBranchUsers(branchName: string) {
        const branchUsers = await UserRepository.getAllBranchUsers(branchName);
        if (!branchUsers) {
            throw new UserNotFoundError('User not found');
        }
        return branchUsers;
    }

    /**
     * @param {string} groupName group name as PK
     * @return {IUser} group users by goup name docs
     */
    static async getGroupUsers(groupName: string) {
        await GroupManager.getGroupByName(groupName);
        const groupUsers: IUser[] | null = await UserRepository.getGroupUsers(groupName);
        if (!groupUsers) {
            throw new UserNotFoundError('User Not Found');
        }
        return groupUsers;
    }

    /**
     * @param {string[]} usersId users Id array as PK
     * @return {IUser} array of users populated from array of users Ids
     */
    static async getManyByUsersId(usersId: string[]) {
        const foundUsers = await UserRepository.getManyByUsersId(usersId);
        if (!foundUsers) {
            throw new UserNotFoundError('User not found - failed while searching users');
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
    static async updateManyByUsersId(usersId: string[], userData: Partial<IUser>) {
        const updatedUsers = await UserRepository.updateManyByUsersId(usersId, userData);
        if (!updatedUsers) {
            throw new UserNotFoundError('User not found - failed while updating file');
        }
        return updatedUsers;
    }

    /**
     * @param {IPeopleUser} user user details from people-Api
     * @return {IUser} upserted user with all details (*including* inGroup) based on user param
     * @example: if user already created user will be updated with the new fields content.
     */
    static async upsertUserPersonalAndGroupInfo(user: IPeopleUser, groupName: string) {
        console.log(user);

        const { username, fullName, rank, job, serviceEndDate, gender, dateOfBirth } = user;
        const newUser: IUser = {
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
        const addedUser = await UserRepository.upsertUserByUsername(newUser.username, newUser);
        if (!addedUser) {
            throw new UserNotFoundError("User failed to upsert - could'nt upsert the user");
        }
        return addedUser;
    }

    /**
     * @param {string} userName user Id as PK
     * @return {IUser} upserted user with all details (*excluding* inGroup and is Admin) based on user param
     * @example: if user already created user will be updated with the new fields content.
     */
    static async upsertUserPersonalInfo(userName: string, user: IPeopleUser) {
        if (!user) {
            throw new UserNotFoundError('User not found in People-API');
        }
        const newUser: Partial<IUser> = {
            ...user,
        };
        const upsertedUser = await UserRepository.upsertUserByUsername(userName, newUser);
        if (!upsertedUser) {
            throw new UserNotFoundError("User failed to upsert - could'nt upsert the user");
        }
        console.log(upsertedUser);

        return upsertedUser;
    }

    /**
     * @param {string} userId user Id as PK
     * @param {Partial <IUser>} userData user data content for update
     * @return {IUser} updated user with the userData fields content
     */
    static async updateUserByUserId(userId: string, userData: Partial<IUser>) {
        const updatedUser = await UserRepository.updateUserByUserId(userId, userData);
        if (!updatedUser) {
            throw new UserNotFoundError("User failed to update - could'nt update the user");
        }
        return updatedUser;
    }

    /**
     * @param {string} userId user Id as PK
     * @return {IUser} deleted user
     */
    static async deletedUserByUserId(userId: string) {
        const userGroup: string | null = ((await UserManager.getUserByUserId(userId)) as IUser).inGroup;
        if (userGroup) {
            await GroupManager.updateGroupByName(userGroup, { usersId: [userId] }, config.action.Del);
        }
        const deletedUser = await UserRepository.deletedUserByUserId(userId);
        if (!deletedUser) {
            throw new UserNotFoundError("User not found - can't delete user");
        }
        return deletedUser;
    }

    static async deleteManyUserByUserIds(userIds: string[]) {
        const deletedUsers: DeleteResult | null = await UserRepository.deleteManyUserByUserIds(userIds);
        if (!deletedUsers) {
            throw new UserNotFoundError("User not found - can't delete user");
        }
        console.log('deleted users:', deletedUsers);

        return deletedUsers;
    }
}
