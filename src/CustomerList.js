import React, { Component } from 'react';
import ReactTable from "react-table";
import "react-table/react-table.css";
import AddCustomer from './AddCustomer';
import 'react-confirm-alert/src/react-confirm-alert.css';
import  { confirmAlert } from 'react-confirm-alert';
import { ToastContainer, toast } from 'react-toastify';

class CustomerList extends Component {
  state = { customers: [], trainings: [] };

  componentDidMount() {
    this.loadCustomers();
  }

  loadCustomers = () => {
    fetch('https://customerrest.herokuapp.com/api/customers')
      .then((response) => response.json())
      .then((responseData) => {
        this.setState({
          customers: responseData.content
        });
      })
  }

  addCustomer(customer) {
    fetch('https://customerrest.herokuapp.com/api/customers',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(customer)
      })
      .then(res => this.loadCustomers())
      .catch(err => console.error(err))
  }

  deleteCustomer = (link) => {
    console.log(link);
    confirmAlert({
      title: '',
      message: 'Do you wish to delete this?',
      confirmLabel: 'Yes',
      cancelLabel: 'Cancel',
      onConfirm: () => {
        fetch(link, { method: 'DELETE' })
        .then(res => this.loadCustomers())
        .catch(err => console.error(err))

        toast.success("Delete succeeded!", {
          position: toast.POSITION.BOTTOM_LEFT
        });
      }
    })
  }

  updateCustomer(customer, link) {
    fetch(link, 
    { method: 'PUT', 
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(customer)
    })
    .then(
      toast.success("Changes saved!", {
        position: toast.POSITION.BOTTOM_LEFT
      })
    )
    .catch( err => console.error(err))
  }

  renderEditable = (cellInfo) => {
    return (
      <div
        style={{ backgroundColor: "#fafafa" }}
        contentEditable
        suppressContentEditableWarning
        onBlur={e => {
          const data = [...this.state.customers];
          data[cellInfo.index][cellInfo.column.id] = e.target.innerHTML;
          this.setState({ customers: data });
        }}
        dangerouslySetInnerHTML={{
          __html: this.state.customers[cellInfo.index][cellInfo.column.id]
        }}
      />
    );
  }  

  render() {
    return (
      <div className="App-body">
        <div className="row">
          <AddCustomer addCustomer={this.addCustomer} loadCustomers={this.loadCustomers} />
        </div>
        <ReactTable data={this.state.customers}
          columns={[
            {
              columns: [
                {
                  Header: "First Name", accessor: "firstname", Cell: this.renderEditable
                },
                {
                  Header: "Last Name", accessor: "lastname", Cell: this.renderEditable
                },
                {
                  Header: "Address", accessor: "streetaddress", Cell: this.renderEditable
                },
                {
                  Header: "Post code", accessor: "postcode", Cell: this.renderEditable
                },
                {
                  Header: "City", accessor: "city", Cell: this.renderEditable
                },
                {
                  Header: "Email", accessor: "email", Cell: this.renderEditable
                },
                {
                  Header: "Phone Number", accessor: "phone", Cell: this.renderEditable
                },
                {
                  id: 'button',
                  sortable: false,
                  filterable: false,
                  accessor: "links." + 0 + ".href",
                  Cell: ({value, row}) => (
                    <button onClick={()=>{this.updateCustomer(row, value)}}>Update</button>)
                },  
                {
                  id: 'button', accessor: "links." + 0 + ".href", sortable: false, filterable: false,
                  Cell: ({value}) => (<button onClick={() => {this.deleteCustomer(value)}}>X</button>)
                }
              ]
            }
          ]}
          defaultPageSize={15}
          filterable>
        </ReactTable>
        <ToastContainer autoClose={1000}/>
      </div>
    );
  }
}

export default CustomerList;