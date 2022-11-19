import React from 'react';
import logo from '../logos/logo.png';
import {Container, Box, AppBar, Toolbar, Typography} from "@mui/material";
import { MenuDropdownComponent } from "./MenuDropdownComponent";
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';

interface Props {
    isSignedIn: boolean
    handleSignOut: any
    handleTheme: any
}

function AdbIcon(props: { sx: { mr: number; display: { md: string; xs: string } } }) {
    return null;
}

export const MenuComponent = (props: Props) => {
    return (

        // <header>
        //     <img
        //         src={logo}
        //         alt={'Swole Nation'}
        //         className={`main-logo ${props.isSignedIn ? 'off-center' : 'centered'}`}
        //     />
        //     {
        //         props.isSignedIn
        //             ?
        //             <Box className={'menu-icon'}>
        //                 <MenuDropdownComponent
        //                     handleSignOut={props.handleSignOut}
        //                 />
        //             </Box>
        //             :
        //             null
        //     }
        // </header>

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
                    <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
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
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        SWOLE NAYSH
                    </Typography>
                    {/*<Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>*/}
                    {/*    /!*{pages.map((page) => (*!/*/}
                    {/*    /!*    <Button*!/*/}
                    {/*    /!*        key={page}*!/*/}
                    {/*    /!*        onClick={handleCloseNavMenu}*!/*/}
                    {/*    /!*        sx={{ my: 2, color: 'white', display: 'block' }}*!/*/}
                    {/*    /!*    >*!/*/}
                    {/*    /!*        {page}*!/*/}
                    {/*    /!*    </Button>*!/*/}
                    {/*    /!*))}*!/*/}
                    {/*</Box>*/}

                    <Box sx={{ flexGrow: 0 }}>

                        {
                            props.isSignedIn &&
                            <MenuDropdownComponent
                                handleSignOut={props.handleSignOut}
                                handleTheme={props.handleTheme}
                            />

                        }

                        {/*<Tooltip title="Open settings">*/}
                        {/*    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>*/}
                        {/*        <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />*/}
                        {/*    </IconButton>*/}
                        {/*</Tooltip>*/}
                        {/*<Menu*/}
                        {/*    sx={{ mt: '45px' }}*/}
                        {/*    id="menu-appbar"*/}
                        {/*    anchorEl={anchorElUser}*/}
                        {/*    anchorOrigin={{*/}
                        {/*        vertical: 'top',*/}
                        {/*        horizontal: 'right',*/}
                        {/*    }}*/}
                        {/*    keepMounted*/}
                        {/*    transformOrigin={{*/}
                        {/*        vertical: 'top',*/}
                        {/*        horizontal: 'right',*/}
                        {/*    }}*/}
                        {/*    open={Boolean(anchorElUser)}*/}
                        {/*    onClose={handleCloseUserMenu}*/}
                        {/*>*/}
                        {/*    {settings.map((setting) => (*/}
                        {/*        <MenuItem key={setting} onClick={handleCloseUserMenu}>*/}
                        {/*            <Typography textAlign="center">{setting}</Typography>*/}
                        {/*        </MenuItem>*/}
                        {/*    ))}*/}
                        {/*</Menu>*/}
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>

    )
}
