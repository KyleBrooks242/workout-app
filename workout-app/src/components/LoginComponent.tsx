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
    InputLabel
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
            console.log("Creating account...")
            await axios.post(
                '/user',
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
            console.log("logging in...");
            await axios.post(
                '/login',
                {
                    data: data
                }
            )
            .then((data: any) => {
                props.setToken(data.data.token);

            })
            .catch(error => {
                console.error('SOMETHING WENT WRONG');
                console.error(error);
            });
        }
    }

    return (
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
            <div className={'content-wrapper'}>
                {/*<h2>Let's See Some Id</h2>*/}


                <FormControlLabel control={<Checkbox />} label="Create Account" onChange={handleClickCreateAccountCheckbox} />

                <FormControl sx={{ m: 1, width: '25ch' }} variant="standard">
                    <InputLabel htmlFor="username">
                        Username
                    </InputLabel>
                    <Input
                        error={errors.username}
                        id="username"
                        startAdornment={
                            <InputAdornment position="start">
                                <AccountCircle />
                            </InputAdornment>
                        }
                        onChange={handleChange('username')}
                    />
                </FormControl>

                {
                    values.createAccount &&

                    <div className={'content-wrapper'}>

                        <FormControl sx={{ m: 1, width: '25ch' }} variant="standard">
                            <InputLabel htmlFor="firstName">
                                First Name
                            </InputLabel>
                            <Input
                                error={errors.firstName}
                                id="firstName"
                                onChange={handleChange('firstName')}
                            />
                        </FormControl>

                        <FormControl sx={{ m: 1, width: '25ch' }} variant="standard">
                            <InputLabel htmlFor="lastName">
                                Last Name
                            </InputLabel>
                            <Input
                                error={errors.lastName}
                                id="lastName"
                                onChange={handleChange('lastName')}
                            />
                        </FormControl>

                        <FormControl sx={{ m: 1, width: '25ch' }} variant="standard">
                            <InputLabel htmlFor="email">
                                Email
                            </InputLabel>
                            <Input
                                error={errors.email}
                                id="email"
                                startAdornment={
                                    <InputAdornment position="start">
                                        <EmailRounded />
                                    </InputAdornment>
                                }
                                onChange={handleChange('email')}
                            />
                        </FormControl>
                    </div>
                }

                <FormControl sx={{ m: 1, width: '25ch' }} variant="standard">
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
                    sx={{marginTop: '2rem'}}
                    variant='contained'
                    onClick={() => handleLoginOrCreateAccountClicked()}
                >{values.createAccount ? 'Create' : 'Login'}
                </Button>

            </div>
        </Box>
    )
}