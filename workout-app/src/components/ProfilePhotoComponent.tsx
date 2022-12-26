import React from 'react';
import {Card, CardContent, CardHeader} from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Person2RoundedIcon from "@mui/icons-material/Person2Rounded";


interface Props {
    image: string
    uploadImage: any

}

export const ProfilePhotoComponent = (props: Props) => {

    return (
        <Card className={'exercise-card'}>
            <CardHeader className={'exercise-card-header'}/>
            <CardContent className={'exercise-card-content'}>
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
                                <input id="photo-upload" type="file" onChange={(e) => props.uploadImage(e)}/>
                            </Avatar>

                    }
                    <input
                        id="photo-upload"
                        type="file"
                        accept="image/png, image/jpeg"
                        onChange={(e) => props.uploadImage(e)}
                    />
                </label>

            </CardContent>
        </Card>
    )
}