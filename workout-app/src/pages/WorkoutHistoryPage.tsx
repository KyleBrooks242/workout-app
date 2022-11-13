import React, {useEffect, useState} from 'react';
import axios from "axios";
import { useToken } from "../utils/useToken";
import {
    Box,
    Button,
    Container, Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow
} from "@mui/material";
import {useNavigate} from "react-router-dom";
import {WorkoutHistoryItemComponent} from "../components/WorkoutHistoryItemComponent";

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

    const formatWorkoutItems = () => {
        return workouts.map((workout, i) => {
            return (
                <div key={i}>
                   <WorkoutHistoryItemComponent workout={workout}/>
                </div>
            )
        })
    }

    return (
        <Container>
            <Paper>
                <Box className={'page-content'}>
                    { formatWorkoutItems() }
                    <Button
                        className={'add-exercise-button primary-outline-button'}
                        variant="outlined"
                        onClick={() => goToPage('/dashboard')}
                    >
                        Home
                    </Button>
                </Box>
            </Paper>
        </Container>
    )

}