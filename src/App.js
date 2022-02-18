import mapboxgl from "!mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax
import { useEffect, useRef, useState } from "react";
import { stores } from "./GeoJson";

stores.features.forEach((store, i) => {
  store.properties.id = i;
});

mapboxgl.accessToken =
  "pk.eyJ1IjoidmlzaGFsa3VtYXIzOTIiLCJhIjoiY2t6czlibHZ1NDlxcTJ5bnJqdnBua2tlZiJ9.udJvqdKsdqEMt7dNcWdnvQ";
stores.features.forEach(function (store, i) {
  store.properties.id = i;
});
export default function App() {
  const map = useRef(null);
  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: "map",
      style: "mapbox://styles/mapbox/light-v10",
      center: [-77.034084142948, 38.909671288923],
      zoom: 13,
      scrollZoom: false,
    });
  }, []);

  useEffect(() => {

    if (!map.current) return;
    map.current.on("load", () => {
      /* Add the data to your map as a layer */
      map.current.addLayer({
        id: "locations",
        type: "circle",
        /* Add a GeoJSON source containing place coordinates and information. */
        source: {
          type: "geojson",
          data: stores,
        },
      });

      // map.current.addSource('places', {
      //   'type': 'geojson',
      //   'data': stores
      // });

      // stores.features.map(marker => (
      //   new mapboxgl.Marker()
      //               .setLngLat(marker.geometry.coordinates)
      //               .addTo(map.current)
      // ))

      

    });

  });

  const handleOnClick = (event,feature) => {
      flyToStore(feature);
      // createPopUp(feature);
  }
  const buildLocationList = (stores) => {
   return stores.features.map((store,index) => (
      <div className="item" key={index}>
        <a href="#" className="title" id={`link-${store.properties.id}`} 
         onClick={(e) =>handleOnClick(e,store)}
         >
          {" "}
          {store.properties.address}
        </a>
        <div>
          {store.properties.city +
            (store.properties.phone ? ` ${store.properties.phoneFormatted}` : ``) +
            (store.properties.distance
              ? `<div><strong>${
                  Math.round(store.properties.distance * 100) / 100
                } miles away</strong></div>`
              : "")}
        </div>
      </div>
    ));
  };

  const flyToStore = (currentFeature) => {
    map.current.flyTo({
      center: currentFeature.geometry.coordinates,
      zoom: 15
    });
  }

  const createPopUp = (currentFeature) => {
    const popUps = document.getElementsByClassName('mapboxgl-popup');
    /** Check if there is already a popup on the map and if so, remove it */
    if (popUps[0]) popUps[0].remove();
  
    const popup = new mapboxgl.Popup({ closeOnClick: false })
      .setLngLat(currentFeature.geometry.coordinates)
      .setHTML(`<h3>Sweetgreen</h3><h4>${currentFeature.properties.address}</h4>`)
      .addTo(map.current);
  }

  return (
    <div>
      <div className="sidebar">
        <div className="heading">
          <h1>Our locations</h1>
        </div>
        <div id="listings" className="listings">{buildLocationList(stores)}</div>
      </div>
      <div id="map" className="map"></div>
    </div>
  );
}
