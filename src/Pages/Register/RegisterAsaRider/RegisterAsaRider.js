import { Container, Typography, TextField, Button, CircularProgress, Alert, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import React, { useState } from 'react';
import { Grid } from '@mui/material';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import useAuth from '../../../hooks/useAuth';
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import { Box } from '@mui/system';
const Input = styled('input')({
    display: 'none',
});

function RegisterAsaRider() {
    const [licenceimage, setImage] = useState(null);
    const [nidfrontimage, setNidfrontImage] = useState(null);
    const [nidbackimage, setNidbackImage] = useState(null);
    const [profileimage, setProfileImage] = useState(null);
    const [loginData, setLoginData] = useState({});
    const navigate = useNavigate();
    const { user, registerUsera, isLoading, authError } = useAuth();
    const [vehicle, setVehicleType] = useState('');
    const [rider, setRider] = useState('Rider');
    const handlevehicletype = (e) => {
        setVehicleType(e.target.value);
    };
    const handleOnBlur = e => {
        const field = e.target.name;
        const value = e.target.value;
        const newLoginData = { ...loginData };
        newLoginData[field] = value;
        setLoginData(newLoginData);
    }
    const handleLoginSubmit = e => {
        console.log(loginData);
        e.preventDefault();
        if (!licenceimage) {
            return;
        }
        if (loginData.password !== loginData.password2) {
            alert('Your password did not match');
            return
        }
        

        registerUsera(loginData.email, loginData.password, loginData.name, licenceimage, nidfrontimage, nidbackimage, profileimage, loginData.age, loginData.address, loginData.number, loginData.area, loginData.carname, loginData.carmodel, loginData.carpalate, vehicle, rider, navigate);
        e.preventDefault();
    }
    console.log(rider);
    
    return (
        <Container sx={{ mt: 3 }}>


            <Typography variant="h4" gutterBottom>Join as a rider</Typography>
            <Link style={{ textDecoration: 'none', color: 'blue' }} to="/registerasalearner"><Button>Join as a Driving Lesson Learner</Button></Link>
            {!isLoading && <form onSubmit={handleLoginSubmit}>
                <Grid container spacing={2}>
                    <Grid item sx={{ mt: 0 }} xs={12} md={6}>
                        <TextField
                            sx={{ width: '75%', m: 1 }}
                            id="standard-basic"
                            label="Your Name"
                            name="name"
                            onBlur={handleOnBlur}
                            variant="standard" />
                        <TextField
                            sx={{ width: '75%', m: 1 }}
                            id="standard-basic"
                            label="Your Email"
                            name="email"
                            type="email"
                            onBlur={handleOnBlur}
                            variant="standard" />
                        <TextField
                            sx={{ width: '75%', m: 1 }}
                            id="standard-basic"
                            label="Your Password"
                            type="password"
                            name="password"
                            onBlur={handleOnBlur}
                            variant="standard" />
                        <TextField
                            sx={{ width: '75%', m: 1 }}
                            id="standard-basic"
                            label="ReType Your Password"
                            type="password"
                            name="password2"
                            onBlur={handleOnBlur}
                            variant="standard" />
                        <TextField
                            sx={{ width: '75%', m: 1 }}
                            id="standard-basic"
                            label="Your phone number"
                            name="number"
                            type="number"
                            onBlur={handleOnBlur}
                            variant="standard" />
                        <TextField
                            sx={{ width: '75%', m: 1 }}
                            id="standard-basic"
                            label="Your address"
                            name="address"
                            type="text"
                            onBlur={handleOnBlur}
                            variant="standard" />
                        <TextField
                            sx={{ width: '75%', m: 1 }}
                            id="standard-basic"
                            label="Your area"
                            name="area"
                            type="text"
                            onBlur={handleOnBlur}
                            variant="standard" />
                        <TextField
                            sx={{ width: '75%', m: 1 }}
                            id="standard-basic"
                            label="Car name"
                            name="carname"
                            type="text"
                            onBlur={handleOnBlur}
                            variant="standard" />
                    </Grid>
                    <Grid item xs={12} md={6}>

                        <TextField
                            sx={{ width: '75%', m: 1 }}
                            id="standard-basic"
                            label="car model"
                            name="carmodel"
                            type="text"
                            onBlur={handleOnBlur}
                            variant="standard" />
                        <TextField
                            sx={{ width: '75%', m: 1 }}
                            id="standard-basic"
                            label="Car palate"
                            name="carpalate"
                            type="text"
                            onBlur={handleOnBlur}
                            variant="standard" />

                        <TextField
                            sx={{ width: '75%', m: 1 }}
                            id="standard-basic"
                            label="Your age"
                            name="age"
                            type="number"
                            onBlur={handleOnBlur}
                            variant="standard" />
                      
                        <FormControl variant="standard" sx={{ m: 1, minWidth: '100%' }}>
                            <InputLabel sx={{ width: '75%', my: 1 }} id="vehicle">Vehicle type</InputLabel>
                            <Select
                                sx={{ width: '75%', my: 1 }}
                                id="vehicle"
                                label="Vehicle type"
                                name="Vehicle"
                                value={vehicle}
                                onChange={handlevehicletype}
                                variant="standard"
                            >
                                <MenuItem value={'Car'}>Car</MenuItem>
                                <MenuItem value={'Bike'}>Bike</MenuItem>
                            </Select>
                        </FormControl>
                        <Stack sx={{ my: 1 }} direction="row" alignItems="center" spacing={2}>
                            <label htmlFor="p1">
                                <Input accept="image/*" id="p1" type="file" onChange={e => setImage(e.target.files[0])} />
                                <Button variant="contained" component="span">
                                    <PhotoCamera sx={{ mr: 1 }} /> Upload
                                </Button>
                            </label>
                            <Typography>Upload your driving licence picture</Typography>
                        </Stack>

                        <Stack sx={{ my: 1 }} direction="row" alignItems="center" spacing={2}>
                            <label htmlFor="p2">
                                <Input accept="image/*" id="p2" type="file" onChange={e => setNidfrontImage(e.target.files[0])} />
                                <Button variant="contained" component="span">
                                    <PhotoCamera sx={{ mr: 1 }} /> Upload
                                </Button>
                            </label>
                            <Typography>Upload your NID front part picture</Typography>
                        </Stack>
                        <Stack sx={{ my: 1 }} direction="row" alignItems="center" spacing={2}>
                            <label htmlFor="p3">
                                <Input accept="image/*" id="p3" type="file" onChange={e => setNidbackImage(e.target.files[0])} />
                                <Button variant="contained" component="span">
                                    <PhotoCamera sx={{ mr: 1 }} /> Upload
                                </Button>
                            </label>
                            <Typography>Upload your NID back part picture</Typography>
                        </Stack>
                        <Stack sx={{ my: 1 }} direction="row" alignItems="center" spacing={2}>
                            <label htmlFor="p4">
                                <Input accept="image/*" id="p4" type="file" onChange={e => setProfileImage(e.target.files[0])} />
                                <Button variant="contained" component="span">
                                    <PhotoCamera sx={{ mr: 1 }} /> Upload
                                </Button>
                            </label>
                            <Typography>Upload your profile picture</Typography>
                        </Stack>
                    </Grid>
                </Grid>


                <Button sx={{ width: '100%', mt: 5 }} type="submit" variant="contained">Register</Button>
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                    <NavLink
                        style={{ textDecoration: 'none' }}
                        to="/login">
                        <Button variant="text">Already Registered? Please Login</Button>
                    </NavLink>
                </Box>
            </form>}
            {isLoading && <CircularProgress />}
            {user?.email && <Alert severity="success">User Created successfully!</Alert>}
            {authError && <Alert severity="error">{authError}</Alert>}
        </Container>
    )
}

export default RegisterAsaRider
