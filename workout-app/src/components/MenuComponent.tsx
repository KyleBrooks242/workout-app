import React from 'react';
import logo from '../logos/logo.png';
import {Container, Button, Grid, Box} from "@mui/material";
import { MenuDropdownComponent } from "./MenuDropdownComponent";

interface Props {
    isSignedIn: boolean
    handleSignOut: any
}

export const MenuComponent = (props: Props) => {
    return (
        <Container
            className={'menu-container'}
        >
            <img
                src={logo}
                alt={'Swole Nation'}
                className={`main-logo ${props.isSignedIn ? 'off-center' : 'centered'}`}
            />
            {
                props.isSignedIn
                    ?
                    <Box className={'menu-icon'}>
                        <MenuDropdownComponent
                            handleSignOut={props.handleSignOut}
                        />
                    </Box>
                    :
                    null
            }
        </Container>
    )
}
