import './App.css';
import ReactMapGL, { Marker } from 'react-map-gl'
import { useState } from 'react';
import  data from './data/sample.json';
import { IconButton } from '@material-ui/core';
import LocationOnIcon from '@material-ui/icons/LocationOn';
function App() {

  const [viewport, setViewport] = useState({
    latitude: 38.578433,
    longitude: -121.499908,
    width: '100vw',
    height: '100vh',
    zoom:10
  });
  return (
    <div >
      <ReactMapGL 
      initialViewState={viewport}
      mapboxAccessToken="pk.eyJ1IjoidmlzaGFsa3VtYXIzOTIiLCJhIjoiY2t6czlibHZ1NDlxcTJ5bnJqdnBua2tlZiJ9.udJvqdKsdqEMt7dNcWdnvQ"
      mapStyle="mapbox://styles/vishalkumar392/ckzs9ooyu009o15npb90uf13m"
      style={{width:1200, height: 600}}
      onDrag={viewport => {setViewport(viewport)}}
      >
        {data.providers.map((provider,index)=> {
          console.log("lat: ",provider.providerAddress[0].lat);
          return (
            <Marker 
              key={index}
              latitude={provider.providerAddress[0].lat}
              longitude={provider.providerAddress[0].lon}
            >
               {/* <IconButton>
                <LocationOnIcon/>
              </IconButton>  */}
              <button
              className="marker-btn"
              
            >
              <img src="/skateboarding.svg" alt="Skate Park Icon" />
            </button>
            </Marker>
          )
        })}
      </ReactMapGL>
    </div>
  );
}

export default App;
