import React, {useEffect, useState} from 'react';
import axios from "axios";
import { useToken } from "../utils/useToken";
import {
    Box, Button,
    Container, FormControl, InputLabel, MenuItem,
} from "@mui/material";
import {useNavigate} from "react-router-dom";
import {WorkoutHistoryItemComponent} from "../components/WorkoutHistoryItemComponent";
import Select from "@mui/material/Select";

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
        console.log("Fetching workout history...");
        await axios.get(
            `/workout`,
            {
                headers: { 'authorization': `Bearer ${token}`}
            }
        )
            .then((resp : any) => {
                setWorkouts(resp.data.docs);
                const categories: Array<string> = resp.data.docs.map(workout => { return workout.category });
                const uniqueCategories: any = ['ALL', ...new Set(categories)];
                setCategories(uniqueCategories);

            })
            .catch(error => {
                console.error('Error fetching workout history!');
                console.error(error)
            });
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
                <FormControl
                    className={'workout-category-select'}
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