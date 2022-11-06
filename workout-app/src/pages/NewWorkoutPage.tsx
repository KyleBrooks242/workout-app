import React, {useEffect, useState} from 'react';
import {Box, Button, FormControl, Grid, Input, InputLabel, MenuItem, TextField} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import {AddExerciseDialog} from "../components/AddExerciseDialog";
import {useToken} from "../utils/useToken";
import {ExerciseComponent} from "../components/ExerciseComponent";
import {useNavigate} from "react-router-dom";
import Select from "@mui/material/Select";
import {AddWorkoutCategoryDialog} from "../components/AddWorkoutCategoryDialog";
import {
    saveWorkoutRequest,
    fetchCategoriesRequest,
    fetchExercisesRequest, handleAddExerciseRequest, handleAddCategoryRequest
} from "../utils/requests";

const dayjs = require('dayjs');

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

/**
 * TODO
 * 1. Figure out why so many rerenders are happening at the start (and is this a bad thing..?
 * 2. Fix how the workout category component works.. aka get console warnings to go away
 * 3. Continue refactoring how requests are offloaded into a helper file
 * 4. Make it so that saving a workout takes in the workout name and category
 * 5. UI Tweaks
 */


export const NewWorkoutPage = () => {

    const { token } = useToken();
    const navigate = useNavigate();

    const [showDialog, setShowDialog] = useState<boolean>(false);
    const [exerciseList, setExerciseList] = useState<Array<Exercise>>([]);
    const [dropdownExerciseOptions, setDropdownExerciseOptions] = useState<Array<string>>(['+ Add']);
    const [dropdownWorkoutCategories, setDropdownWorkoutCategories] = useState<Array<string>>(['None', '+ Add'])
    const [isCategoryDialogOpen, setIsWorkoutCategoryDialogOpen] = useState<boolean>(false);
    const [values, setValues] = useState<any>({
        category: dropdownWorkoutCategories[0],
        workoutName: `Workout ${dayjs().format('MM-DD-YYYY')}`
    })
    const goToPage = (component: string) => {
        navigate(component);
    }

    useEffect(() => {
        fetchCategories()
            .then(async () => {
                await fetchExercises()
            })
            .catch((error) => {
                console.log(error)
            })
    }, [])

    const handleChange = (event: any, prop: keyof any) => {
        if (event.target.value === '+ Add') {
            setIsWorkoutCategoryDialogOpen(true);
        }
        setValues({ ...values, [prop]: event.target.value });
    };

    const fetchCategories = async () => {
        const categories = await fetchCategoriesRequest(token);
        setDropdownWorkoutCategories(categories);
    }

    const fetchExercises = async () => {
        const list = await fetchExercisesRequest(token);
        setDropdownExerciseOptions(list);
    }

    const handleAddExercise = async (data: Exercise) => {
        const result = await handleAddExerciseRequest(data, exerciseList, token)
        const tempList = exerciseList;
        tempList.push(result);
        setExerciseList(tempList);
        setShowDialog(false);
    }

    const handleExerciseInput = async (event: any, setIndex: number, exerciseIndex: number, field: number) => {
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
        await saveWorkoutRequest(exerciseList, values.workoutName, values.category, token);
    }

    const handleAddCategory = async (category) => {
        await handleAddCategoryRequest(category, token)
        .then(async () => {
            await fetchCategories();
            setIsWorkoutCategoryDialogOpen(false);
            setValues({...values, category: category})
        })
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

    const renderDropdownOptions = (items: Array<string | number>) => {
        return items.map(item => {
            return <MenuItem key={item} value={item}>{item.toString().toUpperCase()}</MenuItem>
        })
    }

    return (
        <Box className={'page-content'}>

            <AddWorkoutCategoryDialog

             handleAddCategory={(category) => handleAddCategory(category)}
             handleClose={() => {
                 setValues({...values, category: dropdownWorkoutCategories[0]})
                 setIsWorkoutCategoryDialogOpen(false)
             }}
             isOpen={isCategoryDialogOpen}
            />

            <Input
                className={'workout-name'}
                placeholder={values.workoutName}
                onChange={(event) => handleChange(event, 'workoutName')}
            />

            <FormControl
                className={'workout-category-dropdown'}
                size={'small'}
            >
                <InputLabel id="category-label">Category</InputLabel>
                <Select
                    labelId="set-label"
                    id="category-dropdown"
                    value={values.category}
                    label="Category"
                    onChange={(event) => handleChange(event, 'category')}
                >
                    { renderDropdownOptions(dropdownWorkoutCategories)}
                </Select>
            </FormControl>

            <AddExerciseDialog
                isOpen={showDialog}
                dropdownExerciseOptions={dropdownExerciseOptions}
                handleAddExercise={(data: any) => handleAddExercise(data)}
                handleClose={() => setShowDialog(false)}/>

            { exerciseList ? renderExercises() : null }

            <Button
                className={'add-exercise-button primary-button-outlined'}
                variant="outlined"
                onClick={() => goToPage('/dashboard')}
            >
                Home
            </Button>

            <Button
                className={'add-exercise-button primary-button'}
                variant="contained"
                onClick={() => saveWorkout()}
            >
                Save
            </Button>

            <Button
                className={'add-exercise-button primary-button'}
                startIcon={<AddIcon />}
                variant="contained"
                onClick={() => setShowDialog(true)}
            >
                Add
            </Button>
        </Box>
    )

}