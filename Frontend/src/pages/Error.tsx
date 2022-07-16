import { makeStyles, Paper } from '@material-ui/core';
import React from 'react';
// component for registering user at first login to the system

const useStyles = makeStyles(() => ({
    box: {
        display: 'flex',
        padding: '0 96px',
        flexDirection: 'column',
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

const ErrorPage: React.FC = () => {
    const classes = useStyles();
    return (
        <Paper elevation={10}>
            <div className={classes.box}>
                <p className={classes.text}>Error Page</p>
            </div>
        </Paper>
    );
};

export default ErrorPage;
