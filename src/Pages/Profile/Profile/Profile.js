import { CircularProgress, Container } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import useAllUsers from '../../../hooks/useAllUsers'
import Navbar from '../../Shared/Header/Navbar/Navbar'
import ProfileDetails from '../ProfileDetails/ProfileDetails'
import { useState, useEffect } from 'react';
import useAuth from '../../../hooks/useAuth'
function Profile() {
    const [users, setUsers] = useState([]);
    const [spinner, setSpinner] = useState(true);
    const {user} = useAuth();
    useEffect(() => {
        fetch('https://aqueous-sea-83761.herokuapp.com/users')
            .then(res => res.json())
            .then(data => setUsers(data))
            .finally(() => setSpinner(false));
    }, [users])
    const filteruser = users.filter(herouser=> herouser.email== user?.email)
    return (
        <div>
            <Navbar></Navbar>
            <Container>
            {
                spinner && <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                    <CircularProgress />
                </Box>
            }
                {
                    filteruser?.map(user=> <ProfileDetails
                        user={user}
                        key={user._id}
                    ></ProfileDetails>)
                }
            </Container>
        </div>
    )
}

export default Profile
