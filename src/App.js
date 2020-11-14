import React, { useState, useEffect } from "react";
import customerService from './api/api';
import './App.css';

function App() {
  const [customers, setCustomers] = useState(null);
  const [newCustomer, setNewCustomer] = useState('');
  const [isUpdate, setIsUpdate] = useState(0);
  const [editingItem, setEditingItem] = useState(0);

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
    const add_item = { 'name' : newCustomer }
    let res = await customerService.addUser(add_item);  
    getCustomers();
  }

  const updateCustomer = async() => {
    const user = { id: editingItem, name: newCustomer} 
    let res = await customerService.editUser(user);  
    getCustomers(); 
  }
  
  const DeleteItem = async (cuid) => { 
    const del_item = { 'id': cuid }
    let res = await customerService.removeUser(del_item);  
    getCustomers();
  }

  const EditItem = (id, name) => { 
    setIsUpdate( 1 );
    setEditingItem( id );
    setNewCustomer( name );
  }

  const mySubmitHandler = event => {
    event.preventDefault();
    if( isUpdate ){
      updateCustomer();
    }else{
      addCustomer();
    }
    
  };

  const handleChange = e => {
    setNewCustomer(e.target.value);
  }


  const renderCustomer = customer => {
    return (
      <li key={customer.id} className="list__item customer">
        <h3 className="customer__name">{customer.name}</h3> 
        <button className="customer_remove_btn item_btn"
          onClick={() => DeleteItem(customer.id)}
        >
          Delete
        </button>

        <button className="customer_edit_btn item_btn"
          onClick={() => EditItem(customer.id, customer.name)}
        >
          {
            ( editingItem === customer.id ) ? 'Editing' : 'Edit'
          } 
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
            value={newCustomer}
          />
          <input name="sumit" type="submit" value={isUpdate ? 'Update' : 'Add '}/>
        </form>
      </div>
    </div>
  );
}

export default App;