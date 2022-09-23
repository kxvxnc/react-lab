import React, { useState } from "react";
import "./App.css";

function City(props) {
  const data = props.info;
  return (
    <div>
      <p>{data.City}, {data.State}</p>
      <ul>
        <li>State: {data.State}</li>
        <li>Location: ({data.Lat}, {data.Long})</li>
        <li>Population (estimated): {data.EstimatedPopulation}</li>
        <li>Total Wages: {data.TotalWages}</li>
      </ul>
    </div>
  );
}

function ZipSearchField(props) {
  const [zipCode, setZipCode] = useState('');
  const [ZipInfo, setZipInfo] = useState([]);

  const handleZipChange = event => {
    const currentZip = event.target.value;
    setZipCode(currentZip);
    console.log(`Got zipcode value: ${currentZip}`);
    if (currentZip.length === 5) {
        fetch(`https://ctp-zip-api.herokuapp.com/zip/${currentZip}`)
        .then((response) => response.json())
        .then((data) => {
            console.log("Data fetched from API: ", data);
            setZipInfo(data);
        });
    } else {
      setZipInfo([]);
    }
  }

  if (ZipInfo && ZipInfo.length) {
    return (
      <div>
        <label>Zip Code:</label>
        <input 
          type="text" 
          name="zipCode" 
          id="zipCode" 
          placeholder="Try 10016"
          onChange={handleZipChange} 
          value={zipCode}></input>
        {ZipInfo.map((zip, i) => {
          return <City info={zip} key={i}/>
        })}
      </div>
    );
  } else {
    return (
      <div>
        <label>Zip Code:</label>
        <input 
          type="text" 
          name="zipCode" 
          id="zipCode" 
          placeholder="Try 10016"
          onChange={handleZipChange} 
          value={zipCode}></input>
          <p>No results found</p>
      </div>
      );
  }
}

function App() {
  return (
    <div className="App">
      <div className="App-header">
        <h1>Zip Code Search</h1>
      </div>
      <div className="mx-auto" style={{ maxWidth: 400 }}>
        <ZipSearchField />
      </div>
    </div>
  );
}

export default App;