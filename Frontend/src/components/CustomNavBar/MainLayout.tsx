import * as React from 'react';
import { Container, Grid } from '@mui/material';
import { makeStyles } from '@material-ui/core';
import HeaderLayout from './HeaderLayout';
import Sidebar from './SideBar/SideBar';

const useStyles = makeStyles(() => ({
    box22: {
        top: '0px',
        position: 'sticky',
        height: '60px',
        zIndex: 1,
    },
    box33: {
        top: '70px',
        height: '80vh',
        position: 'sticky',
        overflow: 'scroll',
        marginTop: '10%',
        '&::-webkit-scrollbar': {
            width: '0.4em',
        },
        '&::-webkit-scrollbar-track': {
            '-webkit-box-shadow': 'inset 0 0 6px rgba(0,0,0,0.00)',
        },
        '&::-webkit-scrollbar-thumb': {
            backgroundColor: 'rgba(0,0,0,.1)',
            outline: '1px solid slategrey',
            borderRadius: '5px',
        },
    },
}));

const MainLayout: React.FC = ({ children }) => {
    const [open, setOpen] = React.useState(true);
    const classes = useStyles();

    const handleClick = () => {
        setOpen(!open);
    };
    return (
        <Grid container>
            <Grid item xs={12} className={classes.box22}>
                <HeaderLayout style={{ height: '100%' }} />
            </Grid>
            {/* TODO - i stopped here@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ */}
            <Grid item xs={2.5} className={classes.box33} style={{ marginTop: '1%' }}>
                {/* <TopSideBarLayout /> */}
                <Sidebar />
            </Grid>
            <Grid item xs={9.5}>
                <Container style={{ marginRight: '0px', marginLeft: '0px', height: 'auto' }}>{children}</Container>
            </Grid>
        </Grid>
    );
};

export default MainLayout;
