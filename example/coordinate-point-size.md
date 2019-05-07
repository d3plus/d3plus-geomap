# Coordinate Point Size on a Map

For a coordinate point [Geomap](https://d3plus.org/docs/#Geomap), you can specify the point size by setting the `pointSize` property to an indicator you want along with the `pointSizeMin` and `pointSizeMax` properties for specifying the range of the point size, as shown in the following example:

```js
new d3plus.Geomap()
  .config({
    data: "https://d3plus.org/data/city_coords.json",
    groupBy: "slug",
    colorScale: "dma_code",
    colorScaleConfig: {
      color: ["red", "orange", "yellow", "green", "blue"]
    },
    label: function(d) {
        return d.city + ", " + d.region;
      },
    point: function(d) {
      return [d.longitude, d.latitude];
    },
    pointSize: function(d) {
      return d.dma_code;
    },
    pointSizeMin: 1,
    pointSizeMax: 10
  })
  .render();
```
