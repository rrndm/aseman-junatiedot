import React from 'react';
import {Table} from 'react-bootstrap';
import '../DataTable.css';

class DataTable extends React.Component {



  
  getStationName (shortCode) {
    for (let i = 0; i < this.props.stationNames.length; i++) {
      if (shortCode === this.props.stationNames[i].stationShortCode) {
        if (this.props.stationNames[i].stationName.includes(' ')) {
          return this.props.stationNames[i].stationName.split(" ")[0];
        }
        else {
          return this.props.stationNames[i].stationName;
        }
      }
    }
  }
  
  filterTrains (array) {
    let now = new Date();
    var tableContent = [];
    var tableRow = "";
    for (let i = 0; i < array.length; i++) {
      for (let j = 0; j < array[i].timeTableRows.length; j++) {
        if (array[i].timeTableRows[j].stationShortCode === this.props.code &&
            array[i].timeTableRows[j].type === this.props.direction && array[i].trainCategory !== "Cargo" && array[i].trainCategory !== "Shunting" ) {
          let time = new Date(array[i].timeTableRows[j].scheduledTime);
          if ((time - now) > 0) {
          

          
            if (array[i].commuterLineID !== "") {
              
              tableRow = ["Commuter train " + array[i].commuterLineID, 
                          this.getStationName(array[i].timeTableRows[0].stationShortCode), 
                          this.getStationName(array[i].timeTableRows[array[i].timeTableRows.length-1].stationShortCode), 
                          array[i].timeTableRows[j].scheduledTime,
                          array[i].timeTableRows[j].liveEstimatedTime,
                          array[i].cancelled]
            
            }
            else {
            
              tableRow = [array[i].trainType + " " + array[i].trainNumber, 
                              this.getStationName(array[i].timeTableRows[0].stationShortCode), 
                              this.getStationName(array[i].timeTableRows[array[i].timeTableRows.length-1].stationShortCode), 
                              array[i].timeTableRows[j].scheduledTime,
                              array[i].timeTableRows[j].liveEstimatedTime,
                              array[i].cancelled]
            
            }
            
            tableContent.push(tableRow);
          }
        }
      }
    }
    tableContent.sort(function(a, b) {
      var x = new Date(a[3]);
      var y = new Date(b[3]);
      return x - y;
    });
    return tableContent;
  }
  
  


  render() {
    var tableRows = this.filterTrains(this.props.trains);
    
    var estimatedTimeClass;
    
    var content = [];
    
    for (let i = 0; i < 10; i++) {
      if (tableRows[i]) {
        var d = new Date(tableRows[i][3]);
        var time = "" + d.getHours() + ":" + (d.getMinutes() < 10 ? "0" + d.getMinutes() : d.getMinutes());
        tableRows[i][3] = time; 
        if (tableRows[i][5]) {
          content.push(<tr key={i}>
                         <td className="cancelled">{tableRows[i][0]}</td>
                         <td className="cancelled">{tableRows[i][1]}</td>
                         <td className="cancelled">{tableRows[i][2]}</td>
                         <td className="cancelled">{tableRows[i][3]}
                         <br></br><span className="cancelText">Cancelled</span></td>
                       </tr>);
        }
        
        else if (tableRows[i][4]) {
          var d2 = new Date(tableRows[i][4]);
          var time2 = "" + d2.getHours() + ":" + (d2.getMinutes() < 10 ? "0" + d2.getMinutes() : d2.getMinutes());
          tableRows[i][4] = time2;
          
          if (d2 - d <= 0)
            estimatedTimeClass = "early";
          else
            estimatedTimeClass = "late";
            
          content.push(<tr key={i}>
                         <td>{tableRows[i][0]}</td>
                         <td>{tableRows[i][1]}</td>
                         <td>{tableRows[i][2]}</td>
                         <td className={estimatedTimeClass}>{tableRows[i][4]}</td>
                       </tr>);
          
        }  
        else {
         
      
          content.push(<tr key={i}>
                         <td>{tableRows[i][0]}</td>
                         <td>{tableRows[i][1]}</td>
                         <td>{tableRows[i][2]}</td>
                         <td>{tableRows[i][3]}</td>
                       </tr>);
        }
      }
      else {
        break;
      }
    }
    
    
    return (
      <Table striped responsive>
        <thead>
          <tr>
            <th><small>Juna</small></th>
            <th><small>Lähtöasema</small></th>
            <th><small>Pääteasema</small></th>
            <th><small>Saapuu</small></th>
          </tr>
        </thead>
        <tbody>
          {content}
        </tbody>
      </Table>
    );
  }
}

export default DataTable;