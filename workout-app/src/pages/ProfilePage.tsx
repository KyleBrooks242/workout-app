import React, {useEffect, useState} from 'react';
import {
    Backdrop,
    Box,
    Button,
    Card,
    CardContent,
    CardHeader,
    CardMedia, CircularProgress,
    Container,
    FormControl,
    Grid,
    InputLabel
} from "@mui/material";
import Select from "@mui/material/Select";
import { useNavigate } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import Person2RoundedIcon from '@mui/icons-material/Person2Rounded';
import axios from "axios";
import {useToken} from "../utils/useToken";
import {useProfileImage} from "../utils/useProfileImage";

export const ProfilePage = () => {

    const navigate = useNavigate();
    const { token } = useToken();
    const { image, setImage, deleteImage } = useProfileImage();
    const [isLoaded, setIsLoaded] = useState<boolean>(false);

    const goToPage = (component: string) => {
        navigate(component);
    }

    const fetchProfilePhoto = async () => {
        await axios.get(
            `/profile-photo`,
            {
                headers: { 'authorization': `Bearer ${token}`}
            }
        )
            .then((resp : any) => {
                setImage(resp.data.image.toString())
            })
            .catch(error => {
                console.error('Error fetching profile photo!');
                console.error(error)
            });
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

    useEffect(() => {
        try {
            if (!image) fetchProfilePhoto().then(() => setIsLoaded(true))
            else setIsLoaded(true);
        }
        catch (error) {
            console.error(error)
        }
    }, []);

    const uploadImage = async (e: any ) =>{
        e.preventDefault();
        const reader = new FileReader();
        const file = e.target.files[0];
        reader.onloadend = async () => {
            await saveProfileImageToDB(reader.result);
            setImage(reader.result);
        }
        reader.readAsDataURL(file);
    }

    return (
        <Container>
            <Box className={'content-wrapper'}>

                <Backdrop
                    open={!isLoaded}
                >
                    <CircularProgress color="inherit" />
                </Backdrop>

                <Grid container spacing={2}>
                    {
                        image ?

                        <Grid
                            item xs={6}
                        >
                            <label htmlFor="photo-upload" className="photo-upload">
                                <Avatar
                                    alt="Profile photo"
                                    src={image}
                                    sx={{ width: '8rem', height: '8rem' }}
                                >
                                </Avatar>
                                <input id="photo-upload" type="file" onChange={(e) => uploadImage(e)}/>
                            </label>
                        </Grid>

                            :
                        <Grid
                            item xs={6}
                        >
                            <label htmlFor="photo-upload" className="photo-upload">
                                <Avatar
                                    sx={{ width: '8rem', height: '8rem' }}
                                >
                                    <Person2RoundedIcon sx={{fontSize: '7.5rem'}} />
                                    <input id="photo-upload" type="file" onChange={(e) => uploadImage(e)}/>
                                </Avatar>
                            </label>

                        </Grid>
                    }

                    <Grid item xs={6}>
                        <Card>
                            <CardContent>
                                I am another card
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12}>
                        <Card>
                            <CardHeader
                                title={'Stats'}
                            />
                            <CardContent>

                            </CardContent>
                        </Card>
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