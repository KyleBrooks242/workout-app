import React from 'react';
import { Button,  Container } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2";

export const DashboardComponent = () => {
    return (
        <Container>
            <Grid2>
                <Grid2>
                    <Button
                        sx={{marginTop: '2rem'}}
                        variant='contained'
                        size='large'
                        // onClick={() => goToNewWorkoutPage}
                    >New Workout
                    </Button>

                </Grid2>
                <Grid2>
                    <Button
                        sx={{marginTop: '2rem'}}
                        variant={'contained'}
                        size={'large'}
                        // onClick={() => goToNewWorkoutPage}
                    >History
                    </Button>
                </Grid2>
            </Grid2>


        </Container>
)
}
