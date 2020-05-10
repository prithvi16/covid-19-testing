import React from "react";
import "./App.css";
import { Map, Marker, Popup, TileLayer } from "react-leaflet";
import { Icon } from "leaflet";

class App extends React.Component {
  constructor() {
    super();
    console.log("coming to constructor");
    this.handleClick = this.handleClick.bind(this);
    this.displayLocationInfo = this.displayLocationInfo.bind(this);
    this.state = { userLongitude: 1, userLatitude: 1 };
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
    console.log(this.state);
  }
  render() {
    return (
      <div className="App">
        <h1>COVID 19 testing locations</h1>
        <button onClick={this.handleClick}>Show my location</button>
        <h2>
          Your location is {this.state.userLongitude} and{" "}
          {this.state.userLatitude}
        </h2>
        <Map
          center={[this.state.userLatitude, this.state.userLongitude]}
          zoom={12}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          />
        </Map>
      </div>
    );
  }
}

export default App;
