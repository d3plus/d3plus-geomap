[height]: 550

# Geomap Color Scale Formatting

The numbers displayed on the [ColorScale](https://d3plus.org/docs/#ColorScale) used in visualizations like the [Geomap](https://d3plus.org/docs/#Geomap) can be formatted manually by passing a formatter function to the [`tickFormat`](https://d3plus.org/docs/#Axis.tickFormat) property of [`axisConfig`](https://d3plus.org/docs/#ColorScale.axisConfig) inside [colorScaleConfig](https://d3plus.org/docs/#Viz.colorScaleConfig).

```js
var dropoutData = [{id: "01", dropoutRate: 48.30620}, {id: "02", dropoutRate: 73.3375}, {id: "04", dropoutRate: 66.41928}, {id: "05", dropoutRate: 29.58208}, {id: "06", dropoutRate: 38.421464}, {id: "08", dropoutRate: 52.78906}, {id: "09", dropoutRate: 35.93222}, {id: "10", dropoutRate: .926454}, {id: "11", dropoutRate: .647484}, {id: "12", dropoutRate: 19.645772}, {id: "13", dropoutRate: 10.006693}, {id: "15", dropoutRate: 14.06299}, {id: "16", dropoutRate: 16.16547}, {id: "17", dropoutRate: 12.873761}, {id: "18", dropoutRate: .6568645}, {id: "19", dropoutRate: 30.93526}, {id: "20", dropoutRate: 28.92987}, {id: "21", dropoutRate: .4397353}, {id: "22", dropoutRate: 46.25253}, {id: "23", dropoutRate: 13.29100}, {id: "24", dropoutRate: .5930538}, {id: "25", dropoutRate: .6705586}, {id: "26", dropoutRate: .9900571}, {id: "27", dropoutRate: 54.19171}, {id: "28", dropoutRate: 29.88081}, {id: "29", dropoutRate: 60.45448}, {id: "30", dropoutRate: 10.14699}, {id: "31", dropoutRate: 18.69365}, {id: "32", dropoutRate: 27.98636}, {id: "33", dropoutRate: 13.24201}, {id: "34", dropoutRate: .8904413}, {id: "35", dropoutRate: 20.84117}, {id: "36", dropoutRate: 19.673174}, {id: "37", dropoutRate: .9845333}, {id: "38", dropoutRate: .721640}, {id: "39", dropoutRate: 11.575977}, {id: "40", dropoutRate: .3849733}, {id: "41", dropoutRate: 39.39233}, {id: "42", dropoutRate: 12.779559}, {id: "44", dropoutRate: 10.53661}, {id: "45", dropoutRate: 47.77576}, {id: "46", dropoutRate: .843190}, {id: "47", dropoutRate: .6499615}, {id: "48", dropoutRate: 26.538614}, {id: "49", dropoutRate: 29.03379}, {id: "50", dropoutRate: 6.26604}, {id: "51", dropoutRate: 8.256630}, {id: "53", dropoutRate: 6.985464}, {id: "54", dropoutRate: 18.51420}, {id: "55", dropoutRate: 5.742117}, {id: "56", dropoutRate: 5.79679}, {id: "72", dropoutRate: 35.83073}];

new d3plus.Geomap()
  .config({
    data: dropoutData,
    colorScale: "dropoutRate",
    colorScaleConfig: {
      axisConfig: {
        tickFormat: function(d) {
          return Math.floor(d) + "%";
        }
      }
    },
    fitFilter: function(d) {
        return ["02", "15", "43", "60", "66", "69", "72", "78"].indexOf(d.id) < 0;
    },
    groupBy: "id",
    topojson: "https://d3plus.org/topojson/states.json"
  })
  .render();
```
