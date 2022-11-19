import { useState } from 'react';

const THEME_KEY = 'isDarkTheme';

export const useCustomThemeHook = () => {

    const getTheme = () => {
        const isDarkTheme = localStorage.getItem(THEME_KEY);
        return isDarkTheme === 'true'
    };

    const [isDarkTheme, setIsDarkTheme] = useState<boolean>(getTheme());

    const saveTheme = (isDarkTheme: boolean) => {
        setIsDarkTheme(isDarkTheme);
        localStorage.setItem(THEME_KEY, isDarkTheme.toString());
    };

    const deleteTheme = () => {
        localStorage.removeItem(THEME_KEY);
        setIsDarkTheme(getTheme());
    }

    return {
        setTheme : saveTheme,
        isDarkTheme,
        deleteTheme
    }
}