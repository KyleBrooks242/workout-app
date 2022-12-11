import React, {useEffect, useState} from 'react';
import {
    Backdrop,
    Box,
    Button,
    Card,
    CardContent,
    CardHeader,
    CircularProgress,
    Container,
    Grid,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableRow
} from "@mui/material";

import { useNavigate } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import Person2RoundedIcon from '@mui/icons-material/Person2Rounded';
import axios from "axios";
import {useToken} from "../utils/useToken";
import {ProfileInfoComponent} from "../components/ProfileInfoComponent";


interface Props {
    image: any
    setImage: any
    deleteImage: any
}

export const ProfilePage = (props: Props) => {

    const navigate = useNavigate();
    const { token } = useToken();

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
    const formatStats = () => {
        return (
            <TableRow
                key={`some-key`}
                className={`table-record-row`}
            >
                <TableCell className={'history-record-cell'} align={'center'}>Data Key</TableCell>
                <TableCell className={'history-record-cell'} align={'center'}>Data Value</TableCell>
            </TableRow>
        )
    }

    return (
        <Container>
            <Box className={'content-wrapper'}>

                <Grid container spacing={2}>
                    <Grid
                        item xs={6}
                    >
                        <label htmlFor="photo-upload" className="photo-upload">
                            {
                                props.image ?
                                    <Avatar
                                        alt="Profile photo"
                                        src={props.image}
                                        sx={{width: '8rem', height: '8rem'}}
                                    >
                                    </Avatar>
                                    :
                                    <Avatar
                                        sx={{ width: '8rem', height: '8rem' }}
                                    >
                                        <Person2RoundedIcon sx={{fontSize: '7.5rem'}} />
                                        <input id="photo-upload" type="file" onChange={(e) => uploadImage(e)}/>
                                    </Avatar>

                            }
                            <input
                                id="photo-upload"
                                type="file"
                                accept="image/png, image/jpeg"
                                onChange={(e) => uploadImage(e)}
                            />
                        </label>
                    </Grid>
                    <Grid item xs={6}>
                        <ProfileInfoComponent/>
                    </Grid>
                    <Grid item xs={12}>
                        <Card>
                            <CardHeader
                                title={'Stats'}
                            />
                            <CardContent>
                                <TableContainer className={'workout-history-item'}>
                                    <Table size="small" aria-label="workout history">
                                        <TableBody>
                                            { formatStats() }
                                        </TableBody>
                                    </Table>
                                </TableContainer>
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