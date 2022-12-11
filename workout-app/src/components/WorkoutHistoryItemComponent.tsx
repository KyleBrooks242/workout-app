import React, {useEffect} from 'react';
import {
    Card,
    CardContent,
    CardHeader,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableRow, useTheme
} from "@mui/material";
import dayjs from "dayjs";

interface Props {
    workout: any
}

const MAX_NAME_LENGTH = 17;

export const WorkoutHistoryItemComponent = (props: Props) => {

    const workout = props.workout;
    const theme: any = useTheme();

    const calculateTotalWeightLifted = () => {
        let total = 0;
        workout.value.forEach(exercise => {
            exercise.values.forEach(set => {
                total += parseInt(set.weight);
            })
        })

        return total;
    }

    const formatExerciseName = (exerciseName) => {
        if (exerciseName.length + 3> MAX_NAME_LENGTH) {
            return `${exerciseName.substring(0, MAX_NAME_LENGTH - 3)}...`
        }
        return exerciseName;
    }

    const formatDate = (date: string) => {
        return dayjs(date).format('MM/DD/YY')
    }

    const formatWorkoutHistory = () => {
        return workout.value.map((exercise: any, i) => {
            return (
                <React.Fragment key={i}>
                    <TableRow
                        key={`${exercise.name}-row-${i}`}
                        className={`table-header-row ${theme.palette.mode === 'light' ? 'light-theme' : 'dark-theme'}`}
                    >
                        <TableCell sx={{width: '20ch'}} align={'left'} aria-label={exercise.name}><b>{formatExerciseName(exercise.name)}</b></TableCell>
                        <TableCell sx={{width: '5ch'}} align={'center'}><b>Weight</b></TableCell>
                        <TableCell sx={{width: '4ch'}} align={'center'}><b>Reps</b></TableCell>
                    </TableRow>
                    {
                        exercise.values.map((set, k) => {
                            return (
                                <TableRow
                                    key={`${set.weight}-${i}${k}`}
                                    className={`table-record-row`}
                                >
                                    <TableCell className={'history-record-cell'} >&ensp; Set {k + 1}</TableCell>
                                    <TableCell className={'history-record-cell'} align={'center'}>{set.weight}</TableCell>
                                    <TableCell className={'history-record-cell'} align={'center'}>{set.reps}</TableCell>
                                </TableRow>
                            )
                        })
                    }
                </React.Fragment>
            )
        })
    }

    return (
        <Card
            className={'exercise-card'}
            raised={true}
        >
            <CardHeader
                className={`exercise-card-header ${theme.palette.mode === 'light' ? 'light-theme' : 'dark-theme'}`}
                title={workout.workoutName}
                subheader={`${workout.category} - ${formatDate(workout.date)}`}
            />
            <CardContent>
                <TableContainer className={'workout-history-item'}>
                    <Table size="small" aria-label="workout history">
                        <TableBody>
                            { formatWorkoutHistory() }
                        </TableBody>
                    </Table>
                </TableContainer>
            </CardContent>
            <CardHeader
                sx={{fontWeight: '800', textAlign: 'end'}}
                subheader={`Total Weight: ${calculateTotalWeightLifted()} lbs`}
            />
        </Card>
    )


}