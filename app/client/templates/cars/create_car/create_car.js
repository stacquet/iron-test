/*****************************************************************************/
/* CreateCar: Event Handlers */
/*****************************************************************************/
Template.CreateCar.events({
});

/*****************************************************************************/
/* CreateCar: Helpers */
/*****************************************************************************/
Template.CreateCar.helpers({
});

/*****************************************************************************/
/* CreateCar: Lifecycle Hooks */
/*****************************************************************************/
Template.CreateCar.created = function () {

};

Template.CreateCar.rendered = function () {
	var mapsService={
			markers : []
	};
	var input = /** @type {HTMLInputElement} */(document.getElementById('pac-input'));
	var searchBox = new google.maps.places.SearchBox(/** @type {HTMLInputElement} */(input));
	var options = {
		center: new google.maps.LatLng(40.7127837, -74.00594130000002),
		zoom: 13,
		disableDefaultUI: true    
	}
	mapsService.map= new google.maps.Map(
	    document.getElementById("map"), options
	);
	mapsService.places = new google.maps.places.PlacesService(mapsService.map);
	google.maps.event.addListener(searchBox, 'places_changed', function() {
	  var places = searchBox.getPlaces();

	  if (places.length == 0) {
	    return;
	  }
	  for (var i = 0, marker; marker = mapsService.markers[i]; i++) {
	    marker.setMap(null);
	  }

	  // For each place, get the icon, place name, and location.
	  mapsService.markers = [];
	  mapsService.bounds = new google.maps.LatLngBounds();
	  for (var i = 0, place; place = places[i]; i++) {
	  	console.log(place);
	    addMarker(place,true);
	    mapsService.markers.push(marker);
	    mapsService.bounds.extend(place.geometry.location);
	  }

	  mapsService.map.fitBounds(mapsService.bounds);
	  mapsService.map.setZoom(11);
	});

	google.maps.event.addListener(mapsService.map, 'bounds_changed', function() {
	  var bounds = mapsService.map.getBounds();
	  searchBox.setBounds(bounds);
	});
	function addMarker(place,clickEvent) {
			// Create a marker for each place.
			var marker = new google.maps.Marker({
				map: mapsService.map,
				name: place.name,
				position: place.geometry.location,
	        	animation: google.maps.Animation.DROP
			});
			if(clickEvent){
				
			}
			console.log('ajout marker');
			mapsService.markers.push(marker);
	    }
};

Template.CreateCar.destroyed = function () {

};
