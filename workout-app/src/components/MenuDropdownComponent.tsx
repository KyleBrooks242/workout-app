import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import {FormControlLabel, Switch} from "@mui/material";
import {useCustomThemeHook} from "../utils/useCustomThemeHook";
import {useState} from "react";
import {useNavigate} from "react-router-dom";

interface Props {
    handleSignOutClicked: any
    handleThemeToggled: any
    profileImage: string
}

export const MenuDropdownComponent = (props: Props) => {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const { isDarkTheme } = useCustomThemeHook();
    const [isDarkThemeChecked, setIsDarkThemeChecked] = useState(isDarkTheme);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const navigate = useNavigate();

    const handleProfileClicked = () => {
        handleClose();
        navigate('/profile');
    }



    return (
        <React.Fragment>
            <IconButton
                onClick={handleClick}
                size="small"
                aria-controls={open ? 'account-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
            >
                { props.profileImage &&
                    <Avatar
                        alt="Profile photo"
                        src={props.profileImage}
                        className={'profile-icon'}
                    >
                    </Avatar>
                }

                { !props.profileImage &&
                    <Avatar>
                        <AccountCircleIcon className={'profile-icon'} />
                    </Avatar>
                }
            </IconButton>
            <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                PaperProps={{
                    elevation: 0,
                    sx: {
                        overflow: 'visible',
                        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                        mt: 1.5,
                        '& .MuiAvatar-root': {
                            width: 32,
                            height: 32,
                            ml: -0.5,
                            mr: 1,
                        },
                        '&:before': {
                            content: '""',
                            display: 'block',
                            position: 'absolute',
                            top: 0,
                            right: 14,
                            width: 10,
                            height: 10,
                            bgcolor: 'background.paper',
                            transform: 'translateY(-50%) rotate(45deg)',
                            zIndex: 0,
                        },
                    },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
                <MenuItem
                    onClick={handleProfileClicked}
                >
                    <Avatar /> Profile
                </MenuItem>
                <MenuItem>
                    <ListItemIcon>
                        <Settings fontSize="small" />
                    </ListItemIcon>
                    Settings
                </MenuItem>
                <MenuItem>
                    <FormControlLabel
                        control={
                            <Switch
                                checked={isDarkThemeChecked}
                                onChange={(event) => {
                                    setIsDarkThemeChecked(event.target.checked)
                                    props.handleThemeToggled(event.target.checked)}
                            }
                            />
                        }
                        label="Dark Mode"
                    />
                </MenuItem>
                <Divider />
                <MenuItem
                    onClick={() => {
                        handleClose();
                        props.handleSignOutClicked()
                    }}
                >
                    <ListItemIcon>
                        <Logout fontSize="small" />
                    </ListItemIcon>
                    Logout
                </MenuItem>
            </Menu>
        </React.Fragment>
    );
}