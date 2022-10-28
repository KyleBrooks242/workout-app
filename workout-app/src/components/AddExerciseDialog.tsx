import React, {useState} from 'react';
import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControl, InputLabel, MenuItem,
} from "@mui/material";
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Input from "@mui/material/Input";


interface Exercise {
    name: string
    sets: number
    newExercise: string

}

interface Props {
    handleAddExercise: any
    isOpen: boolean
    handleClose: any
    exerciseListOptions: Array<string>
}

const SETS = [1,2,3,4,5,6,7,8];

export const AddExerciseDialog = (props: Props) => {

    const [values, setValues] = useState<Exercise>({
        name: props.exerciseListOptions[0],
        sets: 1,
        newExercise: ''
    })

    const handleChange = (event: any, prop: keyof Exercise) => {

        setValues({ ...values, [prop]: event.target.value });
    };

    const renderDropdown = (items: Array<string | number>):any => {
        return items.map(item => {
            return <MenuItem key={item} value={item}>{item.toString().toUpperCase()}</MenuItem>
        })
    }

    return (
        <Box>
            <Dialog open={props.isOpen} onClose={props.handleClose}>
                <DialogTitle>Add Exercise</DialogTitle>
                <DialogContent>
                    <FormControl fullWidth className={'exercise-dropdown'}>
                        <InputLabel id="exercise-label">Exercise</InputLabel>
                        <Select
                            labelId="exercise-label"
                            id="exercise-dropdown"
                            value={values.name}
                            label="Exercise"
                            onChange={(event) => handleChange(event,'name')}
                        >
                            { renderDropdown(props.exerciseListOptions) }
                        </Select>
                    </FormControl>
                    { values.name === '+ Add' &&
                        <FormControl fullWidth className={'exercise-dropdown'}>
                            <InputLabel htmlFor="addExercise">
                                Exercise Name...
                            </InputLabel>
                            <Input
                                id="addExercise"
                                onChange={(event) => handleChange(event,'newExercise')}
                            />
                        </FormControl>
                    }
                    <FormControl className={'exercise-dropdown'}>
                        <InputLabel id="set-label">Sets</InputLabel>
                        <Select
                            labelId="set-label"
                            id="set-dropdown"
                            value={values.sets}
                            label="Sets"
                            onChange={(event) => handleChange(event,'sets')}
                        >
                            { renderDropdown(SETS)}
                        </Select>
                    </FormControl>

                </DialogContent>
                <DialogActions>
                    <Button onClick={props.handleClose}>Cancel</Button>
                    <Button variant={'contained'} onClick={() => props.handleAddExercise(values)}>Add</Button>
                </DialogActions>
            </Dialog>
        </Box>
    )
}