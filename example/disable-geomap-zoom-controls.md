[height]: 550

# Disable Geomap Zoom Controls

For a [Geomap](https://d3plus.org/docs/#Geomap), zoom controls are enabled by default. To disable them, set the [zoom](https://d3plus.org/docs/#Viz.zoom) property to `false`.

```js
new d3plus.Geomap()
  .config({
    data: "https://d3plus.org/data/city_coords.json",
    groupBy: "slug",
    colorScale: "dma_code",
    label: function(d) {
      return d.city + ", " + d.region;
    },
    point: function(d) {
      return [d.longitude, d.latitude];
    },
    zoom: false
  })
  .render();
```
