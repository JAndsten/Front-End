import React, { Component } from 'react';
import ReactTable from "react-table";
import "react-table/react-table.css";
import AddTraining from './AddTraining';
import 'react-confirm-alert/src/react-confirm-alert.css';
import  { confirmAlert } from 'react-confirm-alert';
import { ToastContainer, toast } from 'react-toastify';

class TrainingList extends Component {
  state = { trainings: [] };

  componentDidMount() {
    this.loadTrainings();
  }

  loadTrainings = () => {
    fetch('https://customerrest.herokuapp.com/api/trainings')
      .then((response) => response.json())
      .then((responseData) => {
        this.setState({
          trainings: responseData.content,
        });
      })
  }

  addTraining(training) {
    fetch('https://customerrest.herokuapp.com/api/trainings',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(training)
      })
      .then(res => this.loadTrainings())
      .catch(err => console.error(err))
  }

  deleteTraining = (link) => {
    confirmAlert({
      title: '',
      message: 'Do you wish to delete this?',
      confirmLabel: 'Yes',
      cancelLabel: 'Cancel',
      onConfirm: () => {
        fetch(link, { method: 'DELETE' })
        .then(res => this.loadTrainings())
        .catch(err => console.error(err))

        toast.success("Delete succeeded!", {
          position: toast.POSITION.BOTTOM_LEFT
        });
      }
    })
  }

  updateTraining(training, link) {
    fetch(link, 
    { method: 'PUT', 
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(training)
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
          const data = [...this.state.trainings];
          data[cellInfo.index][cellInfo.column.id] = e.target.innerHTML;
          this.setState({ trainings: data });
        }}
        dangerouslySetInnerHTML={{
          __html: this.state.trainings[cellInfo.index][cellInfo.column.id]
        }}
      />
    );
  }  

  render() {
    return (
      <div className="App-body">
        <div className="row">
          <AddTraining addTraining={this.addTraining} loadTrainings={this.loadTrainings} />
        </div>
        <ReactTable data={this.state.trainings}
          columns={[
            {
              columns: [
                {
                  Header: "Date", accessor: "date", Cell: this.renderEditable
                },
                {
                  Header: "Duration (minutes)", accessor: "duration", Cell: this.renderEditable
                },
                {
                  Header: "Activity", accessor: "activity", Cell: this.renderEditable
                },
                {
                  Header: "Customer", accessor: "customer"
                },
                {
                  id: 'button',
                  sortable: false,
                  filterable: false,
                  accessor: "links." + 0 + ".href",
                  Cell: ({value, row}) => (
                    <button onClick={()=>{this.updateTraining(row, value)}}>Update</button>)
                },
                {
                  id: 'button',
                  sortable: false,
                  filterable: false,
                  accessor: "links." + 0 + ".href",
                  Cell: ({ value }) => (<button onClick={() => { this.deleteTraining(value) }}>X</button>)
                }
              ]
            }
          ]}
          defaultPageSize={10}
          filterable>
        </ReactTable>
        <ToastContainer autoClose={1000}/>
      </div>
    );
  }
}

export default TrainingList;