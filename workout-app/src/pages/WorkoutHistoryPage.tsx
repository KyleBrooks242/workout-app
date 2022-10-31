import React, {useEffect, useState} from 'react';
import axios from "axios";
import { useToken } from "../utils/useToken";
import {
    Box,
    Button,
    Divider,
    Grid,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow
} from "@mui/material";
import {useNavigate} from "react-router-dom";

export const WorkoutHistoryPage = () => {

    const { token } = useToken();
    const navigate = useNavigate();

    const goToPage = (component: string) => {
        navigate(component);
    }

    const [workouts, setWorkouts] = useState([]);


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
    }, [])

    const formatWorkoutHistory = () => {
        const workoutList : any = [];
        workouts.map((workout: any, i) => {
            const parsedWorkout = JSON.parse(workout.value);
            workoutList.push(
                <TableHead key={`${i}-header`}>
                    <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell/>
                        <TableCell/>
                        <TableCell align={'right'}><b>{workout.date}</b></TableCell>
                    </TableRow>
                </TableHead>
            )

            parsedWorkout.map((exercise: any, j) => {
                console.log("EXERCISE");
                console.log(exercise);

                workoutList.push(
                    <TableBody>
                        <TableRow>
                            <TableCell>{exercise.name}</TableCell>
                            <TableCell/>
                            <TableCell>Weight</TableCell>
                            <TableCell>Reps</TableCell>
                        </TableRow>
                        {
                            exercise.values.map((set, index) => {
                                return (
                                    <TableRow>
                                        <TableCell align={'right'}>Set {index + 1}</TableCell>
                                        <TableCell/>
                                        <TableCell>{set.weight}</TableCell>
                                        <TableCell>{set.reps}</TableCell>
                                    </TableRow>
                                )
                            })
                        }

                    </TableBody>
                )
            })
        })

        return workoutList;
    }

    // console.table(workouts);

    return (
        <Box className={'new-exercise-page'}>
            <h2>History</h2>
            <Divider />
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 375 }} size="small" aria-label="workout history">
                { formatWorkoutHistory() }
                </Table>
            </TableContainer>
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