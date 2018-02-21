import React from 'react';
import DataTable from './DataTable';
import {Tabs, Tab} from 'react-bootstrap';
import '../TimetableTabs.css';

class TimetableTabs extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      trains: [],
      url: "https://rata.digitraffic.fi/api/v1/live-trains/"
    }
  }

  componentDidMount() {
    fetch(this.state.url)
    .then(response => response.json())
    .then(data => this.setState({ trains: data}));     
  }


  shortCode(station, array) {
    for (let i = 0; i < array.length; i++) {
      if (array[i].stationName.slice(-5, -1) === "asem") {
        if (station === array[i].stationName.slice(0, array[i].stationName.length-6) ||
            station === (array[i].stationName.slice(0, array[i].stationName.length-6)).toLowerCase()) {
          return array[i].stationShortCode;
        }
      }
      if (station === array[i].stationName || station === array[i].stationName.toLowerCase()) {
        return array[i].stationShortCode;
      }
    }
  }
  
  
  renderTable(direction) {
    let code = this.shortCode(this.props.currentName, this.props.stationNames);
      if (direction === 0) {
        return <DataTable 
                 code = {code}
                 direction = "ARRIVAL"
                 stationNames = {this.props.stationNames}
                 trains = {this.state.trains}
               />;
      }
      else if (direction === 1) {
        return <DataTable 
                 code = {code}
                 direction = "DEPARTURE"
                 stationNames = {this.props.stationNames}
                 trains = {this.state.trains}
               />;
      }

  }
  
  


  render() {
  

  
    return (
      <Tabs id={1} defaultActiveKey={0}>
        <Tab eventKey={0} title="Saapuvat">
          {this.renderTable(0)}
        </Tab>
        <Tab eventKey={1} title="Lähtevät">
          {this.renderTable(1)}
        </Tab>
      </Tabs>
    );
  }
}

export default TimetableTabs;