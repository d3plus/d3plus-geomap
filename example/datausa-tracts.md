[height]: 550
[delay]: 4000

# Income by Census Tract

Using public data provided by [Data USA](https://datausa.io/) (API endpoints are documented [here](https://github.com/DataUSA/datausa-api/wiki)), we can draw a map combining their data with a topojson file containing matching IDs.

This example also shows how to use a custom number formatter for both displaying the value in the [tooltip](http://d3plus.org/docs/#Viz.tooltipConfig) and for formatting the tick values in the [color scale](http://d3plus.org/docs/#Viz.colorScaleConfig).

```js
function incomeFormat(n) {
  return "$" + n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

new d3plus.Geomap()
  .data("https://api.datausa.io/api/?show=geo&required=income&sumlevel=tract&year=latest&where=geo:^14000US25")
  .colorScale("income")
  .colorScaleConfig({
    axisConfig: {
      tickFormat: incomeFormat
    }
  })
  .groupBy("geo")//, "ID Gender")
  .label(function(d) {
    var text = d.geo.slice(12);
    var num = text.slice(0, 4),
        suffix = text.slice(4);
    suffix = suffix === "00" ? "" : "." + suffix;
    return "Census Tract " + num + suffix;
  })
  .topojson("https://d3plus.org/topojson/tracts_25.json")
  .tooltipConfig({
    body: function(d) {
      return "Income: " + (d.income !== null ? incomeFormat(d.income) : "N/A");
    }
  })
  .render();
```
