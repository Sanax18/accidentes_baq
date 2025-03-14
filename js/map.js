let map, marker, geocoder;

function initMap() {
    // Inicializa el mapa centrado en una ubicación predeterminada
    map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: 10.9878, lng: -74.7889 }, 
        zoom: 14,
    });

    const trafficLayer = new google.maps.TrafficLayer();
    trafficLayer.setMap(map);

    // Inicializa el geocoder
    geocoder = new google.maps.Geocoder();

    // Agrega un evento para obtener la latitud y longitud al hacer clic en el mapa
    map.addListener("click", (event) => {
        const lat = event.latLng.lat();
        const lng = event.latLng.lng();

        // Coloca el marcador en la ubicación seleccionada
        if (marker) {
            marker.setPosition(event.latLng);
        } else {
            marker = new google.maps.Marker({
                position: event.latLng,
                map: map,
            });
        }

        // Rellena los campos de latitud y longitud
        document.getElementById("latitud").value = lat;
        document.getElementById("longitud").value = lng;

        // Llama a la función de geocodificación inversa
        geocodeLatLng(lat, lng);
    });
}

function geocodeLatLng(lat, lng) {
    const latlng = { lat: parseFloat(lat), lng: parseFloat(lng) };
    
    geocoder.geocode({ location: latlng }, (results, status) => {
        if (status === "OK") {
            if (results[0]) {
                // Log para ver todos los componentes de dirección
                console.log("Componentes de dirección:", results[0].address_components);

                let primer_via = "";
                let segunda_via = "";

                results[0].address_components.forEach((component) => {
                    if (component.types.includes("route")) {
                        // Llenar primer_via y segunda_via con las rutas encontradas
                        if (!primer_via) {
                            primer_via = component.long_name;
                        } else if (!segunda_via) {
                            segunda_via = component.long_name;
                        }
                    }
                });

                // Si no se encuentran valores, mostrar mensaje de advertencia
                if (!primer_via && !segunda_via) {
                    console.warn("No se encontraron componentes 'route' en la ubicación seleccionada.");
                }

                // Rellena los campos de dirección
                document.getElementById("primer_via").value = primer_via || "No disponible";
                document.getElementById("segunda_via").value = segunda_via || "No disponible";
            } else {
                console.log("No se encontraron resultados de geocodificación.");
            }
        } else {
            console.log("Geocodificación fallida debido a: " + status);
        }
    });
}



