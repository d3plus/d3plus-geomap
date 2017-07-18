# Changing the Geo Map Tiles

By default, d3plus uses the `light_all` style provided by [CARTO](https://carto.com/location-data-services/basemaps/) for it's map tiles. The [tileUrl](https://d3plus.org/docs/#Geomap.tileUrl) method changes the base URL used for fetching the tiles, as long as the string passed contains `{x}`, `{y}`, and `{z}` variables enclosed in curly brackets for the zoom logic to load the correct tiles.

This examples changes the [tileUrl](https://d3plus.org/docs/#Geomap.tileUrl) to the `dark_all` theme provided by [CARTO](https://carto.com/location-data-services/basemaps/):

```js
new d3plus.Geomap()
  .tileUrl("https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png")
  .fitObject("http://d3plus.org/topojson/states.json")
  .fitFilter(function(d) {
    return ["02", "15", "43", "60", "66", "69", "78"].indexOf(d.id) < 0;
  })
  .render();
```
