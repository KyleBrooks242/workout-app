import React, {useEffect, useState} from 'react';
import axios from "axios";
import { useToken } from "../utils/useToken";
import {
    Box,
    Button,
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
    }, []);

    const formatWorkoutName = (workoutName) => {
        if (workoutName.length > 16) {
            return `${workoutName.substring(0, 16)}...`
        }
        return workoutName;
    }

    const formatExerciseName = (exerciseName) => {
        if (exerciseName.length > 16) {
            return `${exerciseName.substring(0, 16)}...`
        }
        return exerciseName;
    }

    const formatWorkoutHistory = () => {
        const workoutList : any = [];
        workouts.map((workout: any, i) => {
            workoutList.push(
                <TableHead key={`${workout.workoutName}-${i}-header`}>
                    <TableRow
                        key={`${workout.workoutName}-${i}-row`}
                        className={'table-header-row'}
                    >
                        <TableCell><b>{formatWorkoutName(workout.workoutName)}</b></TableCell>
                        <TableCell><b>{workout.category}</b></TableCell>
                        <TableCell align={'right'}><b>{workout.date}</b></TableCell>
                    </TableRow>
                </TableHead>
            )

            workout.value.map((exercise: any, j) => {
                return workoutList.push(
                    <TableBody>
                        <TableRow
                            key={`${exercise.name}-${i}${j}-row`}
                            className={'table-header-row-2'}
                        >
                            <TableCell align={'center'} aria-label={exercise.name}><b>{formatExerciseName(exercise.name)}</b></TableCell>
                            <TableCell align={'right'}><b>Weight</b></TableCell>
                            <TableCell align={'right'}><b>Reps</b></TableCell>
                        </TableRow>
                        {
                            exercise.values.map((set, k) => {
                                const color = k % 2;
                                if (k === exercise.values.length - 1) {
                                    return (
                                        <React.Fragment>
                                            <TableRow
                                                key={`${set.weight}-${i}${j}${k}`}
                                                className={`table-record-row-${color}`}
                                            >
                                                <TableCell align={'center'}>Set {k + 1}</TableCell>
                                                <TableCell align={'right'}>{set.weight}</TableCell>
                                                <TableCell align={'right'}>{set.reps}</TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell/>
                                                <TableCell/>
                                                <TableCell/>
                                            </TableRow>
                                        </React.Fragment>
                                    )
                                }
                                else {
                                    return (
                                        <TableRow
                                            key={`${set.weight}-${i}${j}${k}`}
                                            className={`table-record-row-${color}`}
                                        >
                                            <TableCell align={'center'}>Set {k + 1}</TableCell>
                                            <TableCell align={'right'}>{set.weight}</TableCell>
                                            <TableCell align={'right'}>{set.reps}</TableCell>
                                        </TableRow>
                                    )
                                }
                            })
                        }

                    </TableBody>
                )
            })
        })

        return workoutList;
    }

    return (
        <Box className={'page-content'}>
            <TableContainer >
                <Table sx={{ minWidth: 375 }} size="small" aria-label="workout history">
                { formatWorkoutHistory() }
                </Table>
            </TableContainer>
            <Button
                className={'add-exercise-button primary-outline-button'}
                variant="outlined"
                onClick={() => goToPage('/dashboard')}
            >
                Home
            </Button>
        </Box>
    )

}