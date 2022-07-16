import React, { createContext, useMemo, useReducer } from 'react';
import GlobalState from '../models/GlobalState';
import Reducer, { ACTIONTYPE } from '../Reducer';

const initialState: GlobalState = {
    isLoading: false,
    user: null,
    error: '',
    isDarkMode: false,
};

const StoreProvider: React.FC = ({ children }) => {
    const [state, dispatch] = useReducer(Reducer, initialState);
    // Ask Almog: why you use useMemo here? so it won't initialize every rendering?
    return <Context.Provider value={useMemo(() => [state, dispatch], [state, dispatch])}>{children}</Context.Provider>; // update the Context with a value.
};

// Initiate with null because we override it later
// to be consumed later on in other components.
export const Context = createContext<[GlobalState, React.Dispatch<ACTIONTYPE>]>([initialState, () => null]);
export default StoreProvider;
