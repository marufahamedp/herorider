import React, { useState } from 'react';
import { styled, Box } from '@mui/system';
import ModalUnstyled from '@mui/base/ModalUnstyled';
import { Container, Typography, TextField, Button, CircularProgress, Alert } from '@mui/material';
import { Grid } from '@mui/material';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import JoinModal from '../../JoinModal/JoinModal';
import useAuth from '../../../hooks/useAuth';
const StyledModal = styled(ModalUnstyled)`
  position: fixed;
  z-index: 1300;
  right: 0;
  bottom: 0;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Backdrop = styled('div')`
  z-index: -1;
  position: fixed;
  right: 0;
  bottom: 0;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  -webkit-tap-highlight-color: transparent;
`;

const style = {
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid transparent',
    borderRadius:'10px',
    p: 2,
    px: 4,
    pb: 3,
    backgroundColor: 'white'
};

function LoginModal({open, handleClose, handleOpen}) {
    
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
        loginUser(loginData.email, loginData.password, location, handleClose, navigate);
        e.preventDefault();
    }
    return (
        <div>
            <StyledModal
                aria-labelledby="unstyled-modal-title"
                aria-describedby="unstyled-modal-description"
                open={open}
                onClose={handleClose}
                BackdropComponent={Backdrop}
            >
                <Box sx={style}>

                <Container>
             <Typography sx={{textAlign:'center', mt:5}} variant="h4" gutterBottom>Sign in Now </Typography>
            <Grid container spacing={2} sx={{display:'flex', justifyContent:'center'}}>
                
                <Grid item sx={{ }} xs={12} md={5}>
                   
                    
                </Grid>
            </Grid>
        </Container>
        <form onSubmit={handleLoginSubmit}>
                        <TextField
                            sx={{ width: '100%', my: 2 }}
                            id="standard-basic"
                            label="Your Email"
                            name="email"
                            onChange={handleOnChange}
                            variant="standard" />
                        <TextField
                            sx={{ width: '100%', my: 2 }}
                            id="standard-basic"
                            label="Your Password"
                            type="password"
                            name="password"
                            onChange={handleOnChange}
                            variant="standard" />

                        <Button sx={{ width: '100%', my: 2 }} type="submit" variant="contained">Login</Button> <br />
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
                        {user?.email && <Alert severity="success">Sign in successfully!</Alert>}
                        {authError && <Alert severity="error">{authError}</Alert>}
                    </form>
                </Box>
            </StyledModal>
        </div>
    )
}

export default LoginModal
