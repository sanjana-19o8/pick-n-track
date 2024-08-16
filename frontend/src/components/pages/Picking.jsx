import React from 'react'
import TruckAnimation from './truck'
import {Box, Typography, Paper} from '@mui/material'

const Picking = () => {
  return (
    <div>
      <Typography variant="h6" color="primary" align="center" gutterBottom>
        The core method that uses linear programming to determine the optimal routes for the vehicles to minimize the total picking time. It calculates the time required for each vehicle to pick up the assigned items is: Zone Batch Picking
      </Typography>
      <Typography variant="h6" color="primary" align="center" gutterBottom>
        zone_batch_picking: Splits the warehouse into different zones and picks items zone by zone.
      </Typography>

      <TruckAnimation />

      <Paper elevation={3} style={{ margin: '50px', padding: '30px', backgroundColor: '#f5f5f5' }}>
        <Typography variant="h6" align="center">
          Additional Information
        </Typography>
        <Typography variant="body1" align="center">
          This system optimizes the picking process by assigning specific zones to each vehicle, ensuring minimal overlap and efficient use of time.
        </Typography>
      </Paper>
    </div>
  )
}

export default Picking