import React, {useState} from 'react';
import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControl,
    InputLabel,
} from "@mui/material";
import Input from "@mui/material/Input";


interface Props {
    handleAddCategory: any
    isOpen: boolean
    handleClose: any
}


export const AddWorkoutCategoryDialog = (props: Props) => {

    const [category, setCategory] = useState<string>('')

    return (
        <Box>
            <Dialog open={props.isOpen} onClose={props.handleClose}>
                <DialogTitle>Add Workout Category</DialogTitle>
                <DialogContent>
                    <FormControl fullWidth className={'exercise-dropdown'}>
                        <InputLabel htmlFor="addExercise">
                            Workout Category...
                        </InputLabel>
                        <Input
                            id="addExercise"
                            onChange={(event) => setCategory(event.target.value)}
                        />
                    </FormControl>
                </DialogContent>
                <DialogActions>
                    <Button className={'primary-outline-button'} variant={'outlined'} onClick={props.handleClose}>Cancel</Button>
                    <Button className={'primary-button'} variant={'contained'} onClick={() => props.handleAddCategory(category)}>Add</Button>
                </DialogActions>
            </Dialog>
        </Box>
    )
}