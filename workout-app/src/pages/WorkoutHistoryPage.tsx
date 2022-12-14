import React, {useEffect, useState} from 'react';
import axios from "axios";
import { useToken } from "../utils/useToken";
import {
    Box, Button, Card, CardContent, CardHeader,
    Container, FormControl, InputLabel, MenuItem, Table, TableBody, TableContainer,
} from "@mui/material";
import {useNavigate} from "react-router-dom";
import {WorkoutHistoryItemComponent} from "../components/WorkoutHistoryItemComponent";
import Select from "@mui/material/Select";
import {getWorkoutHistory} from "../queries";

export const WorkoutHistoryPage = () => {

    const { token } = useToken();
    const navigate = useNavigate();

    const goToPage = (component: string) => {
        navigate(component);
    }

    const [workouts, setWorkouts] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('ALL');
    const [categories, setCategories] = useState(['ALL']);



    const fetchWorkoutHistory = async () => {

        const workouts:any = await getWorkoutHistory(token);
        console.log("WORKOUTS~");
        console.log(workouts);
        setWorkouts(workouts);
        const categories: Array<string> = workouts.map(workout => { return workout.category });
        const uniqueCategories: any = ['ALL', ...new Set(categories)];
        setCategories(uniqueCategories);

    }

    useEffect(() => {
        fetchWorkoutHistory()
            .catch((error) => {
                console.log(error)
            })
    }, []);


    const formatWorkoutItems = () => {
        const filteredWorkouts = workouts.filter((workout: any) => {
            return workout.category === selectedCategory || selectedCategory === 'ALL'
        })

        return filteredWorkouts.map((workout, i) => {

            return (
                <React.Fragment key={i}>
                   <WorkoutHistoryItemComponent workout={workout}/>
                </React.Fragment>
            )
        })
    }

    const renderCategoryOptions = (items: Array<string | number>) => {
        return items.map(item => {
            return <MenuItem key={item} value={item}>{item.toString().toUpperCase()}</MenuItem>
        })
    }

    return (
        <Container>
            <Box className={'content-wrapper'}>

                <Card
                    className={'exercise-card'}
                    raised={true}
                >
                    <CardContent>
                        <FormControl
                            fullWidth
                            size={'small'}
                        >
                            <InputLabel id="category-label">Category</InputLabel>
                            <Select
                                labelId="set-label"
                                id="category-dropdown"
                                value={selectedCategory}
                                label="Category"
                                onChange={(event) => setSelectedCategory(event.target.value)}
                            >
                                { renderCategoryOptions(categories)}
                            </Select>
                        </FormControl>
                    </CardContent>
                </Card>


                { formatWorkoutItems() }
            </Box>
            <Button
                sx={{marginBottom: '1rem', marginTop: '.5rem'}}
                variant="contained"
                onClick={() => goToPage('/dashboard')}
            >
                Home
            </Button>
        </Container>
    )
}