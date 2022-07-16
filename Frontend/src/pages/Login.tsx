import { makeStyles, Paper } from '@material-ui/core';
import React, { useContext, useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import useWrapFetch from '../hooks/useWrapFetch';
import { setMyUserCookie } from '../services/user';
import { Context } from '../store/Store';

// component for registering user at first login to the system

const useStyles = makeStyles(() => ({
    box: {
        display: 'flex',
        padding: '0 0px',
        flexDirection: 'row',
        alignItems: 'center',
    },
    text: {
        textAlign: 'center',
        fontSize: 25,
        letterSpacing: 0,
        color: '#3E3E3E',
        marginBottom: 24,
    },
}));

const Login: React.FC = () => {
    console.log('startlogin');

    const navigate = useNavigate();
    const [state, dispatch] = useContext(Context);
    const classes = useStyles();
    const setMyUserCookieWrapped = useWrapFetch(setMyUserCookie)();
    useEffect(() => {
        setMyUserCookieWrapped((userAuth) => {
            console.log('hi effect');
            dispatch({ type: 'SET_USER', payload: userAuth.user });
        });
    }, []);

    // const setMyUserCookieWrapped = useWrapFetch(setMyUserCookie)();
    // useEffect(() => {
    //     setMyUserCookieWrapped((user) => {
    //         console.log('hi effect');
    //         dispatch({ type: 'SET_USER', payload: user });
    //     });
    // }, []);

    return (
        <>
            {state.user && <Navigate to="/" />}

            <p className={classes.box}>Logging...</p>
        </>
    );
};

export default Login;
