import { Button, Container, Grid, Link, Paper, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import Navbar from '../Shared/Header/Navbar/Navbar';
import { useForm } from "react-hook-form";
import useAuth from '../../hooks/useAuth';
function ServiceDetails() {
   
    const {user} = useAuth()
    const [service, setService] = useState([]);
    const [spinner, setSpinner] = useState(true);
    const { serviceID } = useParams()
    useEffect(() => {
        fetch(`https://aqueous-sea-83761.herokuapp.com/services/${serviceID}`)
            .then(res => res.json())
            .then(data => setService(data))
            .finally(() => setSpinner(false));
    }, [service]);
    const { _id, name, details, price, image } = service;
    const [defaultValue, setDefaultValue] = useState({});
    const { register, handleSubmit, reset } = useForm();
    const onSubmit = data => {
        data.price = price;
        fetch('https://aqueous-sea-83761.herokuapp.com/orders', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(data => {
                if (data.insertedId) {
                    console.log(data);
                    reset()
                }

            })
    };
    useEffect(() => {
        setDefaultValue({ orderStatus: 'Pending', username: user.displayName, email: user.email, serviceName: name, price: price })
    }, []);
    useEffect(() => {
        reset(defaultValue)
    }, [defaultValue]);
    return (
        <div>
            <Navbar></Navbar>
            <Container>
                <Grid container spacing={2} sx={{m:3}}>
                    <Grid item xs={12} md={8}>
                      <Box>
                          <img src={image} alt="" />
                      </Box>
                      <Typography variant="h4">
                            {name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                           {details}
                        </Typography>
                        <Typography variant="h5">
                            {price} $
                        </Typography>
                    </Grid>
                    <Grid item xs={12} md={4}>
                    <Paper sx={{ p: 2 }} elevation={3}>
                            <Typography sx={{ fontWeight: 600, my: 3 }} variant="h5">
                                PERSONAL INFORMATION
                            </Typography>
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <TextField
                                    label="Name"
                                    disabled
                                    defaultValue={user.displayName}
                                    size="small"
                                    sx={{ width: '100%', mb: 2 }}
                                    {...register("name")}
                                />
                                <TextField
                                    label="Email"
                                    disabled
                                    defaultValue={user.email}
                                    size="small"
                                    sx={{ width: '100%', mb: 2 }}
                                    {...register("email")}
                                />
                                <TextField
                                    label="Number"
                                    type="number"
                                    defaultValue={price}
                                    size="small"
                                    sx={{ width: '100%', mb: 2 }}
                                    {...register("number")}
                                />

                                <TextField
                                    label="Billing Address"
                                    type="text"
                                    size="small"
                                    sx={{ width: '100%', mb: 2 }}
                                    {...register("buillingaddress")}
                                />
                                <TextField
                                    label="Shipping Address"
                                    type="text"
                                    size="small"
                                    sx={{ width: '100%', mb: 2 }}
                                    {...register("shippingaddress")}
                                />
                                <Box sx={{ textAlign: 'end' }}>
                                    <Link to={`/payment/${serviceID}`}>
                                    <Button  type="submit" variant="contained">Place Order</Button></Link>
                                </Box>
                                
                            </form>
                
                        </Paper>
                    </Grid>
                    
                </Grid>
            </Container>
        </div>
    )
}

export default ServiceDetails
