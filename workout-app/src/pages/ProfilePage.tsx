import React, {useEffect, useState} from 'react';
import {
    Box,
    Button,
    Container,
    Grid, Paper,
} from "@mui/material";

import { useNavigate } from "react-router-dom";
import axios from "axios";
import {useToken} from "../utils/useToken";
import {ProfileInfoComponent} from "../components/ProfileInfoComponent";
import {getWorkoutHistory} from "../queries";
import {ProfilePhotoComponent} from "../components/ProfilePhotoComponent";
import {ProfileStatsComponent} from "../components/ProfileStatsComponent";
import {Workout} from "../utils/interfaces";


interface Props {
    image: any
    setImage: any
    deleteImage: any
}

export const ProfilePage = (props: Props) => {

    const navigate = useNavigate();
    const { token } = useToken();
    const [workouts, setWorkouts] = useState<Array<any>>([]);
    const [categories, setCategories] = useState<Array<any>>([]);
    const [categoryCount, setCategoryCount] = useState<any>({});

    const goToPage = (component: string) => {
        navigate(component);
    }

    const saveProfileImageToDB = async (image: any) => {
        await axios.post(
            `/profile-photo`,
            {
                data: image.toString()
            },
            {
                headers: { 'authorization': `Bearer ${token}`}
            }
        )
            .then(() => {
                console.log("Saved profile photo!");
            })
            .catch(error => {
                console.error('Error fetching profile photo!');
                console.error(error)
            });
    }

    const uploadImage = async (e: any ) =>{
        e.preventDefault();
        const reader = new FileReader();
        const file = e.target.files[0];
        reader.onloadend = async () => {
            await saveProfileImageToDB(reader.result);
            props.setImage(reader.result);
        }
        reader.readAsDataURL(file);
    }

    const fetchWorkoutHistory = async () => {
        const workouts = await getWorkoutHistory(token);
        const categories: Array<string> = workouts.map(workout => { return workout.category });
        let categoryCount: any = {};
        workouts.forEach((workout: Workout) => {
            categoryCount[workout.category]
                ? categoryCount[workout.category] += 1
                : categoryCount[workout.category] = 1;
        });
        const uniqueCategories: any = [...new Set(categories)];
        setWorkouts(workouts)
        setCategories(Array.from(uniqueCategories));
        setCategoryCount(categoryCount);


    }

    useEffect(() => {
        fetchWorkoutHistory()
    }, [])

    return (
        <Container>
            <Box className={'content-wrapper'}>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <ProfilePhotoComponent
                            uploadImage={uploadImage}
                            image={props.image}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <ProfileInfoComponent/>
                    </Grid>
                    <Grid item xs={12}>
                        <ProfileStatsComponent
                            categoryCount={categoryCount}
                            categories={categories}
                            workouts={workouts}
                        />
                    </Grid>
                </Grid>
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