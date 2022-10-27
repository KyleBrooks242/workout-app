import React, {useEffect, useState} from 'react';
import {Box, Button, FormControl, Grid, InputAdornment, InputLabel, TextField} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import {AddExerciseDialog} from "../components/AddExerciseDialog";
import Input from "@mui/material/Input";
import axios from "axios";
import {useToken} from "../utils/useToken";

interface Exercise {
    name: string
    sets: number
    newExercise?: string
}

export const NewWorkoutPage = () => {

    const [showDialog, setShowDialog] = useState<boolean>(false);
    const [exerciseList, setExerciseList] = useState<Array<Exercise>>([]);
    const [exerciseListOptions, setExerciseListOptions] = useState<Array<string>>(['+ Add']);
    const { token } = useToken();

    const fetchExerciseOptions = async () => {
        console.log("Fetching exercise options...");
        await axios.get(
            `/exercise-options`,
            {
                headers: { 'authorization': `Bearer ${token}`}
            }
        )
            .then((resp : any) => {
                const list = resp.data.docs.map(doc => { return doc._id })
                console.log('LIST');
                console.log(list);
                list.push('+ Add');
                setExerciseListOptions(list);

            })
            .catch(error => {
                console.error('Error fetching exercise options!');
                console.error(error)
            });
    }

    //TODO FIGURE OUT WHY THIS IS BEING CALLED TWICE
    useEffect(() => {
        fetchExerciseOptions().catch((error) => {
            console.log(error)
        })
    }, [])

    const handleAddExercise = async (data: Exercise) => {

        if (data.name === '+ Add' && data.newExercise && data.newExercise !== '') {
            await axios.post(
                '/exercise',
                {
                    data: data
                }
            )
                .then(async () => {
                    console.log(`Successfully added exercise!`);
                    await fetchExerciseOptions()

                })
                .catch(error => {
                    //TODO parse error message and, if user already exists,
                    console.error('Error adding exercise!');
                    console.error(error)
                });
            data = {
                name: data.newExercise,
                sets: data.sets
            }
        }


        //TODO remove newExercise from data before appending it to the exerciseList
        const tempList = exerciseList;
        tempList.push(data);
        setExerciseList(tempList);
        setShowDialog(false);
    }

    const renderSets = (sets: number):any => {
        const setList: any = [];
        for (let i = 0; i < sets; i++) {
            setList.push(
                <div key={i}>
                    <h4 className={'set-title'}>Set {i + 1}</h4>
                    <Grid>
                        <Input placeholder="Weight" sx={{ m: .5, width: '8ch' }} />
                        <Input placeholder="Reps" sx={{ m: .5, width: '8ch' }}/>
                    </Grid>
                </div>
            )
        }

        return setList
    }

    const renderExercises = ():any => {
        return exerciseList.map((exercise, index) => {
            return (
                <div key={index} className={'login-wrapper'}>
                    <Grid className={`exercise-grid color-${index % 2}`}>
                        <h2 className={'exercise-title'}>{ exercise.name }</h2>
                        { renderSets(exercise.sets) }
                    </Grid>
                </div>
            )
        })
    }


    return (
        <Box className={'new-exercise-page'}>
            <AddExerciseDialog
                isOpen={showDialog}
                exerciseListOptions={exerciseListOptions}
                handleAddExercise={(data: any) => handleAddExercise(data)}
                handleClose={() => setShowDialog(false)}/>

            { exerciseList ? renderExercises() : null }

            <Button
                className={'add-exercise-button'}
                startIcon={<AddIcon />}
                variant="outlined"
                onClick={() => setShowDialog(true)}
            >
                Add Exercise
            </Button>
        </Box>
    )

}