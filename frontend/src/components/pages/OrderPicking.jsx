import React, { useState } from 'react';
import axios from 'axios';
import { Button, TextField, Typography, Paper, Box, Grid, Container, styled, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import { useNavigate } from 'react-router-dom';  
import OrderPickingForm from './OrderPickingForm';

const CustomContainer = styled(Container)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const FormPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  borderRadius: '15px',
  boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
}));

const StyledButton = styled(Button)({
  marginTop: '20px',
  background: '#17275F',
  color: 'white',
  '&:hover': {
    background: '#143b6f',
  },
});

const TimeMatrixBox = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  borderRadius: '15px',
  boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
  background: theme.palette.background.paper,
}));

const timeMatrix = [
  [0, 10, 20, 30],
  [10, 0, 25, 35],
  [20, 25, 0, 15],
  [30, 35, 15, 0],
];

const matrixHeaders = ['Groceries', 'Furniture', 'Apparel', 'Electronics'];

const OrderPicking = () => {
  const [items, setItems] = useState([]);
  const [vehicles, setVehicles] = useState('');
  const [limit, setLimit] = useState('');
  const [result, setResult] = useState(null);
  const navigate = useNavigate();

  const handleItemsChange = (newItems) => setItems(newItems);
  const handleVehiclesChange = (e) => setVehicles(e.target.value);
  const handleLimitChange = (e) => setLimit(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      items: JSON.parse(items),
      vehicles: parseInt(vehicles),
      limit: parseInt(limit),
    };

    try {
      const response = await axios.post('http://localhost:5000/picking', data);
      setResult(response.data);
      navigate('/picking');
    } catch (error) {
      console.error('Error executing order picking:', error);
      setResult(null);
    }
  };

  return (
    <CustomContainer>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <FormPaper>
            <Typography variant="h4" color="textPrimary" gutterBottom>
              Order Picking
            </Typography>
            <OrderPickingForm items={items} handleItemsChange={handleItemsChange} />

            <TextField
              label="Vehicles"
              type="number"
              variant="outlined"
              margin="normal"
              fullWidth
              value={vehicles}
              onChange={handleVehiclesChange}
            />

            <TextField
              label="Limit"
              type="number"
              variant="outlined"
              margin="normal"
              fullWidth
              value={limit}
              onChange={handleLimitChange}
            />

            <StyledButton onClick={handleSubmit} fullWidth>
              Submit
            </StyledButton>
          </FormPaper>
        </Grid>

        <Grid item xs={12} md={6}>
          <TimeMatrixBox>
            <Typography variant="h6" color="textPrimary" gutterBottom>
              Travel Time Matrix
            </Typography>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell></TableCell>
                  {matrixHeaders.map((header) => (
                    <TableCell key={header} align="center">
                      <Typography variant="body1" fontWeight="bold">{header}</Typography>
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {timeMatrix.map((row, rowIndex) => (
                  <TableRow key={rowIndex}>
                    <TableCell>{matrixHeaders[rowIndex]}</TableCell>
                    {row.map((cell, colIndex) => (
                      <TableCell key={colIndex} align="center">{cell} mins</TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TimeMatrixBox>
        </Grid>
      </Grid>
    </CustomContainer>
  );
};

export default OrderPicking;