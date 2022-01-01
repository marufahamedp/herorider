import { Box, Grid } from '@mui/material';
import React from 'react'
import MailIcon from '@mui/icons-material/Mail';
import CallIcon from '@mui/icons-material/Call';
import DataUsageIcon from '@mui/icons-material/DataUsage';
import HomeIcon from '@mui/icons-material/Home';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import PersonIcon from '@mui/icons-material/Person';
import CropSquareIcon from '@mui/icons-material/CropSquare';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import ModelTrainingIcon from '@mui/icons-material/ModelTraining';
import ElectricCarIcon from '@mui/icons-material/ElectricCar';
function ProfileDetails({ user }) {
    const { _id, name, email, age, address, number, area, carname, carmodel, carpalate, vehicle, usertype, licencepic, profilepic, nid1pic, nid2pic } = user;
    return (
        <div>
            <Grid container spacing={2} sx={{mt:3}}>
                <Grid item xs={12} md={4} sx={{display:'flex', justifyContent:'center'}}>
                    <Box style={{border:'1px solid black', width:'90%', padding:'10px',borderRadius:'20px'}}>
                    <Box  sx={{display:'flex', justifyContent:'center'}}>
                    <Box sx={{ maxWidth: '150px' }}>
                        <img style={{ width: '100%' }} src={`data:image/png;base64,${profilepic}`} alt="" />
                    </Box>
                    </Box>
                    <h3 style={{textAlign:'center'}}>{name}</h3>
                    <p style={{display:'flex', alignItems:'center'}}><MailIcon /> {email}</p>
                    <p style={{display:'flex', alignItems:'center'}}><CallIcon /> {number}</p>
                    <p style={{display:'flex', alignItems:'center'}}><DataUsageIcon /> {age}</p>
                    <p style={{display:'flex', alignItems:'center'}}><HomeIcon /> {address}</p>
                    <p style={{display:'flex', alignItems:'center'}}><DirectionsCarIcon /> {vehicle}</p>
                    <p style={{display:'flex', alignItems:'center'}}><PersonIcon /> {usertype}</p>
                    {
                        usertype =='Rider' && <div>
                            <p style={{display:'flex', alignItems:'center'}}><CropSquareIcon /> {area}</p>
                            <p style={{display:'flex', alignItems:'center'}}><DriveFileRenameOutlineIcon /> {carname}</p>
                            <p style={{display:'flex', alignItems:'center'}}><ModelTrainingIcon /> {carmodel}</p>
                            <p style={{display:'flex', alignItems:'center'}}><ElectricCarIcon /> {carpalate}</p>
                        </div>
                    }
                    </Box>
                    
                </Grid>
                <Grid sx={{mt:2}} item xs={12} md={8} style={{border:'1px solid black', width:'100%', padding:'10px',borderRadius:'20px'}}>
                <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <h4>NID Front Part Image :</h4>
                  <img style={{ width: '100%' }} src={`data:image/png;base64,${nid1pic}`} alt="" />
                </Grid>
                <Grid item xs={12} md={6}>
                <h4>NID Back Part Image :</h4>
                  <img style={{ width: '100%' }} src={`data:image/png;base64,${nid2pic}`} alt="" />
                </Grid>
            </Grid>


                    {
                        usertype =='Rider' && <div>
                            <h4>Driving licence picture : </h4>
                         <img style={{ width: '100%' }} src={`data:image/png;base64,${licencepic}`} alt="" />
                    </div>
                    }


                </Grid>

            </Grid>
        
        </div>
    )
}

export default ProfileDetails
