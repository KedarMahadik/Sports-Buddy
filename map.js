// Initialize Map
function initMap() {
    // Default location (e.g., Central Park, New York)
    const defaultLocation = { lat: 40.785091, lng: -73.968285 };
  
    // Create a map centered at the default location
    const map = new google.maps.Map(document.getElementById("map"), {
      zoom: 12,
      center: defaultLocation,
    });
  
    // Add a marker for the default location
    new google.maps.Marker({
      position: defaultLocation,
      map: map,
      title: "Central Park",
    });
  
    // Optional: Add markers for nearby users or events
    const nearbyUsers = [
      { lat: 40.774091, lng: -73.971285, title: "John Doe (Football)" },
      { lat: 40.776091, lng: -73.965285, title: "Jane Smith (Tennis)" },
    ];
  
    nearbyUsers.forEach((user) => {
      new google.maps.Marker({
        position: { lat: user.lat, lng: user.lng },
        map: map,
        title: user.title,
      });
    });
  
    // Optional: Enable location-based search
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userLocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
  
          // Center the map on the user's location
          map.setCenter(userLocation);
  
          // Add a marker for the user's location
          new google.maps.Marker({
            position: userLocation,
            map: map,
            title: "Your Location",
          });
        },
        () => {
          alert("Unable to retrieve your location.");
        }
      );
    } else {
      alert("Geolocation is not supported by your browser.");
    }
  }