import React, { Component } from 'react';
import {FormControl} from 'react-bootstrap';
import './App.css';
import Header from './components/Header';
import TimetableTabs from './components/TimetableTabs';

class App extends Component {


  constructor(props) {
    super(props);
    this.state = {
      stationNames: [],
      currentName: '',
    };
    this.handleChange = this.handleChange.bind(this);
  }
  
  
  componentDidMount() {
    fetch('https://rata.digitraffic.fi/api/v1/metadata/stations')
    .then(response => response.json())
    .then(data => this.setState({ stationNames: data}));     
  }
  
  handleChange(e) {
    this.setState({ currentName: e.target.value });
  }
  
  



  render() {
    return (
      <div className="container-fluid">
        <Header />
        <FormControl type="text" 
          placeholder="Aseman nimi..."
          value={this.state.value}
          onChange={this.handleChange}
        />
        <TimetableTabs 
          stationNames = {this.state.stationNames}
          currentName = {this.state.currentName}
        />
      </div>
    );
  }
}

export default App;
