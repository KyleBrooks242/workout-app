import React from 'react';
import {Box, Divider, Grid, OutlinedInput} from "@mui/material";
import {Exercise} from "../pages/NewWorkoutPage";

const SET_MAP : any = {
    1: 'One',
    2: 'Two',
    3: 'Three',
    4: 'Four',
    5: 'Five',
    6: 'Six',
    7: 'Seven',
    8: 'Eight',
    9: 'Nine',
    10: 'Ten'

}

interface Props {
    exercise: Exercise,
    handleInput: any,
}

export const ExerciseComponent = (props: Props) => {
    const exercise = props.exercise

    const renderSets = (sets: number):any => {
        const setList: any = [];
        for (let i = 0; i < sets; i++) {
            setList.push(
                <div key={i}>
                    <Grid>
                        <h4 className={'set-title'}>Set {SET_MAP[i + 1]}</h4>
                        <OutlinedInput
                            sx={{ m: .5, width: '9ch' }}
                            size='small'
                            type='number'
                            placeholder="Weight"
                            autoComplete={'false'}
                            onChange={(event) => props.handleInput(event, i, exercise.index, 0)}
                        />
                        <OutlinedInput
                            sx={{ m: .5, width: '8ch' }}
                            size='small'
                            type='number'
                            placeholder="Reps"
                            autoComplete={'false'}
                            onChange={(event) => props.handleInput(event, i, exercise.index, 1)}
                        />
                    </Grid>
                </div>
            )
        }

        return setList
    }

    return (
        <Box>
            <Grid className={`exercise-grid`}>
                <h2 className={'exercise-title'}>{ exercise.name }</h2>
                { renderSets(exercise.sets) }
            </Grid>
            <Divider variant="middle" />
        </Box>
    )
}