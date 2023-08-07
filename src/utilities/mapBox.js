import mapbox from "mapbox-gl";

let map;
export function createMap(data) {
  let longlat = data.coords.split(",");
  longlat = [longlat[1], longlat[0]];

  if (map) {
    map.remove();
  }

  mapbox.accessToken = import.meta.env.VITE_MAPBOX_TOKEN;

  const geojson = {
    type: "FeatureCollection",
    features: [
      {
        type: "Feature",
        properties: {
          accuracy: "street",
        },
        geometry: {
          type: "Point",
          coordinates: longlat,
        },
        properties: {
          title: "Fire Accident",
          description: data.address,
        },
      },
    ],
  };

  map = new mapbox.Map({
    container: "map",
    style: "mapbox://styles/mapbox/dark-v11",
    center: longlat,
    zoom: 12,
    projection: "globe",
    attributionControl: false,
  });

  for (const feature of geojson.features) {
    const el = document.createElement("div");
    el.className = "marker";
    el.style.backgroundImage =
      "url('https://raw.githubusercontent.com/HairyBlue/RushedFire_Web/master/src/assets/House_Fire_Logo.png')";
    el.style.backgroundSize = "cover";
    el.style.width = "50px";
    el.style.height = "50px";
    el.style.cursor = "pointer";

    new mapbox.Marker(el)
      .setLngLat(feature.geometry.coordinates)
      .setPopup(
        new mapbox.Popup({ offset: 25 }).setHTML(
          `<h3>${feature.properties.title}</h3><p>${feature.properties.description}</p>`
        )
      )
      .addTo(map);
  }
}
