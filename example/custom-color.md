[height]: 550
[delay]: 4000

# Choropleth w/ Custom Colors

The default values of the [ColorScale](https://d3plus.org/docs/#ColorScale) used to shade a choropleth can be changed to either a single color value (which will be extrapolated to a full scale) or an array of colors to use for the entire scale. Like most of the components in d3plus, there is a method to pass custom configurations to the underlying [ColorScale](https://d3plus.org/docs/#ColorScale). In this case, the method is called [colorScaleConfig](https://d3plus.org/docs/#Viz.colorScaleConfig). Let's take the population data and chart configuration used in the [Simple Choropleth Example](https://d3plus.org/examples/d3plus-geomap/getting-started/):

```js
var popData = [{id: "01", population: 4830620}, {id: "02", population: 733375}, {id: "04", population: 6641928}, {id: "05", population: 2958208}, {id: "06", population: 38421464}, {id: "08", population: 5278906}, {id: "09", population: 3593222}, {id: "10", population: 926454}, {id: "11", population: 647484}, {id: "12", population: 19645772}, {id: "13", population: 10006693}, {id: "15", population: 1406299}, {id: "16", population: 1616547}, {id: "17", population: 12873761}, {id: "18", population: 6568645}, {id: "19", population: 3093526}, {id: "20", population: 2892987}, {id: "21", population: 4397353}, {id: "22", population: 4625253}, {id: "23", population: 1329100}, {id: "24", population: 5930538}, {id: "25", population: 6705586}, {id: "26", population: 9900571}, {id: "27", population: 5419171}, {id: "28", population: 2988081}, {id: "29", population: 6045448}, {id: "30", population: 1014699}, {id: "31", population: 1869365}, {id: "32", population: 2798636}, {id: "33", population: 1324201}, {id: "34", population: 8904413}, {id: "35", population: 2084117}, {id: "36", population: 19673174}, {id: "37", population: 9845333}, {id: "38", population: 721640}, {id: "39", population: 11575977}, {id: "40", population: 3849733}, {id: "41", population: 3939233}, {id: "42", population: 12779559}, {id: "44", population: 1053661}, {id: "45", population: 4777576}, {id: "46", population: 843190}, {id: "47", population: 6499615}, {id: "48", population: 26538614}, {id: "49", population: 2903379}, {id: "50", population: 626604}, {id: "51", population: 8256630}, {id: "53", population: 6985464}, {id: "54", population: 1851420}, {id: "55", population: 5742117}, {id: "56", population: 579679}, {id: "72", population: 3583073}];

var chart = new d3plus.Geomap()
  .data(popData)
  .colorScale("population")
  .topojson("https://d3plus.org/topojson/states.json")
  .fitFilter(function(d) {
    return ["02", "15", "43", "60", "66", "69", "72", "78"].indexOf(d.id) < 0;
  });
```

In order to change the color, we need to use the pass-through [colorScaleConfig](https://d3plus.org/docs/#Viz.colorScaleConfig) method to access the underlying [ColorScale](https://d3plus.org/docs/#ColorScale) class used in creating the scale. All of the methods used by [ColorScale](https://d3plus.org/docs/#ColorScale) are acessible through the [colorScaleConfig](https://d3plus.org/docs/#Viz.colorScaleConfig) method:

```js
chart
  .colorScaleConfig({color: ["red", "orange", "yellow", "green", "blue"]})
  .render();
```
