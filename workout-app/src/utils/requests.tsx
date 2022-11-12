import axios from "axios";
import { Exercise } from "../pages/NewWorkoutPage";


//Is there a better way to do this, that does not rely on user hitting a button?
//TODO if the user clicks away from this screen, we should save off data
export const saveWorkoutRequest = async (exerciseList:Array<Exercise>, workoutName: string, category: string, token) => {

    const data = {
        workoutName: workoutName,
        exerciseList: exerciseList,
        category: category
    }
    await axios.put(
        '/workout',
        {
            data: JSON.stringify(data)
        },
        {
            headers: { 'authorization': `Bearer ${token}`}
        }
    )
        .then(async () => {
            console.log(`Successfully saved workout!`);
        })
        .catch(error => {
            console.error('Error saving workout!');
            console.error(error)
        });
}

export const fetchCategoriesRequest = async (token) => {
    console.log('Fetching workout categories...')
    let list: Array<string> = [];
    await axios.get(
        `/workout-category`,
        {
            headers: { 'authorization': `Bearer ${token}`}
        }
    )
        .then((resp : any) => {
            console.log(resp);
            list.push('None');
            resp.data.docs.map((doc : any) => { list.push(doc.category) });
            list.push('+ Add');
        })
        .catch(error => {
            console.error('Error fetching workout categories!');
            console.error(error)
        });
    return list;
}

export const fetchExercisesRequest = async (token) => {
    console.log("Fetching exercise options...");
    let list: Array<string> = []
    await axios.get(
        `/exercise-option`,
        {
            headers: { 'authorization': `Bearer ${token}`}
        }
    )
        .then((resp : any) => {
            list = resp.data.docs.map((doc : any) => { return doc.exercise })
            list.push('+ Add');

        })
        .catch(error => {
            console.error('Error fetching exercise options!');
            console.error(error)
        });
    return list;
}

export const handleAddExerciseRequest = async (data: Exercise, exerciseList: Array<Exercise>, token) => {

    if (data.name === '+ Add' && data.newExercise && data.newExercise !== '') {
        await axios.post(
            '/exercise',
            {
                data: data
            },
            {
                headers: { 'authorization': `Bearer ${token}`}
            }
        )
            .then(async () => {
                console.log(`Successfully added exercise!`);
                // await fetchExercises();

            })
            .catch(error => {
                console.error('Error adding exercise!');
                console.error(error)
            });
        data = {
            name: data.newExercise,
            sets: data.sets,
            index: exerciseList.length,
            values: []
        }
        //Array(data.sets).fill({weight: '', reps: ''}) results in attempts to update a single index with updating
        //the entire array
        for (let i = 0; i < data.sets; i++) {
            data.values.push({
                weight: '',
                reps: ''
            })
        }
    }
    else {
        data.index = exerciseList.length;
        //Array(data.sets).fill({weight: '', reps: ''}) results in attempts to update a single index with updating
        //the entire array
        data.values = [];
        for (let i = 0; i < data.sets; i++) {
            data.values.push({
                weight: '',
                reps: ''
            })
        }
    }

    return data;
}

export const handleAddCategoryRequest = async (category, token) => {
    console.log(`Adding category ${category}`);

    await axios.post(
        '/workout-category',
        {
            data: category
        },
        {
            headers: { 'authorization': `Bearer ${token}`}
        }
    )
}
