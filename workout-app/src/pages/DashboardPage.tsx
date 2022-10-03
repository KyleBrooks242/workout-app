import React from 'react';
import {Box, Button, Container} from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2";
import { useNavigate } from 'react-router-dom';

export const DashboardPage = () => {

    const navigate = useNavigate();

    const goToPage = (component: string) => {
        navigate(component);
    }

    return (
        <Container>
            <Box className={'dashboard-wrapper'}>
                <Grid2>
                    <Grid2>
                        <Button
                            className={'dashboard-button'}
                            variant='contained'
                            size='large'
                            onClick={() => goToPage('/new-workout')}
                        >New Workout
                        </Button>

                    </Grid2>
                    <Grid2>
                        <Button
                            className={'dashboard-button'}
                            variant={'contained'}
                            size={'large'}
                            onClick={() => goToPage('/workout-history')}
                        >History
                        </Button>
                    </Grid2>
                </Grid2>
            </Box>
        </Container>
)
}
