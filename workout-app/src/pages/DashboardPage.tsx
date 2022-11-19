import React from 'react';
import {Box, Button, Card, CardContent, CardHeader, CardMedia, Container, Grid, Paper} from "@mui/material";
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import HistoryIcon from '@mui/icons-material/History';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import { useNavigate } from 'react-router-dom';

export const DashboardPage = () => {

    const navigate = useNavigate();

    const goToPage = (component: string) => {
        navigate(component);
    }

    return (
        <Container>
                <Box className={'content-wrapper dashboard-page'}>

                    <Card
                        className={'dashboard-card'}
                        raised={true}
                        onClick={() => goToPage('/new-workout')}
                    >
                        <CardContent className={'dashboard-card-text'}>
                            <FitnessCenterIcon className={'dashboard-card-icon'}/>
                            New Workout
                        </CardContent>
                    </Card>

                    <Card
                        className={'dashboard-card'}
                        raised={true}
                        onClick={() => goToPage('/workout-history')}
                    >
                        <CardContent className={'dashboard-card-text'}>
                            <AutoStoriesIcon className={'dashboard-card-icon'}/>
                            History
                        </CardContent>
                    </Card>

                </Box>
        </Container>
)
}
