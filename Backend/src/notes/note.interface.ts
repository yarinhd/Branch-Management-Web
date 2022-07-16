import { IUser } from '../users/user.interface';

export default interface INote {
    _id?: string;
    subject: string;
    text: string;
    userId: string | IUser;
    createdAt?: string;
    updatedAt?: string;
}
