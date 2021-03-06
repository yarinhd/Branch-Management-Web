export default interface IUser {
    _id?: string;
    id?: string;
    username: string;
    fullName: string;
    rank: string;
    job: string;
    gender: string;
    serviceEndDate: string;
    inGroup: string | null;
    isAdmin: boolean;
    avatar: string;
    // TODO:add avatar feature!
    createdAt?: string;
    updatedAt?: string;
}
