[height]: 550
[delay]: 4000

# Changing Coordinate Point Sizes

For a coordinate point [Geomap](https://d3plus.org/docs/#Geomap), you can enable dynamic point sizing by setting the [pointSize](https://d3plus.org/docs/#Geomap.pointSize) property to an accessor that returns the data value you want to use. Additionally, the minimum and maximum values used in the scaling can be overridden using the [pointSizeMin](https://d3plus.org/docs/#Geomap.pointSizeMin) and [pointSizeMax](https://d3plus.org/docs/#Geomap.pointSizeMax) methods:

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
    pointSize: function(d) {
      return d.dma_code;
    },
    pointSizeMin: 1,
    pointSizeMax: 10
  })
  .render();
```
