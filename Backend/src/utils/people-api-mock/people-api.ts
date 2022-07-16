/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import PeopleUserModel from './people_user.model';
import peopleUsers from './people2.json';
import { IPeopleUser } from './people_user.interface';

export class users {
    // add users
    static async createUser() {
        const addedPeopleUser: IPeopleUser[] = await PeopleUserModel.create(peopleUsers);
        return addedPeopleUser;
    }

    // get user by username (t_yarin_h)
    static async getUser(username: string, fields: string[]) {
        console.log('username:', username);

        const user: IPeopleUser | null = await PeopleUserModel.findOne({ username }).select('-__v -_id').lean().exec();

        if (user === null) {
            throw new Error();
        }

        return user;
    }

    // Note: fields should be type of UserField[] from People-Api package!
    static async getUsers(branch: string, fields: string[]) {
        const branchUsers: IPeopleUser[] = await PeopleUserModel.find({ branch }).exec();
        if (users === null) {
            throw new Error();
        }
        return branchUsers;
    }
}

// static async check(req: Request, res: Response) {

//     const user = await PeopleApi.createUser();
//     console.log(user);

//     res.json(user);
//     }

//     static async checkk(req: Request, res: Response) {
//         const username =req.params.username;
//         console.log(username);

//         const user = await PeopleApi.getUser(username);
//         console.log(user);

//         res.json(user);
//         }
