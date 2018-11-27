import React, { Component } from 'react';
import './App.css';
import TrainingList from './TrainingList';

class TrainingApp extends Component {
  render() {
    return (
      <div>
        <header>
          <h1>Sessions</h1>
        </header>
        <TrainingList />
      </div>
    );
  }
}

export default TrainingApp;