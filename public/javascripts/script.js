function startMap() {
  const geocoder = new google.maps.Geocoder();
  const infowindow = new google.maps.InfoWindow();

  // Store Ironhack's coordinates
  const SP = { lat: -23.5821604, lng: -46.6754915 };

  // Initialize the map
  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 10,
    center: SP
  });

  function geocodeAddress(geocoder, resultsMap, user) {
    geocoder.geocode({ address: user.address }, function(results, status) {
      if (status === "OK") {
        let marker = new google.maps.Marker({
          map: resultsMap,
          position: results[0].geometry.location
        });

        // const fullName = `${user.firstName} ${user.lastName} <br> ${
        //   user.email
        // }`;

        google.maps.event.addListener(marker, "click", function() {
          infowindow.setContent(fullName);
          infowindow.open(map, this);
        });
      } else {
        console.log("Geocode was not successful for the following reason: " + status);
      }
    });
  }

  const places = [
    'Alameda Jau 1301',
    'Av. Paulista 2034',
    'R. Augusta	1856',
    'R. Pamplona 734',
    'Av. Goiás 1805',
    'R. Mal. Deodoro 1322',
    'R. Aurora Soares Barbosa 775',
    'R. WALDIR DE AZEVEDO 20',
    'R. Sebastião Pereira 245',
    'Av. Rui Barbosa 409',
    'Av. Antonio Piranga 171',
    'Av. Vital Brasil 1133',
    'Av. Alcântara Machado 576',
    'Av. Imirim	1217',
    'Av. Roque Petroni Júnior 1089'];

    // places.forEach(element => {
    //   console.log(element)
    //   geocodeAddress(geocoder, map, element);
    // });

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      function(position) {
        const user_location = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };

        // Center map with user location
        // map.setCenter(user_location);

        // Add a marker for your user location
        const userLocation = new google.maps.Marker({
          position: {
            lat: user_location.lat,
            lng: user_location.lng
          },
          map: map,
          title: "You are here."
        });

        map.setCenter(user_location);
      }
    );
  } else {
    console.log("Browser does not support geolocation.");
  }
}

startMap();
