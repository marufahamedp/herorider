import { Container, Typography, TextField, Button, CircularProgress, Alert } from '@mui/material';
import React, { useState } from 'react';
import { Grid } from '@mui/material';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import JoinModal from '../JoinModal/JoinModal';

function Login() {
    const [openjoinmodal, setOpenjoinmodal] = React.useState(false);
    const handleOpenjoinmodal = () => setOpenjoinmodal(true);
    const handleClosejoinmodal = () => setOpenjoinmodal(false);
    const [loginData, setLoginData] = useState({});
    const { user, loginUser, signInWithGoogle, isLoading, authError } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();

    const handleOnChange = e => {
        const field = e.target.name;
        const value = e.target.value;
        const newLoginData = { ...loginData };
        newLoginData[field] = value;
        setLoginData(newLoginData);
    }
    const handleLoginSubmit = e => {
        loginUser(loginData.email, loginData.password, location, navigate);
        e.preventDefault();
    }


    return (
        <Container>
             <Typography sx={{textAlign:'center', mt:5}} variant="h4" gutterBottom>Login Now </Typography>
            <Grid container spacing={2} sx={{display:'flex', justifyContent:'center'}}>
                
                <Grid item sx={{ }} xs={12} md={5}>
                   
                    <form onSubmit={handleLoginSubmit}>
                        <TextField
                            sx={{ width: '100%', m: 1 }}
                            id="standard-basic"
                            label="Your Email"
                            name="email"
                            onChange={handleOnChange}
                            variant="standard" />
                        <TextField
                            sx={{ width: '100%', m: 1 }}
                            id="standard-basic"
                            label="Your Password"
                            type="password"
                            name="password"
                            onChange={handleOnChange}
                            variant="standard" />

                        <Button sx={{ width: '100%', m: 1 }} type="submit" variant="contained">Login</Button> <br />
                        <Typography sx={{textAlign:'center'}} >
                            Don't have an account then please
                        <Button color="inherit" onClick={handleOpenjoinmodal}>register</Button>
                        </Typography>
                        <JoinModal
                        open={openjoinmodal}
                        handleOpen={handleOpenjoinmodal}
                        handleClosejoinmodal={handleClosejoinmodal}
                        ></JoinModal>
                        {isLoading && <CircularProgress />}
                        {user?.email && <Alert severity="success">Login successfully!</Alert>}
                        {authError && <Alert severity="error">{authError}</Alert>}
                    </form>
                </Grid>
            </Grid>
        </Container>
    )
}

export default Login
