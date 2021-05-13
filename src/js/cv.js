// Closes responsive menu when a scroll trigger link is clicked
$(".nav-link").click(() => $(".navbar-collapse").collapse("hide"));

// Activate scrollspy to add active class to navbar items on scroll
$("body").scrollspy({
    target: "nav",
});

// Create the map
var map = AmCharts.makeChart("world-map", {
    type: "map",
    theme: "dark",
    projection: "mercator",
    panEventsEnabled: true,
    backgroundColor: "#121212",
    backgroundAlpha: 1,
    zoomControl: {
        zoomControlEnabled: true
    },
    dataProvider: {
        map: "worldHigh",
        getAreasFromMap: true,
        areas: [{
                "id": "BE",
                "showAsSelected": true
            }, {
                "id": "HR",
                "showAsSelected": true
            }, {
                "id": "CZ",
                "showAsSelected": true
            }, {
                "id": "FR",
                "showAsSelected": true
            },{
                "id": "GR",
                "showAsSelected": true
            }, {
                "id": "HU",
                "showAsSelected": true
            }, {
                "id": "IT",
                "showAsSelected": true
            }, {
                "id": "LU",
                "showAsSelected": true
            }, {
                "id": "MC",
                "showAsSelected": true
            }, {
                "id": "NL",
                "showAsSelected": true
            }, {
                "id": "NO",
                "showAsSelected": true
            }, {
                "id": "PL",
                "showAsSelected": true
            }, {
                "id": "SM",
                "showAsSelected": true
            }, {
                "id": "SK",
                "showAsSelected": true
            }, {
                "id": "SI",
                "showAsSelected": true
            }, {
                "id": "TR",
                "showAsSelected": true
            }, {
                "id": "GB",
                "showAsSelected": true
            }, {
                "id": "VA",
                "showAsSelected": true
            }, {
                "id": "AT",
                "showAsSelected": true
            }, {
                "id": "ES",
                "showAsSelected": true
            }, {
                "id": "DK",
                "showAsSelected": true
            }
        ]
    },
    areasSettings: {
        autoZoom: true,
        color: "#aaa",
        outlineColor: "#555",
        colorSolid: "#f59d62",
        selectedColor: "#f59d62",
        rollOverColor: "#f57218",
        rollOverOutlineColor: "#333"
    }
});