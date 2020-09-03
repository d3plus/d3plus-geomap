[height]: 550
[delay]: 3000

# Coordinate Points on a Map

The [Geomap](https://d3plus.org/docs/#Geomap) class can plot coordinate points, provided the data has latitude and longitude values. FOr example, given a data file with this format:

```json
[
  {"city": "Ada", "dma_code": 657, "latitude": 34.774531000000003, "longitude": -96.678344899999999, "slug": "ada-ok"},
  ...
]
```

The url for that data file can be passed to the [data](https://d3plus.org/docs/#Viz.data) method, along with some additional configuration to associate the internal keys in each data point, along with setting a color scale and tooltip text:

```js
new d3plus.Geomap()
  .data("https://d3plus.org/data/city_coords.json")
  .groupBy("slug")
  .colorScale("dma_code")
  .colorScaleConfig({
    color: ["red", "orange", "yellow", "green", "blue"]
  })
  .label(function(d) {
    return d.city + ", " + d.region;
  })
  .point(function(d) {
    return [d.longitude, d.latitude];
  })
  .render();
```
