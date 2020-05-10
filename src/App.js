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
    this.state = {
      userLongitude: 1,
      userLatitude: 1,
      nearestLocations: [],
      mapActive: false,
      mapLoading: false,
    };
  }
  handleClick(e) {
    e.preventDefault();
    if (navigator.geolocation) {
      this.setState({ mapLoading: true });
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
      mapActive: true,
      mapLoading: false,
    });
  }
  render() {
    const listItems = this.state.nearestLocations.map((location) => (
      <li>
        <a
          href="#"
          class="block hover:bg-gray-50 focus:outline-none focus:bg-gray-50 transition duration-150 ease-in-out"
        >
          <div class="flex items-center px-4 py-4 sm:px-6">
            <div class="min-w-0 flex-1 flex items-center">
              <div class="min-w-0 flex-1 px-4 md:grid md:grid-cols-2 md:gap-4">
                <div>
                  <div class="text-sm leading-5 font-medium text-indigo-600 truncate">
                    {location["Center name"]}
                  </div>
                </div>
                <div class="hidden md:block">
                  <div>
                    <div class="text-sm leading-5 text-gray-900">
                      Applied on
                      <time datetime="2020-01-07">January 7, 2020</time>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <svg
                class="h-5 w-5 text-gray-400"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fill-rule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clip-rule="evenodd"
                />
              </svg>
            </div>
          </div>
        </a>
      </li>
    ));
    return (
      <div className="text-center">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="max-w-3xl mx-auto">
            <p class="text-xl font-semibold my-8">COVID 19 testing locations</p>
            <button
              onClick={this.handleClick}
              type="button"
              class="my-4 inline-flex items-center px-5 py-2 border border-transparent text-xs leading-4 font-medium rounded text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition ease-in-out duration-150"
            >
              Show nearest testing centers
            </button>
            {this.state.mapLoading ? (
              <div class="text-center my-8 text-purple-700 font-medium">
                Loading...
              </div>
            ) : (
              <div className={this.state.mapActive ? "block" : "hidden"}>
                <div class="bg-white shadow overflow-hidden sm:rounded-md my-8">
                  <ul>{listItems}</ul>
                </div>
                <div class="shadow overflow-hidden sm:rounded-md my-8 h-64">
                  {" "}
                  <Map
                    center={[this.state.userLatitude, this.state.userLongitude]}
                    zoom={12}
                  >
                    <TileLayer
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                      attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    />
                    {this.state.nearestLocations.map((location) => (
                      <Marker
                        position={[location.latitude, location.longitude]}
                      />
                    ))}
                  </Map>
                </div>
              </div>
            )}
          </div>
        </div>
        <div class="bg-gray-800 mt-64">
          <div class="max-w-2xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
            <div class="xl:grid xl:grid-cols-3 xl:gap-8">
              <div class="grid grid-cols-2 gap-8 xl:col-span-2">
                <div class="md:grid md:grid-cols-2 md:gap-8">
                  <div>
                    <ul class="mt-4">
                      <li>
                        <a
                          href="#"
                          class="text-base leading-6 text-gray-300 hover:text-white"
                        >
                          About
                        </a>
                      </li>
                      <li class="mt-4">
                        <a
                          href="#"
                          class="text-base leading-6 text-gray-300 hover:text-white"
                        >
                          Privacy Policy
                        </a>
                      </li>
                      <li class="mt-4">
                        <a
                          href="#"
                          class="text-base leading-6 text-gray-300 hover:text-white"
                        >
                          Disclaimer
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div class="mt-8 xl:mt-0">
                <h4 class="text-sm leading-5 font-semibold tracking-wider text-gray-400 uppercase">
                  Data source
                </h4>
                <a
                  href="https://www.icmr.gov.in/"
                  class="text-base leading-6 text-gray-300 hover:text-white"
                >
                  ICMR website
                </a>
              </div>
            </div>
            <div class="mt-8 border-t border-gray-700 pt-8 md:flex md:items-center md:justify-between">
              <div class="flex md:order-2">
                <a
                  href="https://twitter.com/pvsukale"
                  class="ml-6 text-gray-400 hover:text-gray-300"
                >
                  <span class="sr-only">Twitter</span>
                  <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
              </div>
              <p class="mt-8 text-base leading-6 text-gray-400 md:mt-0 md:order-1">
                &copy; 2020 Prithviraj Sukale, All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
