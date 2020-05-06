[height]: 700

# Changing Geomap Tiles

Some companies and organizations (such as OpenStreetMap, CartoDB, ESRI, and Stamen) have created map tiles that can be used with mercator projections. These tile images are served online, sometimes through a CDN, and have a standardized set of "x", "y", and "z" coordinates in the naming convention of their URLs. These coordinates represent longitude, latitude, and zoom level (or scale).

D3plus uses the `light_all` basemap provided by [CARTO](https://carto.com/help/building-maps/basemap-list/#carto-raster-basemaps) for it's default map tiles. These map tiles can be changed to any other tile serviec by setting the [tileUrl](https://d3plus.org/docs/#Geomap.tileUrl) method of the visualization, as long as the string passed contains `{x}`, `{y}`, and `{z}` enclosed in curly brackets for the internal zooming/panning logic to load the correct tiles.

Let's set up a basic map with a selector to switch between different basemaps available on the web. First we create 2 elements in HTML, one for our visualization to live inside of (`#viz`) and a standard select element for the different URLs (`#tile-switcher`).

```html
<!-- element to contain our map -->
<div id="viz"></div>

<!-- selector to change tiles -->
<select id="tile-switcher">
  <option value="https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}@2x.png">CartoDB Positron (default)</option>
  <option value="https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}@2x.png">CartoDB Dark Matter</option>
  <option value="https://{s}.basemaps.cartocdn.com/rastertiles/voyager_labels_under/{z}/{x}/{y}@2x.png">CartoDB Voyager</option>
  <option value="https://cartocdn_{s}.global.ssl.fastly.net/base-eco/{z}/{x}/{y}@2x.png">CartoDB Eco</option>
  <option value="https://cartocdn_{s}.global.ssl.fastly.net/base-antique/{z}/{x}/{y}@2x.png">CartoDB Antique</option>
  <option value="https://tile.opentopomap.org/{z}/{x}/{y}.png">OpenStreetMap Topology</option>
  <option value="https://server.arcgisonline.com/ArcGIS/rest/services/World_Terrain_Base/MapServer/tile/{z}/{y}/{x}@2x.png">ESRI Terrain</option>
  <option value="https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}@2x.png">ESRI Street Map</option>
  <option value="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}@2x.png">ESRI Satellite Imagery</option>
  <option value="https://server.arcgisonline.com/ArcGIS/rest/services/NatGeo_World_Map/MapServer/tile/{z}/{y}/{x}@2x.png">ESRI National Geographic</option>
  <option value="https://stamen-tiles.a.ssl.fastly.net/toner/{z}/{x}/{y}@2x.png">Stamen Toner</option>
  <option value="https://stamen-tiles.a.ssl.fastly.net/terrain/{z}/{x}/{y}@2x.png">Stamen Terrain</option>
  <option value="https://stamen-tiles.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.png">Stamen Watercolor</option>
</select>
```

Let's also set some basic CSS on that select element so that it is positioned in the top-right corner of the map:

```css
#tile-switcher {
  font-size: 16px;
  position: absolute;
  right: 10px;
  top: 10px;
}
```

Next, we can set up the starting point for the visualization. We are not setting [tileUrl](https://d3plus.org/docs/#Geomap.tileUrl) here, because we are going to use D3plus' default value on initialization. This initial configuration is mainly used to center the map on the primary continents, excluding Antarctica.

```js
var map = new d3plus.Geomap()
  .config({

    // draws the map inside of the "#viz" element
    // and sets a static height of 700
    select: "#viz",
    height: 700,

    // fits the max viewport to the boundaries of all
    // of the countries except Antarctica ("anata")
    fitObject: "https://d3plus.org/topojson/countries.json",
    fitFilter: function(d) { return d.id !== "anata"; },

    // removes outer padding around the default fit
    projectionPadding: 0

  })
  .render();
```

And finally, we can hook up a simple event listener for our select element that changes the [tileUrl](https://d3plus.org/docs/#Geomap.tileUrl) method to the value of the currently selected option and re-renders the map.

```js
// attaches a Javascript listener to the "change"
// event of the "#tile-switcher" select element
document.querySelector("#tile-switcher")
  .addEventListener("change", function(event) {

    // reads the URL from the "value" attribute
    // of the selected option element
    const newUrl = event.target.value;

    // passed the new URL to the tileUrl method
    // and re-renders the map
    map.tileUrl(newUrl).render();

  });
```
