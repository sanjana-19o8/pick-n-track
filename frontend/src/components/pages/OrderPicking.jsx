import React, { useState } from 'react';
import axios from 'axios';
import { Button, TextField, Typography, Paper, Box, Container, styled } from '@mui/material';
import { useNavigate } from 'react-router-dom';  
import OrderPickingForm from './OrderPickingForm';


const CustomContainer = styled(Container)(({ theme }) => ({
  height: '100vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
}));

const FormPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  display: 'flex',
  flexDirection: 'column',
  borderRadius: '15px',
  maxWidth: '600px',
  boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
}));

const StyledButton = styled(Button)({
  marginTop: '20px',
  background: '#17275F',
  color: 'white',
  '&:hover': {
    background: '#143b6f'
  }
});

const OrderPicking = () => {
  const [items, setItems] = useState('');
  const [timeMatrix, setTimeMatrix] = useState('');
  const [vehicles, setVehicles] = useState('');
  const [limit, setLimit] = useState('');
  const [result, setResult] = useState(null);
  const navigate = useNavigate();  // Initialize the navigate function

  const handleItemsChange = (e) => setItems(e.target.value);
  const handleTimeMatrixChange = (e) => setTimeMatrix(e.target.value);
  const handleVehiclesChange = (e) => setVehicles(e.target.value);
  const handleLimitChange = (e) => setLimit(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      items: JSON.parse(items),
      vehicles: parseInt(vehicles),
      limit: parseInt(limit)
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
      
      <FormPaper>
        <Typography variant="h4" color="textPrimary" gutterBottom>
          Order Picking
        </Typography>
        <OrderPickingForm />
        {/* <TextField
          label="Items (JSON Array)"
          multiline
          rows={4}
          variant="outlined"
          fullWidth
          margin="normal"
          value={items}
          onChange={handleItemsChange}
        /> */}
        
        <TextField
          label="Vehicles"
          type="number"
          variant="outlined"
          fullWidth
          margin="normal"
          value={vehicles}
          onChange={handleVehiclesChange}
        />
        <TextField
          label="Limit"
          type="number"
          variant="outlined"
          fullWidth
          margin="normal"
          value={limit}
          onChange={handleLimitChange}
        />
        <StyledButton onClick={handleSubmit}>
          Submit
        </StyledButton>
        {result && (
          <Box mt={2}>
            <Typography variant="h6">Result:</Typography>
            <pre>{JSON.stringify(result, null, 2)}</pre>
          </Box>
        )}
      </FormPaper>
    </CustomContainer>
  );
};

export default OrderPicking;