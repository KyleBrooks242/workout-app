import { useState } from 'react';

export const useToken = () => {
    const getToken = () => {
        const tokenString: any = localStorage.getItem('token');
        const userToken = tokenString;

        return userToken;
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
        deleteToken: deleteToken
    }
}