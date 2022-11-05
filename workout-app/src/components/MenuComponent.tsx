import React from 'react';
import logo from '../logos/logo.png';
import {Container, Button} from "@mui/material";

interface Props {
    isSignOutVisible: boolean
    handleSignOut: any
}

export const MenuComponent = (props: Props) => {
    return (
        <Container sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', marginTop: '1.5rem'}}>
            <img
                src={logo}
                alt={'Swole Nation'}
                width={'400'}
                height={'75'}
                className={'main-logo'}
            />

            {
                props.isSignOutVisible
                    ?
                    <Button
                        className={'signout-button primary-button'}
                        variant="contained"
                        onClick={() => props.handleSignOut()}
                    >Sign Out</Button>
                    :
                    null
            }
        </Container>
    )
}
