import React, {useState} from 'react';
import Input from '@mui/material/Input';
import {Box, Button, FormControl, IconButton, InputAdornment, InputLabel} from "@mui/material";
import {AccountCircle, VisibilityOff, Visibility} from "@mui/icons-material";
import axios from "axios";

interface State {
    username: string
    password: string
    showPassword: boolean
}

interface Props {
    setToken: any;
}

export const LoginComponent = (props: Props) => {

    const [values, setValues] = useState<State>({
        username: '',
        password: '',
        showPassword: false
    })

    const handleClickShowPassword = () => {
        setValues({
            ...values,
            showPassword: !values.showPassword,
        });
    };

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    const handleChange =
        (prop: keyof State) => (event: React.ChangeEvent<HTMLInputElement>) => {
            setValues({ ...values, [prop]: event.target.value });
    };

    const handleLoginClicked = async () => {
        //TODO hit the backend with username and password.. set token based on response!

        const response = await axios.post(
            '/user',
            {
                data: JSON.stringify(values)
            }
        )
        console.log(response);
        if (response.status === 200) {
            props.setToken(response.data.token)
        }
    }


    return(
        <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', marginTop: '2rem'}}>
            <div className={'login-wrapper'}>
                <h2>Let's 👀 Some Id</h2>
                <FormControl sx={{ m: 1, width: '25ch' }} variant="standard">
                    <InputLabel htmlFor="input-with-icon-adornment">
                        Username
                    </InputLabel>
                    <Input
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

                <Button
                    sx={{marginTop: '2rem'}}
                    variant="contained"
                    onClick={() => handleLoginClicked()}
                >Login</Button>
            </div>
        </Box>
    )
}