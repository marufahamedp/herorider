import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';
import JoinModal from '../../../JoinModal/JoinModal';
import useAuth from '../../../../hooks/useAuth';
import LoginModal from '../../../Login/LoginModal/LoginModal';
import ProfileMenu from '../../../Profile/ProfileMenu/ProfileMenu';
function Navbar() {
    const [openjoinmodal, setOpenjoinmodal] = React.useState(false);
    const handleOpenjoinmodal = () => setOpenjoinmodal(true);
    const handleClosejoinmodal = () => setOpenjoinmodal(false);
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const { logout, user } = useAuth()
    return (
        <div>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static">
                    <Toolbar>
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            sx={{ mr: 2, display: { md: 'none', sm: 'block' } }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Link to="/" style={{ textDecoration: 'none', color: 'white', flexGrow: 1 }}>
                            <Typography variant="h6" component="div" sx={{}}>
                               Hero Rider
                            </Typography>
                        </Link>
                        <Link to="/home" style={{ textDecoration: 'none', color: 'white' }}>
                            <Typography variant="h6" component="div" sx={{}}>
                            <Button color="inherit">Home</Button>
                            </Typography>
                        </Link>
                        <Link to="/home" style={{ textDecoration: 'none', color: 'white' }}>
                            <Typography variant="h6" component="div" sx={{}}>
                            <Button color="inherit">About</Button>
                            </Typography>
                        </Link>
                        <Link to="/home" style={{ textDecoration: 'none', color: 'white' }}>
                            <Typography variant="h6" component="div" sx={{}}>
                            <Button color="inherit">Contact</Button>
                            </Typography>
                        </Link>
                        {
                            !user.email && <Box>
                                <Button color="inherit" onClick={handleOpen}>Sign In</Button>
                                <Button color="inherit" onClick={handleOpenjoinmodal}>Join</Button>
                            </Box>
                        }

                      
                        {
                            user.email && <Box>

                                <Button color="inherit"><ProfileMenu /></Button>

                            </Box>
                        }

                        <JoinModal
                            open={openjoinmodal}
                            handleOpen={handleOpenjoinmodal}
                            handleClosejoinmodal={handleClosejoinmodal}
                        ></JoinModal>
                        <LoginModal
                            open={open}
                            handleClose={handleClose}
                            handleOpen={handleOpen}
                        ></LoginModal>
                    </Toolbar>
                </AppBar>
            </Box>
        </div>
    )
}

export default Navbar
