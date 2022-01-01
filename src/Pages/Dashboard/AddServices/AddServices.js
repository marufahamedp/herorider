import PhotoCamera from '@mui/icons-material/PhotoCamera';
import { Button, Input, Stack, TextField, Typography } from '@mui/material';
import React, { useState } from 'react'

function AddServices() {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [details, setDetails] = useState('');
    const [image, setImage] = useState(null);
    const [success, setSuccess] = useState(false);
    const handleSubmit = e => {
        e.preventDefault();
        if (!image) {
            return;
        }
        const formData = new FormData();
        formData.append('name', name);
        formData.append('details', details);
        formData.append('image', image);
        formData.append('price', price);
        fetch('https://aqueous-sea-83761.herokuapp.com/services', {
            method: 'POST',
            body: formData
        })
            .then(res => res.json())
            .then(data => {
                if (data.insertedId) {
                    setSuccess('service added successfully');
                    alert('service added successfully');
                }
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }

    return (
        <div>

            <form onSubmit={handleSubmit}>
               
                <TextField
                label="Service Name"
                    variant="standard"
                    id="name"
                    required
                    onChange={e => setName(e.target.value)}
                    type="text"
                    sx={{ width: '100%', my: 2 }}
                />
                <TextField
                 label="Service Price"
                    id="price"
                    variant="standard"
                    required
                    onChange={e => setPrice(e.target.value)}
                    type="number"
                    sx={{ width: '100%', my: 2 }}
                />

                <br />
                <label htmlFor="details">Service Details:</label>
                <br />
                <textarea
                    rows={5}
                    id="details"
                    type="text"
                    required
                    style={{ width: '100%', m: 1 }}
                    onChange={e => setDetails(e.target.value)}
                />
                <br />
                <Stack sx={{ my: 1 }} direction="row" alignItems="center" spacing={2}>
                    <label htmlFor="p2">
                        <Input accept="image/*" id="p2" type="file" onChange={e => setImage(e.target.files[0])} />
                        
                    </label>
                    <Typography>Upload your service picture</Typography>
                </Stack>

                <br />
                <div className="text-center">
                    <Button variant="contained" type="submit">
                        Add Service
                    </Button>
                </div>
            </form>
        </div>

    )
}

export default AddServices
