import React from 'react';
import { Box, Button, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import '../../css/OrderPick.css';

const OrderPickingForm = ({ items, handleItemsChange }) => {
  const [categories, setCategories] = React.useState([
    { id: 0, name: 'Groceries', count: 0, item1: 'Groceries', item2: 'Furniture', travelTime: '10 mins' },
    { id: 1, name: 'Furniture', count: 0, item1: 'Groceries', item2: 'Apparel', travelTime: '15 mins' },
    { id: 2, name: 'Apparel', count: 0, item1: 'Groceries', item2: 'Electronics', travelTime: '20 mins' },
    { id: 3, name: 'Electronics', count: 0, item1: 'Furniture', item2: 'Apparel', travelTime: '25 mins' },
  ]);

  const increment = (index) => {
    const newCategories = [...categories];
    newCategories[index].count += 1;
    setCategories(newCategories);
    handleItemsChange(JSON.stringify(newCategories.filter(cat => cat.count > 0).map(cat => cat.id)));
  };

  const decrement = (index) => {
    const newCategories = [...categories];
    if (newCategories[index].count > 0) {
      newCategories[index].count -= 1;
      setCategories(newCategories);
      handleItemsChange(JSON.stringify(newCategories.filter(cat => cat.count > 0).map(cat => cat.id)));
    }
  };

  return (
    <div className="order-picking-form">
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Item Categories</TableCell>
              <TableCell>Quantity</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {categories.map((category, index) => (
              <TableRow key={category.id}>
                <TableCell>{category.name}</TableCell>
                <TableCell>
                  <Button variant="contained" size="small" onClick={() => decrement(index)}>-</Button>
                  <Box component="span" sx={{ mx: 2 }}>{category.count}</Box>
                  <Button variant="contained" size="small" onClick={() => increment(index)}>+</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default OrderPickingForm;