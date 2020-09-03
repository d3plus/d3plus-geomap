[height]: 550
[delay]: 4000

# Changing the Fallback Topojson Fill

When creating choropleth maps, sometimes a geography may not have a data point associated with it. In this case, the [topojsonFill](https://d3plus.org/docs/#Geomap.topojsonFill) method defines what color to use for these "missing" geographies. The value provided to this method can be either a valid HTML color string, or an accessor function that returns one.

```js
var popData = [
  {id: "01", population: 4830620},
  {id: "08", population: 5278906},
  {id: "16", population: 1616547},
  {id: "24", population: 5930538},
  {id: "29", population: 6045448},
  {id: "30", population: 1014699},
  {id: "35", population: 2084117},
  {id: "40", population: 3849733},
  {id: "47", population: 6499615},
  {id: "56", population: 579679}
];

var chart = new d3plus.Geomap()
  .config({
    colorScale: "population",
    data: popData,
    fitFilter: function(d) {
      return ["02", "15", "43", "60", "66", "69", "72", "78"].indexOf(d.id) < 0;
    },
    groupBy: "id", // this is the default value
    topojson: "https://d3plus.org/topojson/states.json",
    topojsonId: "id", // this is the default value
    topojsonFill: "#ffcccc"
  })
  .render();
```
