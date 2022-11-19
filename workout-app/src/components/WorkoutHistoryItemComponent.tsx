import React from 'react';
import {
    Card,
    CardContent,
    CardHeader,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableRow
} from "@mui/material";

interface Props {
    workout: any
}

const MAX_NAME_LENGTH = 14;

export const WorkoutHistoryItemComponent = (props: Props) => {

    const workout = props.workout

    const formatExerciseName = (exerciseName) => {
        if (exerciseName.length + 3> MAX_NAME_LENGTH) {
            return `${exerciseName.substring(0, MAX_NAME_LENGTH - 3)}...`
        }
        return exerciseName;
    }

    const formatWorkoutHistory = () => {
        return workout.value.map((exercise: any, i) => {
            return (
                <TableBody key={i}>
                    <TableRow
                        key={`${exercise.name}-row-${i}`}
                        className={'table-header-row-2'}
                    >
                        <TableCell sx={{width: '14ch'}} align={'left'} aria-label={exercise.name}><b>{formatExerciseName(exercise.name)}</b></TableCell>
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
                                    <TableCell >&ensp; Set {k + 1}</TableCell>
                                    <TableCell align={'center'}>{set.weight}</TableCell>
                                    <TableCell align={'center'}>{set.reps}</TableCell>
                                </TableRow>
                            )
                        })
                    }
                </TableBody>
            )
        })
    }

    return (
        <Card className={'exercise-card'}>
            <CardHeader
                title={workout.workoutName}
                subheader={`${workout.category}`}
            />
            <CardContent>
                <TableContainer className={'workout-history-item'}>
                    <Table size="small" aria-label="workout history">
                        { formatWorkoutHistory() }
                    </Table>
                </TableContainer>
            </CardContent>
        </Card>
    )


}