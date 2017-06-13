var config = {
  apiKey: "AIzaSyAqbt-WXCdum0_Hfxh4tWSUOOYDHROswdE",
  databaseURL: "https://hevetica-e4d31.firebaseio.com/"
}

/*Geocoder.configure(
    :timeout => 15,
    :api_key => "AIzaSyAqbt-WXCdum0_Hfxh4tWSUOOYDHROswdE",
    :use_https => true
)*/

firebase.initializeApp(config);
var database = firebase.database();
var userRef = database.ref("user");
var historyRef = database.ref("history");
var marker = null;
var curr_formatted_address = "";
var curr_lat, curr_lng;
var history_loc = new Array();

window.onload = function() { 


	userRef.orderByChild("user_id").equalTo("0").on("child_added", function(snapshot) {

		document.getElementById("user_name").innerHTML = snapshot.val().user_name
		
		document.getElementById("user_account").innerHTML = snapshot.val().user_email
		document.getElementById("user_phonenum").innerHTML = snapshot.val().user_phonenum
	})
};


function initMap() {
	var map = new google.maps.Map(document.getElementById('map'), {
	  center: {lat: -34.397, lng: 150.644},
	  zoom: 6
	});
	var geocoder = new google.maps.Geocoder;
	var infoWindow = new google.maps.InfoWindow({map: map});

	// Try HTML5 geolocation.


	$(document).on('click', '.prev_but', function (e){
		var latitude = $(this).data("lat");
	    var longitude = $(this).data("lng");
	    console.log( latitude + ', ' + longitude );
	    var pos = {
		  lat: latitude,
		  lng: longitude
		};

		infoWindow.setPosition(pos);
		var input = latitude + "," + longitude
		map.setCenter(pos);
		geocodeLatLng(geocoder, map, infoWindow, input);
	});





	//search box
	// Create the search box and link it to the UI element.
	var search_input = document.getElementById('pac-input');
    var searchBox = new google.maps.places.SearchBox(search_input);
    map.controls[google.maps.ControlPosition.TOP_LEFT].push(search_input);

 	// Bias the SearchBox results towards current map's viewport.
    map.addListener('bounds_changed', function() {
      searchBox.setBounds(map.getBounds());
    });

     	var markers = [];
        // Listen for the event fired when the user selects a prediction and retrieve
        // more details for that place.
        searchBox.addListener('places_changed', function() {
          var places = searchBox.getPlaces();

          if (places.length == 0) {
            return;
          }

          // Clear out the old markers.
          markers.forEach(function(marker) {
            marker.setMap(null);
          });
          markers = [];

          // For each place, get the icon, name and location.
          var bounds = new google.maps.LatLngBounds();
          places.forEach(function(place) {
            if (!place.geometry) {
              console.log("Returned place contains no geometry");
              return;
            }

            var latitude = place.geometry.location.lat();
		    var longitude = place.geometry.location.lng();
		    console.log( latitude + ', ' + longitude );
		    var pos = {
			  lat: latitude,
			  lng: longitude
			};

			infoWindow.setPosition(pos);
			var input = latitude + "," + longitude
			map.setCenter(pos);
			geocodeLatLng(geocoder, map, infoWindow, input);



            /*var icon = {
              url: place.icon,
              size: new google.maps.Size(71, 71),
              origin: new google.maps.Point(0, 0),
              anchor: new google.maps.Point(17, 34),
              scaledSize: new google.maps.Size(25, 25)
            };*/

            //console.log(place.geometry.location.lat());
            //console.log(place.geometry.lng);

            // Create a marker for each place.
            /*markers.push(new google.maps.Marker({
              map: map,
              icon: icon,
              title: place.name,
              position: place.geometry.location
            }));*/

          	  /*if(marker != null){
          	  	marker.setMap(null);
          	  }
	          marker = new google.maps.Marker({
				position: place.geometry.location,
				title: place.name,
				map: map
			  });*/

            if (place.geometry.viewport) {
              // Only geocodes have viewport.
              bounds.union(place.geometry.viewport);
            } else {
              bounds.extend(place.geometry.location);
            }
          });
          map.fitBounds(bounds);
        });









	google.maps.event.addListener(map, "click", function (event) {
	    var latitude = event.latLng.lat();
	    var longitude = event.latLng.lng();
	    console.log( latitude + ', ' + longitude );
	    var pos = {
		  lat: latitude,
		  lng: longitude
		};

		infoWindow.setPosition(pos);
		var input = latitude + "," + longitude
		map.setCenter(pos);
		geocodeLatLng(geocoder, map, infoWindow, input);

	});
	
	
	$("#get_location").on("click", "#current", function(event) {
	
	if (navigator.geolocation) {
	  navigator.geolocation.getCurrentPosition(function(position) {
		var pos = {
		  lat: position.coords.latitude,
		  lng: position.coords.longitude
		};
		console.log(pos)
		infoWindow.setPosition(pos);
		var input = position.coords.latitude + "," + position.coords.longitude
		//infoWindow.setContent('Current location')
		map.setCenter(pos);
		//map.setZoom(15);
		geocodeLatLng(geocoder, map, infoWindow, input);
	  }, function() {
		handleLocationError(true, infoWindow, map.getCenter());
	  });
	} else {
	  // Browser doesn't support Geolocation
	  handleLocationError(false, infoWindow, map.getCenter());
	}
	})
	
	/* document.getElementById('submit').addEventListener('click', function() {
          geocodeLatLng(geocoder, map, infoWindow);
        }); */
	
	
  }

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
	infoWindow.setPosition(pos);
	infoWindow.setContent(browserHasGeolocation ?
						  'Error: The Geolocation service failed.' :
						  'Error: Your browser doesn\'t support geolocation.');
  }
  
  
$("#get_location").on("click", "#new_address", function(event) {
		document.getElementById("addr1").value = "";
		document.getElementById("city").value = "";
		document.getElementById("state").value = "";
		document.getElementById("zip").value = "";
		document.getElementById("country").value = "";
		document.getElementById("country").focus();
})

 
function geocodeLatLng(geocoder, map, infowindow, input) {
	var latlngStr = input.split(',', 2);
	var latlng = {lat: parseFloat(latlngStr[0]), lng: parseFloat(latlngStr[1])};

	curr_lat = latlng["lat"];
	curr_lng = latlng["lng"];
	
	geocoder.geocode({'location': latlng}, function(results, status) {
	  if (status === 'OK') {
		if (results[0]) {
		  map.setZoom(15);
		  
		  if(marker != null){
		  	marker.setMap(null);
		  }
		  marker = new google.maps.Marker({
			position: latlng,
			map: map
		  });
		  curr_formatted_address = results[0].formatted_address;
		  infowindow.setContent(results[0].formatted_address);
		  var address = results[0].formatted_address.split(", ");
		  len = results[0].address_components.length;
		  
		  var country = "";
		  //console.log(results[0].address_components
			for (var i=0; i<len; i++) {
				//console.log(results[0].address_components[i].types);
				//console.log(results[0].address_components[i].types.indexOf("country"));
				if (results[0].address_components[i].types.indexOf("country") != -1) {
					country = results[0].address_components[i].long_name;
					console.log("country name : " + country);
				}
			}

		  	if(address[0] == country){
		  		//console.log("orientation cor");
				document.getElementById("country").value = address[0];
				document.getElementById("state").value = address[1];
				document.getElementById("city").value = address[2];
				document.getElementById("zip").value = results[0].address_components[len-1].long_name;
				document.getElementById("addr1").value = address[3];
			}else{
		  		//console.log("orientation opp");
		  		//console.log(address);
		  		//console.log(address.length);
		  		//console.log(results);
				document.getElementById("country").value = address[address.length-1];
				document.getElementById("state").value = address[address.length-2];
				document.getElementById("city").value = address[address.length-3];
				document.getElementById("zip").value = results[0].address_components[len-1].long_name;
				document.getElementById("addr1").value = address[address.length-4];
			}
		  //document.getElementById("addr2").value = address[4]


				  
		  infowindow.open(map, marker);
		} else {
		  window.alert('No results found');
		}
	  } else {
		window.alert('Geocoder failed due to: ' + status);
	  }
	});
}

$("#submit_btn").on("click", "#buy_now", function(event) {
	alert("Address Info submitted!");
	historyRef.push({
		"user_name":"Eojin Rho",
		"formatted_address":curr_formatted_address,
		"lat":curr_lat,
		"lng":curr_lng
	});
})

function historyListener(){
	historyRef.on("value",function(snapshot){
		history_loc = [];
		snapshot.forEach(function(child) {
	    	var single_val = child.val();
	    	history_loc.unshift({
	    		"user_name":single_val["user_name"],
	    		"formatted_address":single_val["formatted_address"],
	    		"lat":single_val["lat"],
	    		"lng":single_val["lng"]
	    	});
	  	});
	  	//console.log(history_loc);
	  	refreshDropdown();
	}, function (errorObject){
		console.log("The read failed: " + errorObject.code);
	});
}

function refreshDropdown(){
	$("#prev_location li").remove();

	for(var i=0;i<history_loc.length;i++) {
		//console.log(history_loc[i]["lat"]);
		//console.log(history_loc[i]["lng"]);
		$("#prev_location").append(
			`<li class="prev_but" role="presentation" data-lat=${history_loc[i]["lat"].toString()} data-lng=${history_loc[i]["lng"].toString()}><a role="menuitem" tabindex="-1" href="#">${history_loc[i]["formatted_address"]}</a></li>`
		);
    }
}

historyListener();