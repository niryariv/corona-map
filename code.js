var map = L.map('map');
var markers = L.featureGroup();

L.tileLayer('https://api.maptiler.com/maps/streets/{z}/{x}/{y}.png?key='+ACCESS_KEY, {
    tileSize: 512,
    zoomOffset: -1,
    minZoom: 1,
    attribution: '<a href="https://www.maptiler.com/copyright/" target="_blank">© MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">© OpenStreetMap contributors</a>',
    crossOrigin: true
}).addTo(map);



L.control.locate(
    {
        flyTo: true
    }
).addTo(map);
map.on('locationerror', function(e){
    console.log("LOCATION ERROR:", e.message);
    return false;
});
                

Papa.parse(
    SHEETS_URL,
    {
        download: true,
        header: true,
        complete: function(results) {
            results.data.forEach(add_point);
            map.fitBounds(markers.getBounds(), {padding: [20,20]});
            markers.addTo(map);
        }
    }
);


function add_point(p){
    console.log(p)

    
    var icon = new L.Icon({
        iconUrl: '//raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34]
    });

    var i = p.last_visit_date.split('-');
    var visit_date = new Date(i[2], i[1] - 1, i[0]);
    var opacity = 1 - (days_since(visit_date) / EXPIRE_DAYS);

    // don't show locations where the risk period expired
    if (opacity <= 0) return false;

    var txt = '<div class="title">' + visit_date.toLocaleDateString() + "</div><br />\n<p>" + p.text + "</p>\n";
    
    var m = L.marker([p.lat, p.lon], {icon: icon, opacity: opacity}).bindPopup(txt);
    markers.addLayer(m);
}

function days_since(visit_date) {
    return Math.round((Date.now() - visit_date) / (1000 * 60 * 60 * 24));
}
