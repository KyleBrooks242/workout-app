require('dotenv').config();
const {
    upsertWorkout,
    getWorkoutCategoriesByUser,
    getExercisesByUser

} = require('./db/dbUtils');


const main = async () => {
    //----------------Fetching necessary data ---------------
    const categoriesResult = await getWorkoutCategoriesByUser(user);
    let categoriesList = [];
    categoriesResult.docs.forEach(item => {
        categoriesList.push(item.category);
    });

    const exercisesResult = await getExercisesByUser(user);
    let exerciseOptions = [];
    exercisesResult.docs.forEach(item => {
        exerciseOptions.push(item.exercise);
    });

    // Number of workouts to insert
    for (let i = 0; i < 25; i++) {

        const workout = JSON.stringify({
            exerciseList : getExerciseList(exerciseOptions),
            workoutName: `Workout Number ${i + 1}`,
            category: categoriesList[randomIntFromInterval(0, categoriesList.length - 1)]

        })
        // console.log(workout);

        await upsertWorkout(user, workout);
    }

}

const user = 'testUser'

// _id: id,
//     value: parsedWorkout.exerciseList,
//     workoutName: parsedWorkout.workoutName,
//     userName: user,
//     date: parsedWorkout.date,
//     category: parsedWorkout.category,
//     docType: 'WORKOUT',
//     createdAt: getDBDateFormat()

// "value": [
//     {
//         "name": "Chest Fly",
//         "sets": 3,
//         "newExercise": "",
//         "index": 0,
//         "values": [
//             {
//                 "weight": "55",
//                 "reps": "6"
//             },
//             {
//                 "weight": "65",
//                 "reps": "8"
//             },
//             {
//                 "weight": "75",
//                 "reps": "10"
//             }
//         ]
//     },

// {
//     workoutName: 'A great workout',
//         exerciseList: [
//     {
//         name: 'Chest Fly',
//         sets: 3,
//         newExercise: '',
//         index: 0,
//         values: [Array]
//     },
//     {
//         name: 'Hammer Curls',
//         sets: 3,
//         newExercise: '',
//         index: 1,
//         values: [Array]
//     }
// ],
//     category: 'Chest'
// }

const randomIntFromInterval = (min, max) => { // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min)
}

const getExerciseList = (exerciseOptions) => {
    let exerciseList = [];
    const numExercises = randomIntFromInterval(4, 7);

    //Generate sets for each exercise...
    for (let i = 0; i < numExercises; i++) {
        //Determine exercise
        const exercise = exerciseOptions[randomIntFromInterval(0, exerciseOptions.length - 1)];
        //Determine number of sets
        const numberOfSets = randomIntFromInterval(1, 8);

        let setList = []
        for(let j = 0; j < numberOfSets; j++) {
            const weight = randomIntFromInterval(35, 250).toString();
            const reps = randomIntFromInterval(2, 8).toString();
            setList.push({
                weight: weight,
                reps: reps
            });
        }
        exerciseList.push({
            name: exercise,
            sets: numberOfSets.toString(),
            values: setList
        })
    }

    return exerciseList;

}



main();