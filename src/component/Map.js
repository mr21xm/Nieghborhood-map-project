/* global google */
import React, {Component} from "react";

import {
 withScriptjs, 
 withGoogleMap, 
 GoogleMap, 
 Marker,
 InfoWindow
} from "react-google-maps";

// composing the google map and the markers
const MyMapComponent = withScriptjs(
	withGoogleMap((props) =>
 
  <GoogleMap 
  	defaultZoom={8}
  	zoom={props.zoom}
   	defaultCenter={{ lat: -34.397, lng: 150.644 }} 
   	center={props.center}
   	>
    {props.markers && 
    	props.markers
    		.filter(marker => marker.isVisible)
    		.map((marker,idx, arr) => {
    			const venueInfo = props.venues.find(venue => venue.id === marker.id)
    			return ( 
    				<Marker 
	    				key={idx} 
	    				position={{ lat: marker.lat , lng: marker.lng }} 
	    				onClick={() => props.handleMarkerClick(marker)}
						animation={arr.length === 1 ? google.maps.Animation.BOUNCE : google.maps.Animation.DROP}
    				>  
    				{marker.isOpen && 
    					venueInfo.bestPhoto && ( 
    						<InfoWindow>
    							<React.Fragment>
    								<img src={`${venueInfo.bestPhoto.prefix}100x100${venueInfo.bestPhoto.suffix}`} alt={venueInfo.name}/>
    								<p>{venueInfo.name}</p>
									<p> Likes : {venueInfo.likes.count}</p>
									<p>Location : {venueInfo.location.address}</p>
									<p>Phone Contact : {venueInfo.contact.formattedPhone}</p>
    							</React.Fragment>
    						</InfoWindow>
    		)}
    			</Marker>
    			);
                })}
  </GoogleMap>
))


// map component
export default class Map extends Component {
	render() {
		return(
			<MyMapComponent
			{...this.props}
  				isMarkerShown
  				googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&key=AIzaSyB3MDmTw0TTCvNztu05oiJMyxes-vxH-R0"
  				loadingElement={<div style={{ height: `100%` }} />}
  				containerElement={<div style={{ height: `100%`, width : `100%` }} />}
  				mapElement={<div style={{ height: `100%` }} />}
			/>

			)
	}
}