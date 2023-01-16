import React, {useEffect} from 'react';
import {Box, Card, CardContent, Container} from "@mui/material";
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';

import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import {useToken} from "../utils/useToken";

interface Props {
    setImage: any
    image: any
}

export const DashboardPage = (props: Props) => {

    const navigate = useNavigate();
    const { token } = useToken();

    const goToPage = (component: string) => {
        navigate(component);
    }

    const fetchProfilePhoto = async () => {
        await axios.get(
            `/api/profile-photo`,
            {
                headers: { 'authorization': `Bearer ${token}`}
            }
        )
            .then((resp : any) => {
                props.setImage(resp.data.image.toString())
            })
            .catch(error => {
                console.error('Error fetching profile photo!');
                console.error(error)
            });
    }

    useEffect(() => {
        if (!props.image) {
            fetchProfilePhoto();
        }
    })

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
