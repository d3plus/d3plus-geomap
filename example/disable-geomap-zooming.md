[height]: 550

# Disable Geomap Zooming

For a [Geomap](https://d3plus.org/docs/#Geomap), zooming is enabled by default. To disable them entirely, set the [zoom](https://d3plus.org/docs/#Viz.zoom) property to `false`.

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
