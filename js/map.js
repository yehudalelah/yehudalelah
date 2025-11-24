// === Cross-Country Map ===
const map = L.map('map');

// Base map layer
L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
    attribution: 'Map data © OpenStreetMap contributors, SRTM | Map style: OpenTopoMap',
    maxZoom: 17
}).addTo(map);

// Marker icons
// https://github.com/pointhi/leaflet-color-markers?tab=readme-ov-file
// https://github.com/jawj/MapMarkerAwesome?tab=readme-ov-file

const flatBlueIcon = "https://camo.githubusercontent.com" +
    "/fae150ed3ee0cb2b477f7990ec97b64b068def3c36199f479e1c37e5aabb6da3" +
    "/68747470733a2f2f6a61776a2e6769746875622e696f2f4d61704d61726b65" +
    "72417765736f6d652f6578616d706c65732f706c61696e2e737667";

const markerIcon = new L.Icon({
    iconUrl: flatBlueIcon,
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

// Real flight highlights from logbook
const flights = [{
        coords: [
            [34.207, -118.491],
            [37.6889, -121.442],
            [35.32483, -118.996],
            [34.207, -118.491]
        ],
        label: "Commercial Long XC (6.4 hrs, 509 NM) KVNY → KTCY → L45 → KVNY"
    },
    {
        coords: [
            [34.207, -118.491],
            [35.4336, -119.057],
            [34.2598, -118.4119],
            [34.207, -118.491]
        ],
        label: "IFR XC (3.6 hrs) KVNY → KBFL → KWHPT → KVNY"
    },
    {
        coords: [
            [34.207, -118.491],
            [34.4262, -119.84],
            [34.207, -118.491]
        ],
        label: "KVNY → KSBA → KVNY (2.4 hrs)"
    },
    {
        coords: [
            [34.207, -118.491],
            [33.1283, -117.28]
        ],
        label: "Night XC (4.0 hrs) KVNY → KCRQ → KVNY"
    },
    {
        coords: [
            [32.4468, -93.8252],
            [31.613667, -91.297333],
            [30.5019, -88.2751]
        ],
        label: "Ferry Flight (5 hrs, XC) KSHV → KHEZ → 2R5"
    },
    {
        coords: [
            [30.20503, -91.98775],
            [32.5102, -92.0436],
            [34.1745, -91.9357],
            [38.5934, -92.1648],
            [30.20503, -91.98775]
        ],
        label: "KLFT → KMLU → KPBF → KJEF → KLFT (11.2 hrs, XC)"
    },
    {
        coords: [
            [30.03778, -91.88389],
            [30.4071, -89.0701]
        ],
        label: "KARA → KGPT → KARA (3.5 hrs, Night)"
    },
    {
        coords: [
            [30.03778, -91.88389],
            [29.9506, -94.0183]
        ],
        label: "KARA → KBPT → KARA (2.9 hrs)"
    },
    {
        coords: [
            [30.03778, -91.88389],
            [30.2897, -87.6717]
        ],
        label: "KARA → KJKA → KARA (B3T, XC)"
    },
    {
        coords: [
            [40.21667, -76.85],
            [37.855686, -81.915883],
            [35.48630, -84.93110],
            [33.4650, -88.3847],
            [31.86283, -89.80067],
            [30.20503, -91.98775]
        ],
        label: "KCXY → 6L4 → 2A0 → KUBS → 17M → KLFT"
    },

    {
        coords: [
            [37.2935, -81.2077],
            [38.6944, -121.5888],
            [51.1217, -114.0081],
            [37.2935, -81.2077]
        ],
        label: "KBLF → KSMF → CYYC → KBLF"
    }
    
];

// Store all points to calculate bounds
const allPoints = [];
flights.forEach(f => f.coords.forEach(p => allPoints.push(p)));
const originalBounds = L.latLngBounds(allPoints);

// === Optimize flight lines and markers with Canvas renderer ===
const flightRenderer = L.canvas({
    padding: 0.5
});
const flightsGroup = L.layerGroup();

flights.forEach(flight => {
    const polyline = L.polyline(flight.coords, {
        color: 'blue',
        renderer: flightRenderer,
        smoothFactor: 1 // smoother lines at all zoom levels
    }).addTo(flightsGroup);

    flight.coords.forEach(point => {
        const marker = L.marker(point, {
            icon: markerIcon,
            renderer: flightRenderer
        }).bindPopup(flight.label);

        // Zoom to route when marker clicked
        marker.on('click', function(e) {
            L.DomEvent.stopPropagation(e);
            map.fitBounds(polyline.getBounds(), {
                padding: [50, 50]
            });
        });

        flightsGroup.addLayer(marker);
    });
});

// Add all flights and markers at once
flightsGroup.addTo(map);

// Initially zoom to fit all flights
map.fitBounds(originalBounds);

// Reset to original zoom when clicking on map
map.on('click', function(e) {
    map.fitBounds(originalBounds);
});