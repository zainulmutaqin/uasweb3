import React, { Component } from "react";
import './App.css';
import './table.css'

class Table extends Component {
    constructor(props) {
      super(props);
      this.state = {
        items: []
      };
    }
  
    componentDidMount() {
      fetch("https://api.openweathermap.org/data/2.5/forecast?q=Yogyakarta,id&mode=json&appid=19a073d448028f689de754486b619e93&units=metric")
      .then(res => res.json())
      .then(parsedJSON => parsedJSON.list.map(data => (
        {
          dt_txt: `${data.dt_txt}`,
          temp: `${data.main.temp}`,
          temp_min: `${data.main.temp_min}`,
          temp_max: `${data.main.temp_max}`,
          weather: `${data.weather[0].main}`,
        }
      )))
      .then(items => this.setState({
        items,
        isLoaded: false
      }))
      .catch(error => console.log('parsing failed', error))
    }
  
    render() {
      const {items} = this.state;
      return (
        <div>
          <div style={{textAlign:"center"}}>
          <h1 className="text-center">Prakiraan Cuaca Yogyakarta</h1>
          </div>
          <table align="center" className="table table-bordered" border="1" width="75%" id="customers">
            <thead>
              <tr>
                <th scope="col">Datetime</th>
                <th scope="col">Temp</th> 
                <th scope="col">Temp Min</th>
                <th scope="col">Temp Max</th>
                <th scope="col">Weather</th>
              </tr>
            </thead>
            <tbody>
              {
                items.length > 0 ? items.map(item => {
                  const {dt_txt,temp,temp_min,temp_max,weather} = item;
                  return (
                    <tr key={dt_txt}>
                      <td>{dt_txt}</td>
                      <td>{temp}</td>
                      <td>{temp_min}</td>
                      <td>{temp_max}</td>
                      <td>{weather}</td>
                    </tr>  
                  );
                }) : null
              }
            </tbody>  
          </table>
        </div>
      );
    }
  }
   
  export default Table;