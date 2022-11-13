import React from 'react';
import {Box, Card, CardContent, CardHeader, CardMedia, Container, Paper} from "@mui/material";
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import HistoryIcon from '@mui/icons-material/History';
import { useNavigate } from 'react-router-dom';

export const DashboardPage = () => {

    const navigate = useNavigate();

    const goToPage = (component: string) => {
        navigate(component);
    }

    return (
        <Container>
            <Paper>
                <Box className={'content-wrapper dashboard-page'}>
                    <Card
                        className={'dashboard-card'}
                        variant={'outlined'}
                        onClick={() => goToPage('/new-workout')}
                    >
                        <CardHeader
                            title={'New'}
                        />
                        <CardContent>
                            <FitnessCenterIcon fontSize={'large'}/>
                        </CardContent>
                    </Card>

                    <Card
                        className={'dashboard-card'}
                        variant={'outlined'}
                        onClick={() => goToPage('/workout-history')}
                    >
                        <CardHeader
                            title={'History'}
                        />

                        <CardContent>
                            <HistoryIcon fontSize={'large'}/>
                        </CardContent>
                    </Card>
                    {/*<Button*/}
                    {/*    className={'dashboard-button'}*/}
                    {/*    // variant='outlined'*/}
                    {/*    onClick={() => goToPage('/new-workout')}*/}
                    {/*>New Workout*/}
                    {/*</Button>*/}
                    {/*/!* TODO Add something to allow for an existing workout template*!/*/}
                    {/*<Button*/}
                    {/*    className={'dashboard-button'}*/}
                    {/*    // variant={'outlined'}*/}
                    {/*    onClick={() => goToPage('/workout-history')}*/}
                    {/*>History*/}
                    {/*</Button>*/}
                </Box>
            </Paper>
        </Container>
)
}
