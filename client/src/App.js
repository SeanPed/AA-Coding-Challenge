import React, { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [adsData, setAdsData] = useState();

  useEffect(() => {
    fetch("http://localhost:3001")
      .then((response) => response.json())
      .then((data) => setAdsData(data));
  }, []);
  console.log(adsData);

  if (adsData === undefined) {
    return <div>Please wait for Data fetching</div>;
  }
  if (adsData.position1[0] === undefined) {
    return (
      <div className="App">
        <div className="Ad_Area_Position_2">
          <a href={adsData.position2[0].link} target="_blank">
            <img
              src={adsData.position2[0].image}
              width={adsData.position2[0].width}
              height={adsData.position2[0].height}
            />
          </a>
        </div>
      </div>
    );
  }
  else if (adsData.position2[0] === undefined) {
    return (
      <div className="App">
        <div className="Ad_Area_Position_1">
          <a href={adsData.position1[0].link} target="_blank">
            <img
              src={adsData.position1[0].image}
              width={adsData.position1[0].width}
              height={adsData.position1[0].height}
            />
          </a>
        </div>
      </div>
    );
  }
  return (
    <div className="App">
      <div className="Ad_Area_Position_1">
        <a href={adsData.position1[0].link} target="_blank">
          <img
            src={adsData.position1[0].image}
            width={adsData.position1[0].width}
            height={adsData.position1[0].height}
          />
        </a>
      </div>
      <div className="Ad_Area_Position_2">
        <a href={adsData.position2[0].link} target="_blank">
          <img
            src={adsData.position2[0].image}
            width={adsData.position2[0].width}
            height={adsData.position2[0].height}
          />
        </a>
      </div>
    </div>
  );
}
export default App;
