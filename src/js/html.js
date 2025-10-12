// Closes responsive menu when a scroll trigger link is clicked (mobile)
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
    zoomControlEnabled: true,
  },
  dataProvider: {
    map: "worldHigh",
    getAreasFromMap: true,
    areas: [
      {
        id: "BE", // Belgium
        showAsSelected: true,
      },
      {
        id: "HR", // Croatia
        showAsSelected: true,
      },
      {
        id: "CZ", // Czech Republic
        showAsSelected: true,
      },
      {
        id: "FR", // France
        showAsSelected: true,
      },
      {
        id: "GR", // Greece
        showAsSelected: true,
      },
      {
        id: "HU", // Hungary
        showAsSelected: true,
      },
      {
        id: "IT", // Italy
        showAsSelected: true,
      },
      {
        id: "LU", // Luxembourg
        showAsSelected: true,
      },
      {
        id: "MC", // Monaco
        showAsSelected: true,
      },
      {
        id: "NL", // Netherlands
        showAsSelected: true,
      },
      {
        id: "NO", // Norway
        showAsSelected: true,
      },
      {
        id: "PL", // Poland
        showAsSelected: true,
      },
      {
        id: "SM", // San Marino
        showAsSelected: true,
      },
      {
        id: "SK", // Slovakia
        showAsSelected: true,
      },
      {
        id: "SI", // Slovenia
        showAsSelected: true,
      },
      {
        id: "TR", // Turkey
        showAsSelected: true,
      },
      {
        id: "GB", // United Kingdom
        showAsSelected: true,
      },
      {
        id: "VA", // Vatican City
        showAsSelected: true,
      },
      {
        id: "AT", // Austria
        showAsSelected: true,
      },
      {
        id: "ES", // Spain
        showAsSelected: true,
      },
      {
        id: "DK", // Denmark
        showAsSelected: true,
      },
      {
        id: "BG", // Bulgaria
        showAsSelected: true,
      },
      {
        id: "RO", // Romania
        showAsSelected: true,
      },
      {
        id: "PT", // Portugal
        showAsSelected: true,
      },
      {
        id: "CA", // Canada
        showAsSelected: true,
      },
      {
        id: "AL", // Albania
        showAsSelected: true,
      },
      {
        id: "MA", // Morocco
        showAsSelected: true,
      },
      {
        id: "AU", // Australia
        showAsSelected: true,
      },
      {
        id: "RS", // Serbia
        showAsSelected: true,
      },
      {
        id: "ME", // Montenegro
        showAsSelected: true,
      },
      {
        id: "DE", // Germany
        showAsSelected: true,
      },
    ],
  },
  areasSettings: {
    autoZoom: true,
    color: "#aaa",
    outlineColor: "#555",
    colorSolid: "#f59d62",
    selectedColor: "#f59d62",
    rollOverColor: "#f57218",
    rollOverOutlineColor: "#333",
  },
});
