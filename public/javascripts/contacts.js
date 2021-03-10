// map variables
var mymap;
var accessToken;

// onload render map and pin/label contacts
$("document").ready(function() {
	// create map centered over Ramapo College
	mymap = L.map("mapid").setView([41.081,-74.176], 13);
	accessToken = "pk.eyJ1IjoiYmFnYWRvbnV0cyIsImEiOiJja2tzbnVyMDMwbnIyMnhxbWVxdnRoc3Z1In0.IXWNtJpEBnXTXDyKVVRC5w";
	
	// add mapbox tile with personal token
	L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
		attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
		maxZoom: 18,
		id: 'mapbox.streets',
		accessToken: accessToken
	}).addTo(mymap);

	// pin contacts to map 
	pinContacts();
	
	// pin contacts to the map with their info as a tooltip
	function pinContacts() {
		people.forEach(function(person) {
			let tooltip = "" + person['firstName'] + ' ' + person['lastName'] + '\n' + person['street'] + '\n' + person['city'] + ' ' + person['state'] + ' ' + person['zip'] + ' ' + person['phone'] + ' ' + person['email'];
			addPin(person['latitude'], person['longitude'], tooltip);
			centerMap(person['latitude'], person['longitude']);
		});
	}
	
	// add pin to map at [lat, long] with a tooltip
	function addPin(long, lat, tooltip) {
		L.marker([long, lat]).bindTooltip(tooltip).addTo(mymap);
	}
	
	// center map on [lat, long]
	function centerMap(lat, long) {
		mymap.panTo(new L.LatLng(lat, long));
	}
	
	// redirect user to mailer
	// todo might remove this for a nav bar
	function createContact() {
		window.location.href = "/mailer";
	}
});