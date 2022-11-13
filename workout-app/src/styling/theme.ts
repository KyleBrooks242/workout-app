import {createTheme, ThemeOptions} from '@mui/material/styles'

const primaryMain = '#ffab40';

const secondaryMain = '#7cb342';

const backgroundPaper = '#424B37';

const backgroundDefault = '#303030';

const textPrimary = '#FEFEFE';
const textSecondary = '#0F0F0F';

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
            // secondary: textSecondary,
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
        // MuiCardHeader : {
        //     styleOverrides: {
        //         title: {
        //             color: textSecondary
        //         }
        //     }
        // }

    }

};

export const darkTheme = createTheme(darkThemeOptions);