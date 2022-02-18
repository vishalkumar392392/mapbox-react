import mapboxgl from "!mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax
import { useEffect, useRef, useState } from "react";
import  './App1.css'

mapboxgl.accessToken =
  "pk.eyJ1IjoidmlzaGFsa3VtYXIzOTIiLCJhIjoiY2t6czlibHZ1NDlxcTJ5bnJqdnBua2tlZiJ9.udJvqdKsdqEMt7dNcWdnvQ";
export default function App1() {
  const map = useRef(null);

  const geojson = {
    type: "FeatureCollection",
    features: [
      {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [-77.032, 38.913],
        },
        properties: {
          title: "Mapbox",
          description: "Washington, D.C.",
        },
      },
      {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [-122.414, 37.776],
        },
        properties: {
          title: "Mapbox",
          description: "San Francisco, California",
        },
      },
    ],
  };

  useEffect(() => {

    map.current = new mapboxgl.Map({
      container: "map",
      style: "mapbox://styles/mapbox/light-v10",
      center: [-96, 37.8],
      zoom: 3,
    });

    // add markers to map
    for (const feature of geojson.features) {
      console.log(feature);
      // create a HTML element for each feature
      const el = document.createElement("div");
      el.className = "marker";

      // make a marker for each feature and add it to the map
      new mapboxgl.Marker(el)
        .setLngLat(feature.geometry.coordinates)
        .setPopup(
          new mapboxgl.Popup({ offset: 25 }) // add popups
            .setHTML(
              `<h3>${feature.properties.title}</h3><p>${feature.properties.description}</p>`
            )
        )
        .addTo(map.current);
    }
  });

  return (
    <div>
      <div id="map" ></div>
    </div>
  );
}
