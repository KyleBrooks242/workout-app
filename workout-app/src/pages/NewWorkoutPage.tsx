import React, {useState} from 'react';
import {Box, Button} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import {AddExerciseDialog} from "../components/AddExerciseDialog";


export const NewWorkoutPage = () => {

    const [showDialog, setShowDialog] = useState<boolean>(false)

    const [exerciseList, setExerciseList] = useState<Array<any>>([])

    const handleAddExercise = (data: any) => {
        const tempList = exerciseList;
        tempList.push(data);
        setExerciseList(tempList);
        setShowDialog(false);
    }


    return (
        <Box className={'dashboard-wrapper'}>

            <AddExerciseDialog
                onClickAddExercise={(data: any) => handleAddExercise(data)}
                isOpen={showDialog}
                handleClose={() => setShowDialog(false)}/>

            <Button
                startIcon={<AddIcon />}
                variant="outlined"
                onClick={() => setShowDialog(true)}
            >
                Add Exercise
            </Button>
        </Box>
    )

}