import React, { useState } from 'react';
import '../../css/OrderPick.css'; 


const OrderPickingForm = () => {
  // State to manage the count of items, item selections, and travel time for each category
  const [categories, setCategories] = useState([
    { name: 'Groceries', count: 0, item1: 'Groceries', item2: 'Furniture', travelTime: '10 mins' },
    { name: 'Furniture', count: 0, item1: 'Groceries', item2: 'Apparel', travelTime: '15 mins' },
    { name: 'Apparel', count: 0, item1: 'Groceries', item2: 'Electronics', travelTime: '20 mins' },
    { name: 'Electronics', count: 0, item1: 'Furniture', item2: 'Apparel', travelTime: '25 mins' },
  ]);

  // Function to handle incrementing the count
  const increment = (index) => {
    const newCategories = [...categories];
    newCategories[index].count += 1;
    setCategories(newCategories);
  };

  // Function to handle decrementing the count
  const decrement = (index) => {
    const newCategories = [...categories];
    if (newCategories[index].count > 0) {
      newCategories[index].count -= 1;
      setCategories(newCategories);
    }
  };

  // Function to display the selected categories and counts
  const displaySelectedCategories = () => {
    return categories.filter(cat => cat.count > 0).map(cat => cat.name).join(', ');
  };

  return (
    <div className="order-picking-form">
      <table>
        <thead>
          <tr>
            <th>Item Categories</th>
            <th>Quantity</th>
            <th>Item 1</th>
            <th>Item 2</th>
            <th>Time to Travel</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category, index) => (
            <tr key={index}>
              <td>{category.name}</td>
              <td>
                <button onClick={() => decrement(index)}>-</button>
                <span>{category.count}</span>
                <button onClick={() => increment(index)}>+</button>
              </td>
              <td>{category.item1}</td>
              <td>{category.item2}</td>
              <td>{category.travelTime}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="summary">
        <h4>Total Categories of Items Ordered:</h4>
        <p>[{displaySelectedCategories()}]</p>
      </div>
    </div>
  );
};

export default OrderPickingForm;
