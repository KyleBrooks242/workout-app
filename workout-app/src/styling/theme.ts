import {createTheme, ThemeOptions} from '@mui/material/styles'

// const primaryMain = '#FFAB40';
const primaryMain= '#9CCC65';
const secondaryMain = '#9CCC65';

const backgroundPaper = '#424B37';
const backgroundDefault = '#303030';

const textPrimary = '#FEFEFE';

const darkThemeOptions: ThemeOptions = {
    palette: {
        mode: 'dark',
        primary: {
            main: primaryMain,
        },
        secondary: {
            main: secondaryMain,
        },
        background: {
            paper: backgroundPaper,
            default: backgroundDefault,
        },
        text: {
            primary: textPrimary,
        },
    },
    //Use the following pattern to manually override components that do not conform to the theme
    components: {
        MuiFormControlLabel : {
            styleOverrides: {
                label: {
                    color: textPrimary,
                },
            }
        },

    }

};

export const darkTheme = createTheme(darkThemeOptions);