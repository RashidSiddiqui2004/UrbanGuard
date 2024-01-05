import React from "react";
import GoogleMapReact from 'google-map-react';
 
export default function MyMap({latitude,longitude}){
  const defaultProps = {
    center: {
      lat: latitude,
      lng: longitude
    },
    zoom: 11
  };

  return (
    // Important! Always set the container height explicitly
    <div style={{ height: '100vh', width: '100%' }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: "AIzaSyD0RNJiZjfpDn3O4tyiXvFTY2MFepcnV9s" }}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
      >
        {/* <AnyReactComponent
          lat={59.955413}
          lng={30.337844}
          text="My Marker"
        /> */}

      </GoogleMapReact>
    </div>
  );
}

 