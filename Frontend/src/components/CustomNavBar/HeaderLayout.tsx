import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Avatar, Grid, makeStyles } from '@material-ui/core';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const useStyles = makeStyles(() => ({
    topLayout: {
        background: 'linear-gradient(to right, #7aeeb6, #579cf6)',
        // position: 'sticky',
        // alignContent: 'space-between',
        // justifyContent: 'space-between',
    },
    rightSide: {
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        gap: '12px',
    },
    leftSide: {
        display: 'flex',
        flexDirection: 'row-reverse',
    },
}));

const theme = createTheme({
    typography: {
        fontFamily: [
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
        ].join(','),
    },
});

const HeaderLayout: React.FC<React.HTMLAttributes<any>> = () => {
    const [open, setOpen] = React.useState(true);
    const classes = useStyles();
    const handleClick = () => {
        setOpen(!open);
    };
    return (
        <ThemeProvider theme={theme}>
            <AppBar className={classes.topLayout}>
                <Toolbar>
                    {/* <IconButton size="large" edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
                        <MenuIcon />
                    </IconButton> */}
                    <Grid container>
                        <Grid item xs={10}>
                            <Typography className={classes.rightSide} variant="h6" component="div" sx={{ flexGrow: 1 }}>
                                <Avatar
                                    alt="Remy Sharp"
                                    src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                                />
                                שלום דימאל וילנסקי
                            </Typography>
                        </Grid>
                        <Grid item xs={2} className={classes.leftSide}>
                            <Button color="inherit">Login</Button>
                        </Grid>
                    </Grid>
                </Toolbar>
            </AppBar>
        </ThemeProvider>
    );
};

export default HeaderLayout;
