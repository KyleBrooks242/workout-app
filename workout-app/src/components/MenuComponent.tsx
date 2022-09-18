import React from 'react';
import {LogoComponent} from "./LogoComponent";
import {Box} from "@mui/material";
export const MenuComponent = () => {
    return (
        <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', marginTop: '1.5rem'}}>
            <p>Swole</p>
            <LogoComponent/>
            <p>Naysh</p>
        </Box>
)
}
