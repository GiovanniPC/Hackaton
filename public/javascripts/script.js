function startMap() {
  const geocoder = new google.maps.Geocoder();
  const infowindow = new google.maps.InfoWindow();

  // Store Ironhack's coordinates
  const SP = { lat: -23.5821604, lng: -46.6754915 };

  // Initialize the map
  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 15,
    center: SP
  });

  const places = [
    ['Alameda Jau 1301', -23.558295, -46.660128],
    ['Av. Paulista 2034', -23.558295, -46.659317],
    ['R. Augusta	1856', -23.558489, -46.661280],
    ['R. Pamplona 734', -23.564073, -46.654711],
    ['Av. Goiás 1805', -23.616041, -46.558186],
    ['R. Mal. Deodoro 1322', -23.709483, -46.551156],
    ['R. Aurora Soares Barbosa 775', -23.546185, -46.771921],
    ['R. WALDIR DE AZEVEDO 20', -23.4493259, -46.5227249],
    ['R. Sebastião Pereira 245', -23.5396746, -46.6512313],
    ['Av. Rui Barbosa 409', -23.520891, -46.8366406],
    ['Av. Antonio Piranga 171', -23.6862461, -46.6248957],
    ['Av. Vital Brasil 1133', -23.5694574, -46.7172928],
    ['Av. Alcântara Machado 576', -23.5453813, -46.5999577 ],
    ['Av. Imirim	1217', -23.4943959, -46.6484702],
    ['Av. Roque Petroni Júnior 1089', -23.626226, -46.6903769]];

    places.forEach(element => {
      console.log(element)
      let marker = new google.maps.Marker({
        map: map,
        position: {
          lat: element[1],
          lng: element[2]
        },
      });

    });

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      function(position) {
        const user_location = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };

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
