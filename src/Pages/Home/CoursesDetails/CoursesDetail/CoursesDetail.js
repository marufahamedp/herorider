import React from 'react'
import { Box, Button, Card, CardContent, CardMedia, Grid, Typography } from '@mui/material'
import { Link, useParams } from 'react-router-dom';

function CoursesDetail({ service }) {

    const { _id, name, details, price, image } = service;
    const { serviceID } = useParams()
    return (
        <Grid item xs={12} md={6}>
            <Box style={{ margin: '10px' }}>
                <Card sx={{ maxWidth: '100%' }}>
                    <CardMedia
                        component="img"
                        height="200"
                        image={image}
                        alt="Paella dish"
                    />
                    <CardContent>
                        <Typography variant="h4">
                            {name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {details}
                        </Typography>
                        <Typography variant="h5">
                            {price} $
                        </Typography>
                        <div style={{ textAlign: 'center' }}>
                            <Link style={{ textDecoration: 'none', color: 'white' }} to={`/payment/${_id}`}><Button variant='contained' sx={{ mt: 2, width: 1 }}>Pay for The Course Now</Button></Link>
                        </div>
                 
                    </CardContent>


                </Card>
            </Box>
        </Grid>
    )
}

export default CoursesDetail
