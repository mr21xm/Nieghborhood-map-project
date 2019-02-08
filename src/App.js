import React, { Component } from 'react';
import './App.css';
import Map from "./component/Map"
import SquareAPI from "./API/"
import SideBar from './component/SideBar'
import axios from 'axios'
//App component
class App extends Component {
  //the state of this component
  constructor() {
    super();

    this.state= {

      isHidden: true,
      venues:[],
      marker:[],
      center:[],
      zoom:12,
      updateState: obj => {
        this.setState(obj);
      }
    }

  }


// this closes the other markers
closeAllMarkers= () =>
{
  const markers= this.state.markers.map(marker => {
    marker.isOpen =false;
    return marker;
  });
  this.setState({marker: Object.assign(this.state.markers, markers)})
};

  // when marker is clicked
handleMarkerClick = marker => {
  this.closeAllMarkers();
  console.log(marker)
  marker.isOpen = true;
  this.setState({marker: Object.assign(this.state.markers,marker) });
  const venue = this.state.venues.find(venue => venue.id === marker.id);

// get data from the marker that was clicked
  SquareAPI.getVenueDetails(marker.id).then(res => {
    const newVenue = Object.assign(venue, res.response.venue);
    this.setState({ venues: Object.assign(this.state.venues, newVenue)});
   console.log(newVenue)

 });
  };
// hides the sidebar when the hamburger is clicked
  toggleHidden () {
    this.setState({
      isHidden: !this.state.isHidden
    })
  }


//  when one of the lists is clicked the marker of the same list is passed on the handlemarkerclick function
  handleListItemClick = venue => {
    const marker= this.state.markers.find(marker => marker.id === venue.id);
    this.handleMarkerClick(marker);
  }

  //  after the component mounted is handles the search of the places that displays on the list and markers and the map's locations
  componentDidMount() {
    axios.get({
      near: "Abu dhabi, UAE",
      query: "cafe",
      limit:15
    }).then(results => {
      const {venues} = results.response;
      const {center} = results.response.geocode.feature.geometry;
      const markers = venues.map(venue => {
        return {
          lat:venue.location.lat,
          lng:venue.location.lng,
          isOpen:false,
          isVisible:true,
          id:venue.id
        };
      });
      this.setState({venues, center, markers});
      console.log(results)
    });
  }


// renders the interface UI for the app with all the components
  render() {
    return (
        <div>
          <nav>
            <span className="icon">
            <i className="fas fa-bars" onClick={this.toggleHidden.bind(this)} onKeyPress={this.toggleHidden.bind(this)} tabIndex="0"></i>
          </span>
            <h1 tabIndex="0">NeighborHood</h1>

        </nav>
      <div className="App">

        {!this.state.isHidden && <SideBar {...this.state}
        handleListItemClick={this.handleListItemClick}/>}
        <Map {...this.state} 
        handleMarkerClick={this.handleMarkerClick}/>
      </div>
        </div>
    );
  }
}

export default App;
