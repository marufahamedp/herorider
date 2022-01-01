import { Box, Button, Card, CardContent, CardMedia, Grid, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import CoursesDetail from '../CoursesDetail/CoursesDetail';

function CoursesDetails() {
    const [services, setServices] = useState([]);
    const [spinner, setSpinner] = useState(true);

    useEffect(() => {
        fetch('https://aqueous-sea-83761.herokuapp.com/services')
            .then(res => res.json())
            .then(data => setServices(data))
            .finally(() => setSpinner(false));
    }, [services])
    return (
        <div>
            <Grid container spacing={2}>
                {
                    services.map(service => <CoursesDetail
                        key={service._id}
                        service={service}
                    ></CoursesDetail>)
                }
              
            </Grid>
        </div>
    )
}

export default CoursesDetails
