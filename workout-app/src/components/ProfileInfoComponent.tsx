import React, {useState} from 'react';
import {Card, CardContent, CardHeader, OutlinedInput} from "@mui/material";
import { EditableComponent } from "./EditableComponent";



export const ProfileInfoComponent = () => {

    const [age, setAge] = useState('20');
    const [weight, setWeight] = useState('150');
    const [sex, setSex] = useState('');


    return (
        <Card className={'exercise-card'}>
            <CardHeader
                className={'exercise-card-header'}
                title={`Kyle's Info`}
            />

            <CardContent className={'exercise-card-content'}>
                <EditableComponent text={age} type={'input'} placeholder={'Age'}>
                    <OutlinedInput
                        sx={{ m: .5, width: '9ch' }}
                        size='small'
                        type='string'
                        autoComplete={'false'}
                        onChange={(event) => setAge(event.target.value)}
                    />
                </EditableComponent>
                <EditableComponent text={weight} type={'input'} placeholder={'Weight'}>
                    <OutlinedInput
                        sx={{ m: .5, width: '9ch' }}
                        size='small'
                        type='string'
                        placeholder="Weight"
                        autoComplete={'false'}
                        onChange={(event) => setWeight(event.target.value)}
                    />
                </EditableComponent>
                <EditableComponent text={sex} type={'input'} placeholder={'Sex'}>
                    <OutlinedInput
                        sx={{ m: .5, width: '9ch' }}
                        size='small'
                        type='string'
                        placeholder="Sex"
                        autoComplete={'false'}
                        onChange={(event) => setSex(event.target.value)}
                    />
                </EditableComponent>
            </CardContent>
        </Card>
    )
}