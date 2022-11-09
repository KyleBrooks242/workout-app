import React from 'react';
import logo from '../logos/logo.png';
import {Container, Button, Grid} from "@mui/material";
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
                className={'main-logo'}
            />
            {
                props.isSignedIn
                    ?
                    <MenuDropdownComponent
                        handleSignOut={props.handleSignOut}
                    />
                    :
                    null
            }
        </Container>
    )
}
