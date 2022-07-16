export interface IUser {
    _id?: string;
    username: string;
    fullName: string;
    rank: string;
    job: string;
    gender: string;
    dateOfBirth: string;
    serviceEndDate: string;
    inGroup: string | null;
    isAdmin: boolean;
    // TODO:add avatar feature!
    createdAt?: string;
    updatedAt?: string;
}

export interface IUserTeamId {
    userId: string;
    team: string;
}
