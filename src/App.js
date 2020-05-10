import React from "react";
import "./App.css";
import { Map, Marker, TileLayer } from "react-leaflet";
import * as geolib from "geolib";
import testCenters from "./data/testing-centers";

class App extends React.Component {
  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this);
    this.displayLocationInfo = this.displayLocationInfo.bind(this);
    this.state = { userLongitude: 1, userLatitude: 1, nearestLocations: [] };
  }
  handleClick(e) {
    e.preventDefault();
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.displayLocationInfo);
    } else {
      console.log("We don't have geolocation");
    }
  }

  displayLocationInfo(position) {
    const lng = position.coords.longitude;
    const lat = position.coords.latitude;
    this.setState({ userLatitude: lat, userLongitude: lng });
    let userLocation = { longitude: lng, latitude: lat };
    let orderedByDistance = geolib.orderByDistance(userLocation, testCenters);
    this.setState({
      userLatitude: lat,
      userLongitude: lng,
      nearestLocations: orderedByDistance,
    });
  }
  render() {
    const listItems = this.state.nearestLocations.map((location) => (
      <li>{location["Center name"]}</li>
    ));
    return (
      <div className="text-center">
        <h1 class="text-xl font-semibold my-8">COVID 19 testing locations</h1>
        <button onClick={this.handleClick} type="button" class="my-4 inline-flex items-center px-5 py-2 border border-transparent text-xs leading-4 font-medium rounded text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition ease-in-out duration-150">
        Show nearest testing centers
        </button>
        <Map
          center={[this.state.userLatitude, this.state.userLongitude]}
          zoom={12}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          />
        {this.state.nearestLocations.map(location => (
        <Marker
          
          position={[location.latitude, location.longitude]}
        />
      ))}
        </Map>
        <ol>{listItems}</ol>
        
      </div>
    );
  }
}

export default App;
