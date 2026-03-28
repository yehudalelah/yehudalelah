// === Cross-Country Map ===
const map = L.map('map');

// Base map
L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
    attribution: '&copy; OpenStreetMap &copy; CARTO',
    subdomains: 'abcd',
    maxZoom: 20
}).addTo(map);

// Marker icons
const markerIcon = new L.Icon({
    iconUrl: 'images/map-icons/blueicon.png',
    iconSize: [40, 45],
    iconAnchor: [20, 40],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

const jetIcon = new L.Icon({
    iconUrl: 'images/map-icons/greenicon.png',
    iconSize: [40, 45],
    iconAnchor: [20, 40],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

// Plane icon
const planeIcon = L.icon({
    iconUrl: "images/map-icons/blueplane.png",
    iconSize: [30, 30],
    iconAnchor: [15, 15]
});

// Renderer
const flightRenderer = L.canvas({
    padding: 0.5
});

// =============================
// Smooth plane animation
// =============================
function animatePlane(plane, coords, durationMs = 40000) {

    let startTime = null;

    function step(timestamp) {

        if (!startTime) startTime = timestamp;

        const elapsed = timestamp - startTime;
        let progress = elapsed / durationMs;

        // Loop animation
        if (progress > 1) {
            startTime = timestamp;
            progress = 0;
        }

        const totalSegments = coords.length - 1;
        const segmentProgress = progress * totalSegments;

        const segmentIndex = Math.floor(segmentProgress);
        const segmentFraction = segmentProgress - segmentIndex;

        const start = coords[segmentIndex];
        const end = coords[segmentIndex + 1] || coords[segmentIndex];

        const lat = start[0] + (end[0] - start[0]) * segmentFraction;
        const lng = start[1] + (end[1] - start[1]) * segmentFraction;

        plane.setLatLng([lat, lng]);

        requestAnimationFrame(step);
    }

    requestAnimationFrame(step);
}

// =============================
// Function to add flight layers
// =============================
function addFlightLayer(flightData, color, icon, animate = false) {

    const group = L.layerGroup();

    flightData.forEach(flight => {

        const isJet = flightData === jet;
        const coords = flight.coords;

        // Route line
        const polyline = L.polyline(coords, {
            color: color,
            weight: 3,
            dashArray: isJet ? "6,6" : null,
            renderer: flightRenderer,
            smoothFactor: 1
        }).addTo(group);

        // Airport markers
        flight.coords.forEach(point => {

            const marker = L.marker(point, {
                    icon: icon,
                    renderer: flightRenderer
                })
                .bindPopup(flight.label)
                .on('click', e => {

                    L.DomEvent.stopPropagation(e);

                    map.fitBounds(polyline.getBounds(), {
                        padding: [50, 50],
                        animate: true,
                        duration: 0.5
                    });

                });

            group.addLayer(marker);

        });

        // Plane animation
        if (isJet && animate) {
            // const plane = L.marker(coords[0], {icon: planeIcon}).addTo(group);
            // animatePlane(plane, coords, 40000);

        }

    });

    group.addTo(map);
}

// =============================
// Flight Data
// =============================
const jet = [

    // {
    //     coords: [
    //         [35.78114, -80.30377],
    //         [24.7263, -81.0514]
    //     ],
    //     label: "KEXX → KMTH"
    // }

];

const flights = [

    {
        coords: [
            [34.207, -118.491],
            [37.6889, -121.442],
            [35.32483, -118.996],
            [34.207, -118.491]
        ],
        label: "KVNY → KTCY → L45 → KVNY"
    },

    {
        coords: [
            [30.20503, -91.98775],
            [32.5102, -92.0436],
            [34.1745, -91.9357],
            [38.5934, -92.1648],
            [30.20503, -91.98775]
        ],
        label: "KLFT → KMLU → KPBF → KJEF → KLFT"
    },

    {
        coords: [
            [30.03778, -91.88389],
            [30.2897, -87.6717]
        ],
        label: "KARA → KJKA → KARA (B3T XC)"
    },

    {
        coords: [
            [40.21667, -76.85],
            [37.855686, -81.915883],
            [35.4863, -84.9311],
            [33.4650, -88.3847],
            [31.86283, -89.80067],
            [30.20503, -91.98775]
        ],
        label: "KCXY → 6L4 → 2A0 → KUBS → 17M → KLFT"
    },

    {
        coords: [
            [36.8935, -76.1994],
            [38.6944, -121.5888],
            [51.1217, -114.0081],
            [36.8935, -76.1994]
        ],
        label: "KORF → KSMF → CYYC → KORF (PA31)"
    },

    {
        coords: [
            [30.6267, -88.0680],
            [30.0424, -90.0282],
            [30.2050, -91.9878],
            [30.1261, -93.2234],
            [30.8703, -87.8193],
            [30.6267, -88.0680]
        ],
        label: "KBFM → KNEW → KLFT → KLCH → 1R8 → KBFM"
    },

    {
        coords: [
            [30.5019, -88.2751],
            [33.6386, -91.7510],
            [35.2882, -95.0994],
            [36.7319, -97.0997],
            [37.6698, -97.0780],
            [35.2882, -95.0994],
            [32.3516, -91.0277],
            [30.5019, -88.2751]
        ],
        label: "2R5 → KLLQ → KGZL → KPNC → 3AU → KGZL → KTVR → 2R5"
    },

    {
        coords: [
            [30.5019, -88.2751],
            [32.1108, -84.1889],
            [34.7726, -80.3889],
            [38.5255, -77.8596],
            [41.0670, -73.7076],
            [30.5019, -88.2751]
        ],
        label: "2R5 → KACJ → KPYG → KCJR → KHPN → 2R5"
    }

];

// =============================
// Add layers
// =============================
addFlightLayer(flights, '#0096FF', markerIcon);
addFlightLayer(jet, '#00C2A8', jetIcon, true);

// =============================
// Fit map to all routes
// =============================
const allPoints = [];

[...flights, ...jet].forEach(f => {
    f.coords.forEach(p => allPoints.push(p));
});

map.fitBounds(L.latLngBounds(allPoints));


// Reset zoom on background click
map.on('click', e => {

    if (!e.originalEvent.target.closest('.leaflet-marker-icon')) {

        map.fitBounds(L.latLngBounds(allPoints));

    }

});