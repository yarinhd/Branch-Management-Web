import { makeStyles, Toolbar } from '@material-ui/core';
import * as React from 'react';
import Divider from '@mui/material/Divider';
import HomeIcon from '@material-ui/icons/Home';
import SearchIcon from '@material-ui/icons/Search';
import MailLockIcon from '@mui/icons-material/MailLock';
import GroupsIcon from '@mui/icons-material/Groups';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import PolicyIcon from '@mui/icons-material/Policy';
import FolderCopyIcon from '@mui/icons-material/FolderCopy';
import NotificationsNoneIcon from '@material-ui/icons/NotificationsNone';
import EnhancedEncryptionIcon from '@mui/icons-material/EnhancedEncryption';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import ListAltIcon from '@material-ui/icons/ListAlt';
import { Button, Collapse, IconButton } from '@mui/material';
import { ExpandMore } from '@material-ui/icons';
import { ExpandLess } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import SidebarLink from './SidebarLink';
import './SidebarLink.css';

const useStyles = makeStyles(() => ({
    sidebar: {
        // width: '20vw',
        // minWidth: '33vw',
        display: 'flex',
        flexDirection: 'column',
        flexWrap: 'wrap',
        justifyContent: 'flex-start',
        alignContent: 'center',
        padding: '20px 20px',
        margin: '0px auto 0 auto',
        boxShadow: '0px 0px 10px hsl(210 14% 90%)',
        borderRadius: '20px',
        // alignContent: 'space-between',
        // justifyContent: 'space-between',
    },
}));

const Sidebar: React.FC<React.HTMLAttributes<any>> = () => {
    const [open, setOpen] = React.useState(true);
    const navigate = useNavigate();
    const handleClick = () => {
        setOpen(!open);
    };
    const classes = useStyles();

    const navigateHandler = (route: string) => {
        // alert('hiii');
        navigate(route);
    };

    return (
        <Toolbar className={classes.sidebar}>
            <SidebarLink text="פרטים אישיים" Icon={HomeIcon} onNavigate={navigateHandler} route="/" />
            <SidebarLink text='שיחות פ"א' Icon={MailLockIcon} onNavigate={navigateHandler} route="/peyalef" />
            <SidebarLink text="שיחות חתך" Icon={FolderCopyIcon} onNavigate={navigateHandler} route="/hatah" />
            <SidebarLink text="חווד מפקדים" Icon={AdminPanelSettingsIcon} onNavigate={navigateHandler} route="/havad" />
            <SidebarLink
                text="הערות אישיות"
                Icon={EnhancedEncryptionIcon}
                onNavigate={navigateHandler}
                route="/notes"
            />
            <SidebarLink text="הפקודים שלי" Icon={GroupsIcon} onNavigate={navigateHandler} route="/pakoodim" />
            <Divider light variant="middle" sx={{ borderBottomWidth: 1 }} />
            {/* <SidebarLink text="Bookmarks" Icon={BookmarkBorderIcon} />
            <SidebarLink text="Lists" Icon={ListAltIcon} />
            <SidebarLink text="Profile" Icon={PermIdentityIcon} /> */}
            {/* TODO: need to puth the button on first element only */}
            {/* TODO: check about stop propogation event to not press on 2 elements together! */}
            {/* <div className="link">
                <Button className="dropdown" onClick={handleClick}>
                    <span>
                        <h2>
                            <IconButton>{open ? <ExpandLess /> : <ExpandMore />}</IconButton>
                            מדור ברושים
                        </h2>
                        <Collapse in={open} timeout="auto">
                            <SidebarLink
                                className="link"
                                text="צוות זיווד"
                                Icon={ListAltIcon}
                                onNavigate={navigateHandler}
                                route="/get/from/state"
                            />
                            <SidebarLink
                                className="link"
                                text="צוות זיווד"
                                Icon={ListAltIcon}
                                onNavigate={navigateHandler}
                                route="/get/from/state"
                            />
                            <SidebarLink
                                className="link"
                                text="צוות פיתוח"
                                Icon={ListAltIcon}
                                onNavigate={navigateHandler}
                                route="/get/from/state"
                            />
                            <SidebarLink
                                className="link"
                                text="צוות אנליזות"
                                Icon={ListAltIcon}
                                onNavigate={navigateHandler}
                                route="/get/from/state"
                            />
                        </Collapse>
                    </span>
                </Button>
            </div> */}
        </Toolbar>
    );
};
export default Sidebar;
