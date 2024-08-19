import React from 'react'
import TruckAnimation from './truck'
import { Box, Typography, Paper, styled } from '@mui/material'
import { Container } from "@mui/system";
import bgImg from "../../img/bgImg.png";
// import Footer from "../home/Footer"


const Picking = () => {
  const CustomBox = styled(Box)(({ theme }) => ({
    display: "flex",
    justifyContent: "center",
    gap: theme.spacing(5),
    [theme.breakpoints.down("md")]: {
      flexDirection: "column",
      alignItems: "center",
      textAlign: "center",
    },
  }));

  const Title = styled(Typography)(({ theme }) => ({
    fontSize: "64px",
    color: "#000336",
    fontWeight: "bold",
    margin: theme.spacing(4, 0, 4, 0),
    [theme.breakpoints.down("sm")]: {
      fontSize: "40px",
    },
  }));

  return (
    <div>
      <Box sx={{ backgroundColor: "#E6F0FF", minHeight: "95vh", marginTop: "20px" }}>
        <Container>
          <CustomBox>
            <Box sx={{ flex: "2" }}>
              <Typography
                variant="body2"
                sx={{
                  fontSize: "18px",
                  color: "#687690",
                  fontWeight: "500",
                  mt: 1,
                  mb: 4,
                }}
              >


              </Typography>
              <Title variant="h1">
                Optimised Route & Time for Vehicles
              </Title>
              <Typography
                variant="body2"
                sx={{ fontSize: "18px", color: "#5A6473", my: 4 }}
              >
                The method used for the vehicles to pick up the assigned items for given constraints is:<br />
                <b>Zone Batch Picking: Splits the warehouse into different zones and picks items zone by zone.</b><br />
              </Typography>
            </Box>

            <Box sx={{ flex: "1.25" }}>
              <img
                src={bgImg}
                alt="bgImg"
                style={{ maxWidth: "100%" }}
              />
            </Box>
          </CustomBox>
          {/* <Typography variant="h6" color="primary" align="center" gutterBottom>
        The core method that uses linear programming to determine the optimal routes for the vehicles to minimize the total picking time. It calculates the time required for each vehicle to pick up the assigned items is: Zone Batch Picking
      </Typography>
      <Typography variant="h6" color="primary" align="center" gutterBottom>
        zone_batch_picking: Splits the warehouse into different zones and picks items zone by zone.
      </Typography> */}
          <Paper elevation={3} style={{ margin: '50px', padding: '30px', backgroundColor: '#f5f5f5' }}>
            <Title
              align='center'
              variant="h4"
              sx={{ fontSize: "20px", align: "center" }}
            >
              Route & Arrival Time for each Vehicle
            </Title>
            <Typography variant="body1" align="center">
              Route taken by Vehicle 0: start -&gt; grocery -&gt; furniture -&gt; apparel -&gt; electronic <br />
              Total Optimised time for order picking process: 65 min
            </Typography>
          </Paper>
          <TruckAnimation />

          {/* <Paper elevation={3} style={{ margin: '50px', padding: '30px', backgroundColor: '#f5f5f5' }}>
        <Typography variant="h6" align="center">
          RESULTS
        </Typography>
        <Typography variant="body1" align="center">
          Route taken by  Vehicle:  <br/>
          Total Optimised time for order picking process: 

        </Typography>
      </Paper> */}
        </Container>
        {/* <Footer /> */}
      </Box>
    </div>
  )
}

export default Picking