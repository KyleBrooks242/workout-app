import React, {useState} from 'react';
import Input from '@mui/material/Input';
import {
    Box,
    Button,
    Checkbox,
    FormControl,
    FormControlLabel,
    IconButton,
    InputAdornment,
    InputLabel
} from "@mui/material";
import {AccountCircle, VisibilityOff, Visibility} from "@mui/icons-material";
import axios from "axios";

interface State {
    username: string
    password: string
    showPassword: boolean
    createAccount: boolean,
    hasError: boolean,
    errorMessage: string
}

interface Props {
    setToken: any;
}

export const LoginComponent = (props: Props) => {

    const [values, setValues] = useState<State>({
        username: '',
        password: '',
        showPassword: false,
        createAccount: false,
        hasError: false,
        errorMessage: ''
    });

    const handleClickShowPassword = () => {
        setValues({
            ...values,
            showPassword: !values.showPassword,
        });
    };

    const handleClickCreateAccount = () => {
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

    //TODO we need to handle the situation where the login is invalid here
    const handleLoginOrCreateAccountClicked = async () => {
        const data = {
            username: values.username,
            password: values.password
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
                console.log('DATA');
                console.log(data);
                props.setToken(data.data.token);

            })
            .catch(error => {
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
                console.log('DATA!');
                console.log(data);
                props.setToken(data.data.token);

            })
            .catch(error => {
                console.error('SOMETHING WENT WRONG');
                console.error(error);
            });
        }
    }


    return (
        <Box className={'login-box'}>
            <div className={'login-wrapper'}>
                <h2>Let's 👀 Some Id</h2>
                <FormControl sx={{ m: 1, width: '25ch' }} variant="standard">
                    <InputLabel htmlFor="input-with-icon-adornment">
                        Username
                    </InputLabel>
                    <Input
                        error={false}
                        id="input-with-icon-adornment"
                        startAdornment={
                            <InputAdornment position="start">
                                <AccountCircle />
                            </InputAdornment>
                        }
                        onChange={handleChange('username')}
                    />
                </FormControl>

                <FormControl sx={{ m: 1, width: '25ch' }} variant="standard">
                    <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
                    <Input
                        id="standard-adornment-password"
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

                <FormControlLabel control={<Checkbox />} label="Create Account" onChange={handleClickCreateAccount} />
                <Button
                    sx={{marginTop: '2rem'}}
                    variant='contained'
                    onClick={() => handleLoginOrCreateAccountClicked()}
                >{values.createAccount ? 'Create Account' : 'Login'}
                </Button>

            </div>
        </Box>
    )
}