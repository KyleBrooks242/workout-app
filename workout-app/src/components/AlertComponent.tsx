import React from 'react';
import {Alert, AlertTitle} from "@mui/material";


interface Props {
    title: string,
    message: string,
    severity: 'error' | 'warning' | 'info' | 'success'
    onClose: any,
}


export const AlertComponent = (props: Props) => {
    return (
        <Alert
            severity={props.severity}
            onClick={props.onClose}
        >
            <AlertTitle>{props.title}</AlertTitle>
            {props.message}
        </Alert>
    )

}