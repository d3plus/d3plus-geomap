[height]: 550
[delay]: 4000

# Income by Census Tract

Using public data provided by [Data USA](https://datausa.io/), we can draw a map combining their data with a topojson file containing matching IDs.

This example also shows how to use a custom number formatter for both displaying the value in the [tooltip](http://d3plus.org/docs/#Viz.tooltipConfig) and for formatting the tick values in the [color scale](http://d3plus.org/docs/#Viz.colorScaleConfig).

```js
function incomeFormat(n) {
  return n === null ? "N/A" : "$" + n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

new d3plus.Geomap()
  .config({
    data: "https://acs.datausa.io/api/data?measures=Household%20Income&Geography=04000US25:tracts&year=latest",
    colorScale: "Household Income",
    colorScaleConfig: {
      axisConfig: {
        tickFormat: incomeFormat
      }
    },
    groupBy: "ID Geography",
    label: function(d) {
      return d.Geography;
    },
    topojson: "https://d3plus.org/topojson/tracts_25.json",
    tooltipConfig: {
      body: function(d) {
        return "Income: " + incomeFormat(d["Household Income"]);
      }
    }
  })
  .render();
```
