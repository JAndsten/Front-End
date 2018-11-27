import React, { Component } from 'react';
import './App.css';
import CustomerList from './CustomerList';

class CustomerApp extends Component {
  render() {
    return (
      <div>
        <header>
          <h1>Customers</h1>
        </header>
          <CustomerList />
      </div>
    );
  }
}

export default CustomerApp;
