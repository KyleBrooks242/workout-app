import React from 'react';
import logo from '../logos/logo.png';
import {Container, Box, AppBar, Toolbar, Typography} from "@mui/material";
import { MenuDropdownComponent } from "./MenuDropdownComponent";
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import {useProfileImage} from "../utils/useProfileImage";

interface Props {
    isSignedIn: boolean
    handleSignOutClicked: any
    handleThemeToggled: any
    profileImage: string;
}

export const MenuComponent = (props: Props) => {

    return (
        <AppBar
            position={'static'}
            enableColorOnDark={true}
        >
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <FitnessCenterIcon sx={{ display: 'flex', mr: 1, fontSize:'2rem' }} />
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        href="/"
                        sx={{
                            mr: 2,
                            display: { xs: 'none', md: 'flex' },
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        SWOLE NAYSH
                    </Typography>

                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        {/*<IconButton*/}
                        {/*    size="large"*/}
                        {/*    aria-label="account of current user"*/}
                        {/*    aria-controls="menu-appbar"*/}
                        {/*    aria-haspopup="true"*/}
                        {/*    onClick={handleOpenNavMenu}*/}
                        {/*    color="inherit"*/}
                        {/*>*/}
                        {/*    <MenuIcon />*/}
                        {/*</IconButton>*/}
                        {/*<Menu*/}
                        {/*    id="menu-appbar"*/}
                        {/*    anchorEl={anchorElNav}*/}
                        {/*    anchorOrigin={{*/}
                        {/*        vertical: 'bottom',*/}
                        {/*        horizontal: 'left',*/}
                        {/*    }}*/}
                        {/*    keepMounted*/}
                        {/*    transformOrigin={{*/}
                        {/*        vertical: 'top',*/}
                        {/*        horizontal: 'left',*/}
                        {/*    }}*/}
                        {/*    open={Boolean(anchorElNav)}*/}
                        {/*    onClose={handleCloseNavMenu}*/}
                        {/*    sx={{*/}
                        {/*        display: { xs: 'block', md: 'none' },*/}
                        {/*    }}*/}
                        {/*>*/}
                        {/*    {pages.map((page) => (*/}
                        {/*        <MenuItem key={page} onClick={handleCloseNavMenu}>*/}
                        {/*            <Typography textAlign="center">{page}</Typography>*/}
                        {/*        </MenuItem>*/}
                        {/*    ))}*/}
                        {/*</Menu>*/}
                    </Box>
                    <Typography
                        variant="h5"
                        noWrap
                        component="a"
                        href=""
                        sx={{
                            mr: 2,
                            display: { xs: 'flex', md: 'none' },
                            flexGrow: 1,
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            // color: '#FEFEFE',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        SWOLE NAYSH
                    </Typography>

                    <Box sx={{ flexGrow: 0 }}>

                        {
                            props.isSignedIn &&
                            <MenuDropdownComponent
                                handleSignOutClicked={props.handleSignOutClicked}
                                handleThemeToggled={props.handleThemeToggled}
                                profileImage={props.profileImage}
                            />

                        }
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>

    )
}
