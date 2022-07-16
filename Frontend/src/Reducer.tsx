import GlobalState from './models/GlobalState';
import IUser from './models/IUser';

export type ACTIONTYPE =
    | { type: 'SET_USER'; payload: IUser }
    | { type: 'LOADING' }
    | { type: 'UNLOADING' }
    | { type: 'SET_ERROR'; payload?: string }
    | { type: 'UNSET_ERROR' }
    | { type: 'SET_DARKMODE' }
    | { type: 'UNSET_DARKMODE' };

const Reducer: (state: GlobalState, action: ACTIONTYPE) => GlobalState = (state: GlobalState, action: ACTIONTYPE) => {
    switch (action.type) {
        case 'SET_USER':
            return {
                ...state,
                user: action.payload,
            };
        case 'LOADING':
            return {
                ...state,
                isLoading: true,
            };
        case 'UNLOADING':
            return {
                ...state,
                isLoading: false,
            };
        case 'SET_ERROR':
            return {
                ...state,
                error: action.payload || '500',
            };
        case 'UNSET_ERROR':
            return {
                ...state,
                error: '',
            };
        case 'SET_DARKMODE':
            return {
                ...state,
                isDarkMode: true,
            };
        case 'UNSET_DARKMODE':
            return {
                ...state,
                isDarkMode: false,
            };
        default:
            return state;
    }
};

export default Reducer;
