import React from 'react'
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

const Spinner = () => {
  return (
      <Box sx={{ display: 'flex',width:'100%' }}>
          <CircularProgress sx={{justifyContent:'center',color:'white'} }/>
      </Box>
  )
}

export default Spinner