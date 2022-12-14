import React, {useEffect, useState} from 'react';
import {
    Box,
    Button,
    Card, CardContent,
    Container,
    FormControl,
    Grid,
    Input,
    InputLabel,
    MenuItem,
    Paper,
} from "@mui/material";
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
    fetchExerciseOptionsRequest,
    handleAddExerciseOptionRequest,
    handleAddCategoryRequest
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
                await fetchExerciseOptions();
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

    const fetchExerciseOptions = async () => {
        const list = await fetchExerciseOptionsRequest(token);
        setDropdownExerciseOptions(list);
    }

    const handleAddExerciseOption = async (data: Exercise) => {
        const result = await handleAddExerciseOptionRequest(data, exerciseList, token)
        const tempList = exerciseList;
        tempList.push(result);
        setExerciseList(tempList);
        setShowDialog(false);
        await fetchExerciseOptions();
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
                <div key={index}>
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
        <Container>
            <Box className={'content-wrapper new-workout-page'}>

                {/*-----------------------Workout Category Dialog------------------------------*/}
                <AddWorkoutCategoryDialog

                 handleAddCategory={(category) => handleAddCategory(category)}
                 handleClose={() => {
                     setValues({...values, category: dropdownWorkoutCategories[0]})
                     setIsWorkoutCategoryDialogOpen(false)
                 }}
                 isOpen={isCategoryDialogOpen}
                />


                {/*-----------------------Add Exercise Dialog------------------------------*/}
                <AddExerciseDialog
                    isOpen={showDialog}
                    dropdownExerciseOptions={dropdownExerciseOptions}
                    handleAddExercise={(data: any) => handleAddExerciseOption(data)}
                    handleClose={() => setShowDialog(false)}/>


                {/*-----------------------Main Inputs------------------------------*/}
                <Grid>
                    <Card
                        raised={true}
                    >
                        <CardContent>
                            <Input
                                className={'workout-title'}
                                placeholder={'Workout Title...'}
                                onChange={(event) => handleChange(event, 'workoutName')}
                            />
                            <FormControl
                                className={'workout-category-select'}
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
                        </CardContent>
                    </Card>
                    <Grid>
                        {/*-----------------------Exercises------------------------------*/}
                        { exerciseList ? renderExercises() : null }
                    </Grid>
                    <Grid>
                        {/*-----------------------Bottom Buttons------------------------------*/}
                        <Button
                            variant="outlined"
                            color={'secondary'}
                            onClick={() => goToPage('/dashboard')}
                        >
                            Home
                        </Button>

                        <Button
                            className={'add-exercise-button primary-button'}
                            variant="contained"
                            color={'secondary'}
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

                    </Grid>
                </Grid>
            </Box>
        </Container>
    )

}