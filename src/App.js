import React, { useState, useEffect } from "react";
import customerService from './api/api';

function App() {
  const [customers, setCustomers] = useState(null);

  useEffect(() => {
    if(!customers) {
      getCustomers();
    }
  })

  const getCustomers = async () => {
    let res = await customerService.getAll();
    console.log(res);
    setCustomers(res);
  }

  const renderCustomer = customer => {
    return (
      <li key={customer.ID} className="list__item customer">
        <h3 className="customer__name">{customer.name}</h3> 
      </li>
    );
  };

  return (
    <div className="App">
      <ul className="list">
        {(customers && customers.length > 0) ? (
          customers.map(customer => renderCustomer(customer))
        ) : (
          <p>No customers found</p>
        )}
      </ul>
    </div>
  );
}

export default App;