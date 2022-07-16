import IUser from './IUser';

export default interface GlobalState {
    isLoading: boolean;
    user: IUser | null;
    error: string; // HTTP ERROR CODE
    isDarkMode: boolean;
}
