import React from 'react'

interface Set {
    weight: number
    reps: number
}

interface ExerciseRecord {
    _id: `userName_exercise_date??`
    sets: number,
    value: Array<Set>
}

interface WorkoutRecord {
    _id: `userName_date_workoutTitle??`
    numberOfExercises: number
    value: Array<ExerciseRecord>
}