import { Button, makeStyles } from '@material-ui/core';
import React from 'react';
import './SidebarLink.css';

type Props = {
    text: string;
    Icon: any;
    onNavigate: (route: string) => void;
    route: string;
    // eslint-disable-next-line react/require-default-props
    // eslint-disable-next-line react/require-default-props
};

const useStyles = makeStyles(() => ({
    buttonLink: {
        // background: 'transparent',
        all: 'unset',
        width: '100%',
        '&:hover': { backgroundColor: 'transparent' },

        // alignContent: 'space-between',
        // justifyContent: 'space-between',
    },
}));
const SidebarLink: React.FC<Props & React.HTMLAttributes<any>> = ({ children, text, Icon, onNavigate, route }) => {
    const classes = useStyles();

    const clickHandler = () => {
        onNavigate(route);
    };

    // const { text, Icon } = props;
    return (
        <Button disableRipple className={classes.buttonLink} onClick={clickHandler}>
            <div className="link">
                <Icon />
                <h2>{text}</h2>
                {children}
            </div>
        </Button>
    );
};
export default SidebarLink;
