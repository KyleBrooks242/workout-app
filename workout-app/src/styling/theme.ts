import {createTheme, ThemeOptions} from '@mui/material/styles'

//TODO KEEP OIRGINAL DARK THEME
// // const primaryMain = '#ffab40';
// const primaryMain = '#DC965A';
//
// // const secondaryMain = '#7cb342';
// const secondaryMain= '#BBB891';
//
// const backgroundPaper = '#424B37';
//
// const backgroundDefault = '#303030';
//
// const textPrimary = '#FEFEFE';
// const textSecondary = '#0F0F0F';

// const primaryMain = '#DBC545';
const primaryMain = '#759FBC';

const secondaryMain = '#759FBC';
// const secondaryMain= '#DBC545';

const backgroundPaper = '#3A4C47';
// const backgroundPaper = '#E9E4DA'

const backgroundDefault = '#B4C086';
// const backgroundDefault = '#E9E4DA';

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