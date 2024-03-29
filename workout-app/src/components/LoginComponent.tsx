import React, {useState} from 'react';
import Input from '@mui/material/Input';
import {
    Button,
    Box,
    Checkbox,
    FormControl,
    FormControlLabel,
    IconButton,
    InputAdornment,
    InputLabel, Paper, Container
} from "@mui/material";
import {
    AccountCircle,
    VisibilityOff,
    Visibility,
    EmailRounded
} from "@mui/icons-material";
import axios from "axios";
import {clearValidationErrors, validateInput, ValidDataResponse} from "../utils/helpers";
import {AlertComponent} from "./AlertComponent";
import {useNavigate} from "react-router-dom";

interface State {
    username: string
    password: string
    email: string
    firstName: string
    lastName: string
    showPassword: boolean
    createAccount: boolean
    errorMessage: string
}

interface ErrorState {
    username: boolean
    password: boolean
    email: boolean
    firstName: boolean
    lastName: boolean
    hasError: boolean
}

interface Props {
    setToken: any;
}

export const LoginComponent = (props: Props) => {

    const [values, setValues] = useState<State>({
        username: '',
        password: '',
        email: '',
        firstName: '',
        lastName: '',
        showPassword: false,
        createAccount: false,
        errorMessage: ''
    });

    const [errors, setErrors] = useState<ErrorState>({
        username: false,
        password: false,
        firstName: false,
        lastName: false,
        email: false,
        hasError: false
    })

    const [showAlert, setShowAlert] = useState(false);

    const handleClickShowPassword = () => {
        setValues({
            ...values,
            showPassword: !values.showPassword,
        });
    };

    const handleClickCreateAccountCheckbox = () => {
        setValues({
            ...values,
            createAccount: !values.createAccount,
        });
    };

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    const handleChange =
        (prop: keyof State) => (event: React.ChangeEvent<HTMLInputElement>) => {
            setValues({ ...values, [prop]: event.target.value });
    };

    const handleLoginOrCreateAccountClicked = async () => {

        setErrors(clearValidationErrors());

        const data = {
            username: values.username,
            password: values.password,
            email: values.email,
            firstName: values.firstName,
            lastName: values.lastName
        }

        const validData: ValidDataResponse = validateInput(data, values.createAccount);

        if (validData.hasErrors) {
            console.log('data has errors!')
            setErrors({ ...validData.errors, hasError: true })
            return;
        }

        if (values.createAccount) {
            await axios.post(
                '/api/user',
                {
                    data: data
                }
            )
            .then(data => {
                props.setToken(data.data.token);

            })
            .catch(error => {
                setShowAlert(true);
                //TODO parse error message and, if user already exists,
                console.error('Error creating user');
                console.error(error)
            });
        }
        else {
            await axios.post(
                '/api/login',
                {
                    data: data
                }
            )
            .then((data: any) => {
                props.setToken(data.data.token);

            })
            .catch(error => {
                console.error(error);
            });
        }
    }

    return (
            <Container>
                <Box >
                    {
                        showAlert &&
                        <AlertComponent
                            title={'Error'}
                            message={'User already exists!'}
                            severity={'error'}
                            onClose={() => setShowAlert(false)}
                        />

                    }
                </Box>

                <Paper>
                    <Box className={'content-wrapper login-page'}>

                        <FormControlLabel control={<Checkbox/>} label="Create Account" onChange={handleClickCreateAccountCheckbox} />

                        <FormControl fullWidth sx={{ m: 1}} variant="standard">
                            <InputLabel htmlFor="username">
                                Username
                            </InputLabel>
                            <Input
                                error={errors.username}
                                id="username"
                                onChange={handleChange('username')}
                            />
                        </FormControl>

                        {
                            values.createAccount &&

                            <React.Fragment>

                                <FormControl fullWidth sx={{ m: 1}} variant="standard">
                                    <InputLabel htmlFor="firstName">
                                        First Name
                                    </InputLabel>
                                    <Input
                                        error={errors.firstName}
                                        id="firstName"
                                        onChange={handleChange('firstName')}
                                    />
                                </FormControl>

                                <FormControl fullWidth sx={{ m: 1}} variant="standard">
                                    <InputLabel htmlFor="lastName">
                                        Last Name
                                    </InputLabel>
                                    <Input
                                        error={errors.lastName}
                                        id="lastName"
                                        onChange={handleChange('lastName')}
                                    />
                                </FormControl>

                                <FormControl fullWidth sx={{ m: 1}} variant="standard">
                                    <InputLabel htmlFor="email">
                                        Email
                                    </InputLabel>
                                    <Input
                                        error={errors.email}
                                        id="email"
                                        onChange={handleChange('email')}
                                    />
                                </FormControl>
                            </React.Fragment>
                        }

                        <FormControl fullWidth sx={{ m: 1}} variant="standard">
                            <InputLabel htmlFor="password">Password</InputLabel>
                            <Input
                                error={errors.password}
                                id="password"
                                type={values.showPassword ? 'text' : 'password'}
                                value={values.password}
                                onChange={handleChange('password')}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                        >
                                            {values.showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                            />
                        </FormControl>

                        <Button
                            className={'primary-button'}
                            sx={{marginTop: '2rem'}}
                            variant='contained'
                            onClick={() => handleLoginOrCreateAccountClicked()}
                        >{values.createAccount ? 'Create' : 'Login'}
                        </Button>
                    </Box>
                </Paper>
            </Container>
    )
}