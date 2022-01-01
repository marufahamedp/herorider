import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Link } from 'react-router-dom';
import useAuth from '../../../hooks/useAuth';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
function ProfileMenu() {
    const { logout, user } = useAuth()
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    return (
        <div>
            <Button
                id="basic-button"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                sx={{ color: 'white' }}
                onClick={handleClick}
            >
                <AccountCircleIcon /> {user.displayName}
            </Button>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
            >
                <MenuItem onClick={handleClose}>  <Link to="/profile" style={{ textDecoration: 'none', color: 'black' }}>
                Profile
                </Link></MenuItem>
                <MenuItem onClick={handleClose}>  <Link to="/dashboard" style={{ textDecoration: 'none', color: 'black' }}>
                Dashboard
                </Link></MenuItem>
              
                <MenuItem onClick={logout}>Logout</MenuItem>
            </Menu>
        </div>
    )
}

export default ProfileMenu
