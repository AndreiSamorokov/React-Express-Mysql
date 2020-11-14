import React, { useState, useEffect } from "react";
import customerService from './api/api';
import './App.css';

function App() {
  const [customers, setCustomers] = useState(null);
  const [newCustomer, setNewCustomer] = useState([]);

  useEffect(() => {
    if(!customers) {
      getCustomers();
    }
  })

  const getCustomers = async () => {
    let res = await customerService.getAll(); 
    setCustomers(res);
  }

  const addCustomer = async () => {
    let res = await customerService.addUser(newCustomer);  
    getCustomers();
  }
  
  const DeleteItem = async (cuid) => { 
    const del_item = { 'id': cuid }
    let res = await customerService.removeUser(del_item);  
    getCustomers();
  }

  const mySubmitHandler = event => {
    event.preventDefault();
    addCustomer();
  };

  const handleChange = e => {
    setNewCustomer( {'name':e.target.value } );
  }


  const renderCustomer = customer => {
    return (
      <li key={customer.id} className="list__item customer">
        <h3 className="customer__name">{customer.name}</h3> 
        <button className="customer_remove_btn"
          onClick={() => DeleteItem(customer.id)}
        >
          Delete
        </button>
      </li>
    );
  };

  

  return (
    <div className="App">
      <div className="customerList">
        <ul className="list">
          {(customers && customers.length > 0) ? (
            customers.map(customer => renderCustomer(customer))
          ) : (
            <p>No customers found</p>
          )}
        </ul>
      </div>
      <div>
        <form  onSubmit={mySubmitHandler}> 
          <input name="customername"
            type='text' 
            onChange={handleChange}
          />
          <input name="sumit" type="submit" value="Add new user"/>
        </form>
      </div>
    </div>
  );
}

export default App;