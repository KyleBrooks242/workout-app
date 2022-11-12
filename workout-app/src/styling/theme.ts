import {createTheme, ThemeOptions} from '@mui/material/styles'

const darkThemeOptions: ThemeOptions = {
    palette: {
        mode: 'dark',
        primary: {
            main: '#ffab40',
        },
        secondary: {
            main: '#9ccc65',
        },
        background: {
            paper: '#424b37',
            default: '#303030',
        },
        text: {
            primary: '#fefefe',
        },
    },
    //Use the following pattern to manually override components that do not conform to the theme
    components: {
        MuiFormControlLabel : {
            styleOverrides: {
                label: {
                    color: '#fefefe',
                },
            }
        }
    }

};

export const darkTheme = createTheme(darkThemeOptions);