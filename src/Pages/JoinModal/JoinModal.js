import * as React from 'react';
import { styled, Box } from '@mui/system';
import ModalUnstyled from '@mui/base/ModalUnstyled';
import { Button } from '@mui/material';
import { Outlet, Link } from "react-router-dom";
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

function JoinModal({ handleOpen, handleClosejoinmodal, open }) {

    return (
        <div>
            <StyledModal
                aria-labelledby="unstyled-modal-title"
                aria-describedby="unstyled-modal-description"
                open={open}
                onClose={handleClosejoinmodal}
                BackdropComponent={Backdrop}
            >
                <Box sx={style}>
                    <h2 id="unstyled-modal-title">Join Hero Rider Now</h2>
                    <Box sx={{textAlign:'center'}}>

                    <Link  style={{textDecoration:'none', color: 'white'}} to={`/registerasarider`}>  <Button sx={{mb:2, width: 1}} variant="contained">Join as a rider</Button></Link>
                    <Link  style={{textDecoration:'none', color: 'white'}} to={`/registerasalearner`}>  <Button sx={{mb:2, width: 1}} variant="contained">Join as a Driving Lesson Learner</Button></Link>
                       

                    </Box>

                </Box>
            </StyledModal>
        </div>
    )
}

export default JoinModal
