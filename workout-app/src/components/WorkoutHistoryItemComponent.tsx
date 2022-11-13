import React from 'react';
import {
    Card,
    CardContent,
    CardHeader,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow
} from "@mui/material";

interface Props {
    workout: any
}

export const WorkoutHistoryItemComponent = (props: Props) => {

    const workout = props.workout

    // const formatWorkoutName = (workoutName) => {
    //     if (workoutName.length > 16) {
    //         return `${workoutName.substring(0, 16)}...`
    //     }
    //     return workoutName;
    // }

    const formatExerciseName = (exerciseName) => {
        if (exerciseName.length > 16) {
            return `${exerciseName.substring(0, 16)}...`
        }
        return exerciseName;
    }

    const formatWorkoutHistory = () => {
        return workout.value.map((exercise: any, i) => {
            return (
                <TableContainer className={'workout-history-item'}>
                    <Table size="small" aria-label="workout history">
                        <TableBody>
                            <TableRow
                                key={`${exercise.name}-row-${i}`}
                                className={'table-header-row-2'}
                            >
                                <TableCell align={'center'} aria-label={exercise.name}><b>{formatExerciseName(exercise.name)}</b></TableCell>
                                <TableCell align={'right'}><b>Weight</b></TableCell>
                                <TableCell align={'right'}><b>Reps</b></TableCell>
                            </TableRow>
                            {
                                exercise.values.map((set, k) => {
                                    const color = k % 2;
                                    return (
                                        <React.Fragment>
                                            <TableRow
                                                key={`${set.weight}-${i}${k}`}
                                                className={`table-record-row-${color}`}
                                            >
                                                <TableCell align={'center'}>Set {k + 1}</TableCell>
                                                <TableCell align={'right'}>{set.weight}</TableCell>
                                                <TableCell align={'right'}>{set.reps}</TableCell>
                                            </TableRow>
                                        </React.Fragment>
                                    )
                                })
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
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
                        {/*<TableHead key={`${workout.workoutName}-header`}>*/}
                        {/*    <TableRow*/}
                        {/*        key={`${workout.workoutName}-row`}*/}
                        {/*        className={'table-header-row'}*/}
                        {/*    >*/}
                        {/*        <TableCell><b>{formatWorkoutName(workout.workoutName)}</b></TableCell>*/}
                        {/*        <TableCell align={'center'}><b>{workout.category}</b></TableCell>*/}
                        {/*        <TableCell align={'right'}><b>{workout.date}</b></TableCell>*/}
                        {/*    </TableRow>*/}
                        {/*</TableHead>*/}
                        { formatWorkoutHistory() }
                    </Table>
                </TableContainer>
            </CardContent>
        </Card>
    )


}