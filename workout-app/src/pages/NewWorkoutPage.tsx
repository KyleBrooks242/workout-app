import React, {useEffect, useState} from 'react';
import {Box, Button} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import {AddExerciseDialog} from "../components/AddExerciseDialog";

import axios from "axios";
import {useToken} from "../utils/useToken";
import {ExerciseComponent} from "../components/ExerciseComponent";
import {useNavigate} from "react-router-dom";

export interface Set {
    weight: string
    reps: string
}

export interface Exercise {
    name: string
    sets: number
    index: number
    values: Array<Set>
    newExercise?: string
}



export const NewWorkoutPage = () => {

    const navigate = useNavigate();

    const goToPage = (component: string) => {
        navigate(component);
    }

    const [showDialog, setShowDialog] = useState<boolean>(false);
    const [exerciseList, setExerciseList] = useState<Array<Exercise>>([]);
    const [dropdownExerciseOptions, setDropdownExerciseOptions] = useState<Array<string>>(['+ Add']);
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
                const list = resp.data.docs.map((doc : any) => { return doc.exercise })
                list.push('+ Add');
                setDropdownExerciseOptions(list);

            })
            .catch(error => {
                console.error('Error fetching exercise options!');
                console.error(error)
            });
    }

    useEffect(() => {
        fetchExerciseOptions()
            .catch((error) => {
                console.log(error)
            })
    }, [])

    const handleAddExercise = async (data: Exercise) => {

        if (data.name === '+ Add' && data.newExercise && data.newExercise !== '') {
            await axios.post(
                '/exercise',
                {
                    data: data
                },
                {
                    headers: { 'authorization': `Bearer ${token}`}
                }
            )
            .then(async () => {
                console.log(`Successfully added exercise!`);
                await fetchExerciseOptions()

            })
            .catch(error => {
                console.error('Error adding exercise!');
                console.error(error)
            });
            data = {
                name: data.newExercise,
                sets: data.sets,
                index: exerciseList.length,
                values: []
            }
            //Array(data.sets).fill({weight: '', reps: ''}) results in attempts to update a single index with updating
            //the entire array
            for (let i = 0; i < data.sets; i++) {
                data.values.push({
                    weight: '',
                    reps: ''
                })
            }
        }
        else {
            data.index = exerciseList.length
            //Array(data.sets).fill({weight: '', reps: ''}) results in attempts to update a single index with updating
            //the entire array
            data.values = [];
            for (let i = 0; i < data.sets; i++) {
                data.values.push({
                    weight: '',
                    reps: ''
                })
            }
        }

        const tempList = exerciseList;
        tempList.push(data);
        setExerciseList(tempList);
        setShowDialog(false);
    }

    const handleExerciseInput = async (event: any, setIndex: number, exerciseIndex: number, field: number) => {
        console.log(`Handling exercise input!`);
        const tempList: Array<Exercise> = [...exerciseList];
        const tempExercise: Exercise = {...exerciseList[exerciseIndex]};
        const tempValues: Array<Set> = [...tempExercise.values];

        //Field is either 0 or 1... the !! turns this into a true/false scenario to determine if we are updating the weight or reps field
        !!field ? tempValues[setIndex].reps = event.target.value : tempValues[setIndex].weight = event.target.value;

        tempExercise.values = tempValues;
        tempList[exerciseIndex] = tempExercise;

        setExerciseList(tempList);

    }

    //Is there a better way to do this, that does not rely on user hitting a button?
    //TODO if the user clicks away from this screen, we should save off data
    const saveWorkout = async () => {
        await axios.put(
            '/workout',
            {
                data: JSON.stringify(exerciseList)
            },
            {
                headers: { 'authorization': `Bearer ${token}`}
            }
        )
            .then(async () => {
                console.log(`Successfully saved workout!`);
                await fetchExerciseOptions()

            })
            .catch(error => {
                console.error('Error saving workout!');
                console.error(error)
            });
    }

    const renderExercises = ():any => {
        return exerciseList.map((exercise, index) => {
            return (
                <div key={index} className={'content-wrapper'}>
                    <ExerciseComponent  exercise={ exercise } handleInput={ handleExerciseInput }/>
                </div>
            )
        })
    }

    return (
        <Box className={'new-exercise-page'}>
            <AddExerciseDialog
                isOpen={showDialog}
                dropdownExerciseOptions={dropdownExerciseOptions}
                handleAddExercise={(data: any) => handleAddExercise(data)}
                handleClose={() => setShowDialog(false)}/>

            { exerciseList ? renderExercises() : null }

            <Button
                className={'add-exercise-button'}
                startIcon={<AddIcon />}
                variant="outlined"
                onClick={() => setShowDialog(true)}
            >
                Add
            </Button>

            <Button
                className={'add-exercise-button'}
                variant="outlined"
                onClick={() => saveWorkout()}
            >
                Save
            </Button>

            <Button
                className={'add-exercise-button'}
                variant="outlined"
                onClick={() => goToPage('/dashboard')}
            >
                Home
            </Button>
        </Box>
    )

}