import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  const [items, setItems] = useState([]);
  const [newItemName, setNewItemName] = useState('');
  const [newItemQuantity, setNewItemQuantity] = useState('');
  const [newItemCategory, setNewItemCategory] = useState('');

  const fetchItems = async () => {
    const response = await fetch('http://localhost:3000/getItems');
    const data = await response.json();
    setItems(data);
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const addItem = async () => {
    await fetch('http://localhost:3000/addItem', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        name: newItemName, 
        quantity: newItemQuantity, 
        category: newItemCategory 
      }),
    });
    setNewItemName('');
    setNewItemQuantity('');
    setNewItemCategory('');
    fetchItems();
  };

  return (
    <div className="container mt-5" >
      <div className="row mb-3">
        <div className="col">
          <h2>Add Grocery Item</h2>
          <div className="input-group mb-3">
            <input 
              type="text"
              className="form-control"
              placeholder="Item Name"
              value={newItemName}
              onChange={(e) => setNewItemName(e.target.value)}
            />
            <input 
              type="number"
              className="form-control"
              placeholder="Quantity"
              value={newItemQuantity}
              onChange={(e) => setNewItemQuantity(e.target.value)}
            />
            <input 
              type="text"
              className="form-control"
              placeholder="Category"
              value={newItemCategory}
              onChange={(e) => setNewItemCategory(e.target.value)}
            />
            <div className="input-group-append">
              <button className="btn btn-outline-secondary" type="button" onClick={addItem}>Add Item</button>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col">
          <h2>Grocery Inventory</h2>
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Name</th>
                <th>Quantity</th>
                <th>Category</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, index) => (
                <tr key={index}>
                  <td>{item.name}</td>
                  <td>{item.quantity}</td>
                  <td>{item.category}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default App;
