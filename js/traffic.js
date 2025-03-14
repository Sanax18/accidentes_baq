function initMap() {
    const map = new google.maps.Map(document.getElementById("map1"), {
        center: { lat: 10.96854, lng: -74.78132 }, 
        zoom: 13
    });

    // Activa la capa de tráfico
    const trafficLayer = new google.maps.TrafficLayer();
    trafficLayer.setMap(map);

    // Ejemplo de agregar marcadores desde una API
    fetch('/api/accident_zones')
        .then(response => response.json())
        .then(data => {
            data.zones.forEach(zone => {
                new google.maps.Marker({
                    position: { lat: zone.lat, lng: zone.lng },
                    map: map,
                    title: zone.name
                }).addListener("click", () => {
                    const infoWindow = new google.maps.InfoWindow({
                        content: `<b>${zone.name}</b><br>${zone.description}`
                    });
                    infoWindow.open(map, this);
                });
            });
        })
        .catch(error => console.error("Error cargando los datos de accidentes:", error));
}