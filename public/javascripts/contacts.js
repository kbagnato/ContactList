// map variables
var map;

// onload render map and pin/label contacts
$("document").ready(function () {
	// init mapbox on page
	mapboxgl.accessToken = 'pk.eyJ1IjoiYmFnYWRvbnV0cyIsImEiOiJja2tzbnVyMDMwbnIyMnhxbWVxdnRoc3Z1In0.IXWNtJpEBnXTXDyKVVRC5w';

	// define map on page
	map = new mapboxgl.Map({
		container: 'map',
		// style: 'mapbox://styles/mapbox/outdoors-v11', // stylesheet location
		style: 'mapbox://styles/mapbox/streets-v11',
		// center: [-83.75, 35.58],
		// zoom: 12.5,
		// pitch: 61,
		// bearing: 118
	});

	// add map features when loaded
	addContacts();
});

function addContacts() {
	// pin contacts to map 
	people.forEach(function (person) {
		console.log(person);
		let tooltip = "" + person['firstName'] + ' ' + person['lastName'] + '\n' + person['street'] + '\n' + person['city'] + ' ' + person['state'] + ' ' + person['zip'] + ' ' + person['phone'] + ' ' + person['email'];
		addPin(person['longitude'], person['latitude'], tooltip);
		centerMap(person['longitude'], person['latitude']);
	});

	
	// add pin to map at [lat, long] with a tooltip
	function addPin(long, lat, tooltip) {
		// L.marker([long, lat]).bindTooltip(tooltip).addTo(map);
		var marker = new mapboxgl.Marker().setLngLat([long, lat]).addTo(map);
	}
	
	// center map on [long, lat]
	function centerMap(long, lat) {
		map.panTo(new L.LatLng(long, lat));
	}
}

// redirect user to mailer
// todo might remove this for a nav bar
function createContact() {
	window.location.href = "/mailer";
}
