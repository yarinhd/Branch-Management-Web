"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isGroupExist = exports.isUserExist = exports.getAllBranchHierarchyNames = exports.getAllBranchUsers = exports.recursiveGroupDelete = exports.updateBranch = exports.createBranch = exports.userIdsToRemove = exports.classifyUsersToGroups = void 0;
const config_1 = require("../config");
const group_manager_1 = __importDefault(require("../groups/group.manager"));
const group_model_1 = __importDefault(require("../groups/group.model"));
const group_repository_1 = __importDefault(require("../groups/group.repository"));
const user_manager_1 = __importDefault(require("../users/user.manager"));
const user_model_1 = __importDefault(require("../users/user.model"));
const userError_1 = require("./errors/userError");
const people_api_1 = require("./people-api-mock/people-api");
/**
 * @param {IUser[]} usersTeamAndId array of mixed team users
 * @return {Object} object with classified key which each one represent team name
 *  and the value is array of usersId related to the team.
 */
function classifyUsersToGroups(usersTeamAndId) {
    const teamsClassify = {};
    for (let i = 0; i < usersTeamAndId.length; i++) {
        if (!usersTeamAndId[i].inGroup || !usersTeamAndId[i]._id) {
            throw new userError_1.LackOfUserInfoError('User is missing fields - group it belong or userId ');
        }
        if (!Object.keys(teamsClassify).includes(usersTeamAndId[i].inGroup)) {
            teamsClassify[`${usersTeamAndId[i].inGroup}`] = [];
            teamsClassify[`${usersTeamAndId[i].inGroup}`].push(usersTeamAndId[i]._id);
            // TODO: ask almog if that is ok
            // eslint-disable-next-line no-continue
            continue;
        }
        teamsClassify[`${usersTeamAndId[i].inGroup}`].push(usersTeamAndId[i]._id);
    }
    return teamsClassify;
}
exports.classifyUsersToGroups = classifyUsersToGroups;
/**
 * @param {string[]} originalGroup array A contain many Users
 * @param {string[]} newGroup array B contain many Users
 * @return {Object} the items that belong to A but not to B (A-B).
 * @example For [1,2,3] [2,3] it will yield [1]. On the other hand, for [1,2,3] [2,3,5] will return the same thing.
 */
async function userIdsToRemove(originalGroup, newGroup) {
    const originalGroupUsernames = originalGroup.map((user) => user.username);
    const newGroupUsernames = newGroup.map((user) => user.username);
    const usernames = originalGroupUsernames.filter((username) => !newGroupUsernames.includes(username));
    console.log(usernames);
    if (!usernames.length)
        return null;
    const extraGroupUsers = usernames.map((username) => {
        const foundUser = originalGroup.find((user) => user.username === username);
        return foundUser === null || foundUser === void 0 ? void 0 : foundUser.username;
    });
    const extraGroupUsersPopulated = await Promise.all(extraGroupUsers.map((user) => people_api_1.users.getUser(user, config_1.config.peopleApi.UserAndGroupfields)));
    const releasedUsers = extraGroupUsersPopulated
        .filter((user) => user.managerName === null)
        .map((user) => user.username);
    const releasedUsersIds = originalGroup
        .filter((user) => releasedUsers.includes(user.username))
        .map((user) => user._id);
    return releasedUsersIds;
}
exports.userIdsToRemove = userIdsToRemove;
/**
 * @param {string} branch branch name
 * @return {Object} of the classified teams and users.
 * this function create branch based on people-Api db. the branch include mador, team and users.
 * the creation is happening from root to leaf (branch -> mador -> team )
 */
async function createBranch(branch) {
    // check the type name of IPeople User (Based on people api package!)
    const createdBranchGroups = await group_manager_1.default.getAllBranchHierarchyNames(branch);
    if (createdBranchGroups) {
        await group_manager_1.default.deletedManyGroupByName(createdBranchGroups);
    }
    let branchUsers = await people_api_1.users.getUsers(branch, config_1.config.peopleApi.UserAndGroupfields);
    branchUsers = branchUsers.filter((user) => user.managerName !== null);
    const branchManager = branchUsers.find((user) => user.branchManager === user.username);
    if (!branchManager) {
        throw new userError_1.BranchManagerNotFoundError('Branch manager not found!');
    }
    const branchManagerUser = await user_manager_1.default.upsertUserPersonalAndGroupInfo(branchManager, branchManager.branch);
    await group_manager_1.default.createGroupFromPeopleApi(branchManagerUser._id, branchManager.branch, null);
    const madorManagers = branchUsers.filter((user) => user.madorManager === user.username);
    if (!madorManagers) {
        // TODO: change to return cause it is not really Error
        return { msg: 'branch have been created. NOTE: there is no madors at the created branch.' };
    }
    const createdMadorManagers = await Promise.all(madorManagers.map((madorManagerUser) => {
        const createdUsers = user_manager_1.default.upsertUserPersonalAndGroupInfo(madorManagerUser, madorManagerUser.mador);
        return createdUsers;
    }));
    await Promise.all(madorManagers.map((madorManagerUser) => {
        const managerUser = createdMadorManagers.find((user) => user.inGroup === madorManagerUser.mador);
        if (!managerUser) {
            throw new userError_1.UserNotFoundError(`User not found - no manager for this mador: ${madorManagerUser.mador}`);
        }
        const createdGroup = group_manager_1.default.createGroupFromPeopleApi(managerUser._id, madorManagerUser.mador, madorManagerUser.branch);
        return createdGroup;
    }));
    const teamManager = branchUsers.filter((user) => user.teamManager === user.username);
    if (!teamManager) {
        // TODO: change to return cause it is not really Error
        return { msg: 'branch have been created. NOTE: there is no teams at the created branch.' };
    }
    const createdTeamManagers = await Promise.all(teamManager.map(async (teamManagerUser) => {
        const createdUser = await user_manager_1.default.upsertUserPersonalAndGroupInfo(teamManagerUser, teamManagerUser.team);
        return createdUser;
    }));
    await Promise.all(teamManager.map(async (teamManagerUser) => {
        const managerUser = createdTeamManagers.find((user) => user.inGroup === teamManagerUser.team);
        if (!managerUser) {
            throw new userError_1.UserNotFoundError(`User not found - no manager for this team: ${teamManagerUser.team}`);
        }
        const createdGroup = group_manager_1.default.createGroupFromPeopleApi(managerUser._id, teamManagerUser.team, teamManagerUser.mador);
        return createdGroup;
    }));
    const teamsUsers = branchUsers.filter((user) => user.branchManager !== user.username &&
        user.madorManager !== user.username &&
        user.teamManager !== user.username);
    if (!teamsUsers) {
        throw new userError_1.TeamUsersNotFoundError('There is no users at all inside teams!');
    }
    const createdTeamUsers = await Promise.all(teamsUsers.map((teamUsersGroup) => user_manager_1.default.upsertUserPersonalAndGroupInfo(teamUsersGroup, teamUsersGroup.team)));
    if (!createdTeamUsers) {
        throw new Error();
    }
    const teamsClassify = classifyUsersToGroups(createdTeamUsers);
    const teamsNamesArr = Object.keys(teamsClassify);
    await Promise.all(teamsNamesArr.map((teamName) => group_manager_1.default.updateGroupByName(teamName, { usersId: teamsClassify[teamName] }, config_1.config.action.Add)));
    return teamsClassify;
}
exports.createBranch = createBranch;
/**
 * @param {string} BranchName branch name for update operation
 * @param {string} originalBranchName branch name for comparing the existing branch
 * @return {Object} of the classified teams and users.
 * this function create branch based on people-Api db. the branch include mador, team and users.
 * the creation is happening from root to leaf (branch -> mador -> team )
 */
async function updateBranch(BranchName) {
    // check the type name of IPeople User (Based on people api package!)
    let newBranchUsers = await people_api_1.users.getUsers(BranchName, config_1.config.peopleApi.UserAndGroupfields);
    // const releasedUsers: IPeopleUser[] | string[] = newBranchUsers.filter((user) => user.managerName === null);
    newBranchUsers = newBranchUsers.filter((user) => user.managerName !== null);
    const branchManager = newBranchUsers.find((user) => user.branchManager === user.username);
    if (!branchManager) {
        throw new userError_1.BranchManagerNotFoundError('Branch manager not found!');
    }
    const originalBranchUsers = await user_manager_1.default.getAllBranchUsers(BranchName);
    const oldHierarchyNames = await group_manager_1.default.getAllBranchHierarchyNames(BranchName);
    if (oldHierarchyNames) {
        await group_manager_1.default.deletedManyGroupByName(oldHierarchyNames);
    }
    const usersToRemove = await userIdsToRemove(originalBranchUsers, newBranchUsers);
    console.log('users to remove:', usersToRemove);
    // problem is delete many by userIds but it is usernames that return from usersToremove
    if (usersToRemove) {
        await user_manager_1.default.deleteManyUserByUserIds(usersToRemove);
    }
    const branchManagerUser = await user_manager_1.default.upsertUserPersonalAndGroupInfo(branchManager, branchManager.branch);
    await group_manager_1.default.createGroupFromPeopleApi(branchManagerUser._id, branchManager.branch, null);
    const madorManagers = newBranchUsers.filter((user) => user.madorManager === user.username);
    if (!madorManagers) {
        // TODO: change to return cause it is not really Error
        return { msg: 'branch have been created. NOTE: there is no madors at the created branch.' };
    }
    const createdMadorManagers = await Promise.all(madorManagers.map((madorManagerUser) => {
        const createdUsers = user_manager_1.default.upsertUserPersonalAndGroupInfo(madorManagerUser, madorManagerUser.mador);
        return createdUsers;
    }));
    await Promise.all(madorManagers.map((madorManagerUser) => {
        const managerUser = createdMadorManagers.find((user) => user.inGroup === madorManagerUser.mador);
        if (!managerUser) {
            throw new userError_1.UserNotFoundError(`User not found - no manager for this mador: ${madorManagerUser.mador}`);
        }
        const createdGroup = group_manager_1.default.createGroupFromPeopleApi(managerUser._id, madorManagerUser.mador, madorManagerUser.branch);
        return createdGroup;
    }));
    const teamManager = newBranchUsers.filter((user) => user.teamManager === user.username);
    if (!teamManager) {
        // TODO: change to return cause it is not really Error
        return { msg: 'branch have been created. NOTE: there is no teams at the created branch.' };
    }
    const createdTeamManagers = await Promise.all(teamManager.map(async (teamManagerUser) => {
        const createdUser = await user_manager_1.default.upsertUserPersonalAndGroupInfo(teamManagerUser, teamManagerUser.team);
        return createdUser;
    }));
    await Promise.all(teamManager.map(async (teamManagerUser) => {
        const managerUser = createdTeamManagers.find((user) => user.inGroup === teamManagerUser.team);
        if (!managerUser) {
            throw new userError_1.UserNotFoundError(`User not found - no manager for this team: ${teamManagerUser.team}`);
        }
        const createdGroup = group_manager_1.default.createGroupFromPeopleApi(managerUser._id, teamManagerUser.team, teamManagerUser.mador);
        return createdGroup;
    }));
    const teamsUsers = newBranchUsers.filter((user) => user.branchManager !== user.username &&
        user.madorManager !== user.username &&
        user.teamManager !== user.username);
    if (!teamsUsers) {
        throw new userError_1.TeamUsersNotFoundError('There is no users at all inside teams!');
    }
    const createdTeamUsers = await Promise.all(teamsUsers.map((teamUsersGroup) => user_manager_1.default.upsertUserPersonalAndGroupInfo(teamUsersGroup, teamUsersGroup.team)));
    if (!createdTeamUsers) {
        throw new Error();
    }
    const teamsClassify = classifyUsersToGroups(createdTeamUsers);
    const teamsNamesArr = Object.keys(teamsClassify);
    await Promise.all(teamsNamesArr.map((teamManagerUser) => group_manager_1.default.updateGroupByName(teamManagerUser, { usersId: teamsClassify[teamManagerUser] }, config_1.config.action.Add)));
    return teamsClassify;
}
exports.updateBranch = updateBranch;
// export async function isUserInGroupNull(username: string[] | undefined): Promise<boolean> {
//     if (username !== undefined && username.length) {
//         const populatedUsers: IUser[] = await UserManager.getManyByUsername(username);
//         if (populatedUsers.length !== username.length) {
//             throw new UserNotFoundError('User/s not found');
//         }
//         const usersWithNullGroup: number = populatedUsers.filter((user: IUser) => user.inGroup === null).length;
//         console.log('null inGroup fields: ', usersWithNullGroup);
//         if (username.length === usersWithNullGroup) return true;
//         return false;
//     }
//     return true;
// }
/**
 * @param {IGroup} populatedGroup populated group
 * @return {IGroup} deleted group.
 * this function delete recursively the group and its users.
 */
async function recursiveGroupDelete(populatedGroup) {
    const groupChildren = await group_manager_1.default.getAllGroupByFilter({ parentName: populatedGroup.name });
    groupChildren.map(async (groupChild) => {
        const groupSubChildren = await group_manager_1.default.getAllGroupByFilter({ parentName: groupChild.name });
        if (groupSubChildren.length) {
            await recursiveGroupDelete(groupChild);
        }
        // TODO: remember you ingore this line for now cause of changes
        // await UserManager.updateManyByUsername(groupChild.users as string[], { inGroup: null } as Partial<IUser>);
        await group_repository_1.default.deletedGroupByName(groupChild.name);
        // eslint-disable-next-line no-useless-return
        return;
    });
    // TODO: remember you ingore this line for now cause of changes
    // await UserManager.updateManyByUsername(populatedGroup.users as string[], { inGroup: null } as Partial<IUser>);
    return (await group_repository_1.default.deletedGroupByName(populatedGroup.name));
}
exports.recursiveGroupDelete = recursiveGroupDelete;
async function getAllBranchUsers(branchName) {
    const branchUsers = [];
    const branchGroup = await group_manager_1.default.getGroupByNamePopulated(branchName);
    branchUsers.push(branchGroup.usersId);
    const madorGroups = await group_manager_1.default.getAllGroupByFilter({ parentName: branchName });
    const madorUsers = madorGroups.map((group) => group.usersId).flat();
    const teamGroups = (await Promise.all(madorGroups.map((mador) => group_manager_1.default.getAllGroupByFilter({ parentName: mador.name })))).flat();
    const teamUsers = teamGroups.map((group) => group.usersId).flat();
    branchUsers.push(madorUsers, teamUsers);
    return branchUsers.flat();
}
exports.getAllBranchUsers = getAllBranchUsers;
async function getAllBranchHierarchyNames(branchName) {
    const fullGroupHierarchy = [];
    fullGroupHierarchy.push([branchName]);
    const madorGroups = await group_manager_1.default.getAllGroupByFilter({ parentName: branchName });
    fullGroupHierarchy.push(madorGroups.map((mador) => mador.name));
    const allTeamGroups = await Promise.all(madorGroups.map((mador) => group_manager_1.default.getAllGroupByFilter({ parentName: mador.name })));
    fullGroupHierarchy.push(allTeamGroups.flat().map((group) => group.name));
    return fullGroupHierarchy.flat();
}
exports.getAllBranchHierarchyNames = getAllBranchHierarchyNames;
async function isUserExist(UserFullName) {
    return (await user_model_1.default.count({ username: UserFullName }).exec()) >= 1;
}
exports.isUserExist = isUserExist;
async function isGroupExist(GroupFullName) {
    return (await group_model_1.default.count({ name: GroupFullName }).exec()) === 1;
}
exports.isGroupExist = isGroupExist;
// export async function getGroupAdmin(groupname: string): Promise<string[]> {
//     let populatedGroup: IGroup = await GroupManager.getGroupByName(groupname);
//     const admins: string[] = [populatedGroup.manager as string];
//     while (populatedGroup.parentName !== null) {
//         // eslint-disable-next-line no-await-in-loop
//         populatedGroup = (await GroupManager.getGroupByName(populatedGroup.parentName as string)) as IGroup;
//         admins.push(populatedGroup.manager as string);
//     }
//     return admins;
