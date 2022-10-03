import React, {useState} from 'react';
import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField} from "@mui/material";

interface Exercise {
    name: string
    sets: number

}

interface Props {
    onClickAddExercise: any
    isOpen: boolean
    handleClose: any
}

//TODO
// Make the name a dropdown where you can select existing workouts or add a new one to the list
export const AddExerciseDialog = (props: Props) => {

    const [values, setValues] = useState<Exercise>({
        name: '',
        sets: 0
    })

    return (
        <div>
            <Dialog open={props.isOpen} onClose={props.handleClose}>
                <DialogTitle>Subscribe</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        To subscribe to this website, please enter your email address here. We
                        will send updates occasionally.
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Email Address"
                        type="email"
                        fullWidth
                        variant="standard"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={props.handleClose}>Cancel</Button>
                    <Button onClick={props.handleClose}>Subscribe</Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}