import axios from "axios";

export const getWorkoutHistory = async (token: string = '') => {
    const resp = await axios.get(
        `/workout`,
        {
            headers: { 'authorization': `Bearer ${token}`}
        }
    )
    return (resp.data.docs);

}