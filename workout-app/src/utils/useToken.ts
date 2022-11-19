import { useState } from 'react';

export const useToken = () => {

    const getToken = () => {
        const token = localStorage.getItem('token');
        return token ? token : undefined;
    };

    const [token, setToken] = useState(getToken());

    const saveToken = (userToken: any) => {
        localStorage.setItem('token', userToken);
        setToken(userToken);
    };

    const deleteToken = () => {
        localStorage.removeItem('token');
        setToken(getToken());
    }

    return {
        setToken: saveToken,
        token,
        deleteToken
    }
}