import {createTheme, ThemeOptions} from '@mui/material/styles'

const primaryMainLight = '#7dbae5';
// const primaryMainLight = '#004170';

const secondaryMainLight = '#759FBC';

const backgroundPaperLight = '#7F8B93';
// const backgroundPaperLight = '#7dbae5'

const backgroundDefaultLight = '#FEFEFE';

const textPrimaryLight = '#FEFEFE';
const textSecondaryLight = '#FEFEFE';

const lightThemeOptions: ThemeOptions = {
    palette: {
        mode: 'light',
        primary: {
            main: primaryMainLight,
        },
        secondary: {
            main: secondaryMainLight,
        },
        background: {
            paper: backgroundPaperLight,
            default: backgroundDefaultLight,
        },
        text: {
            primary: textPrimaryLight,
            secondary: textSecondaryLight,
        },
    },
    //Use the following pattern to manually override components that do not conform to the theme
    components: {
        MuiFormControlLabel : {
            styleOverrides: {
                label: {
                    color: textPrimaryLight,
                },
            }
        },
    }
};


const primaryMainDark = '#DBC545';

const secondaryMainDark = '#759FBC';

const backgroundPaperDark = '#3A4C47';

const backgroundDefaultDark = '#424B37';

const textPrimaryDark = '#FEFEFE';
const textSecondaryDark = '#0F0F0F';

const darkThemeOptions: ThemeOptions = {
    palette: {
        mode: 'dark',
        primary: {
            main: primaryMainDark,
        },
        secondary: {
            main: secondaryMainDark,
        },
        background: {
            paper: backgroundPaperDark,
            default: backgroundDefaultDark,
        },
        text: {
            primary: textPrimaryDark,
            // secondary: textSecondaryDark,
        },
    },
    //Use the following pattern to manually override components that do not conform to the theme
    components: {
        MuiFormControlLabel : {
            styleOverrides: {
                label: {
                    color: textPrimaryDark,
                },
            }
        },
    }
};

export const lightTheme = createTheme(lightThemeOptions);

export const darkTheme = createTheme(darkThemeOptions);


