[height]: 550
[delay]: 3000

# Overriding Default ColorScale Behavior

If the internal behavior for calculating buckets based on the data does not work for your use-case, the breaks for each bucket can be overridden by passing an Array to the [buckets](https://d3plus.org/docs/#ColorScale.buckets) method in the [colorScaleConfig](https://d3plus.org/docs/#Viz.colorScaleConfig). By default, the value of [buckets](https://d3plus.org/docs/#ColorScale.buckets) is set to `5`, which will result in five equally spaced buckets. When passing an Array to this method, such as [0, 10, 25, 50, 90] for a percentage scale, 5 buckets will be created with each value representing the starting point of each bucket.

Additionally, the logic for labelling each of these buckets can be modified using the [bucketFormat](https://d3plus.org/docs/#ColorScale.bucketFormat) method. This method accepts a function that will be provided four arguments: the start value of the current bucket, it’s index in the full Array of buckets, the full Array of buckets, and an Array of every value present in the data used to construct the buckets. Keep in mind that the end value for the bucket is not actually the next bucket in the list, but includes every value up until that next bucket value (less than, but not equal to). By default, the internal [bucketFormat](https://d3plus.org/docs/#ColorScale.bucketFormat) default makes the end value slightly less than it’s current value, so that it does not overlap with the start label for the next bucket.

```js
var popData = [{id: "01", population: 4830620}, {id: "02", population: 733375}, {id: "04", population: 6641928}, {id: "05", population: 2958208}, {id: "06", population: 38421464}, {id: "08", population: 5278906}, {id: "09", population: 3593222}, {id: "10", population: 926454}, {id: "11", population: 647484}, {id: "12", population: 19645772}, {id: "13", population: 10006693}, {id: "15", population: 1406299}, {id: "16", population: 1616547}, {id: "17", population: 12873761}, {id: "18", population: 6568645}, {id: "19", population: 3093526}, {id: "20", population: 2892987}, {id: "21", population: 4397353}, {id: "22", population: 4625253}, {id: "23", population: 1329100}, {id: "24", population: 5930538}, {id: "25", population: 6705586}, {id: "26", population: 9900571}, {id: "27", population: 5419171}, {id: "28", population: 2988081}, {id: "29", population: 6045448}, {id: "30", population: 1014699}, {id: "31", population: 1869365}, {id: "32", population: 2798636}, {id: "33", population: 1324201}, {id: "34", population: 8904413}, {id: "35", population: 2084117}, {id: "36", population: 19673174}, {id: "37", population: 9845333}, {id: "38", population: 721640}, {id: "39", population: 11575977}, {id: "40", population: 3849733}, {id: "41", population: 3939233}, {id: "42", population: 12779559}, {id: "44", population: 1053661}, {id: "45", population: 4777576}, {id: "46", population: 843190}, {id: "47", population: 6499615}, {id: "48", population: 26538614}, {id: "49", population: 2903379}, {id: "50", population: 626604}, {id: "51", population: 8256630}, {id: "53", population: 6985464}, {id: "54", population: 1851420}, {id: "55", population: 5742117}, {id: "56", population: 579679}, {id: "72", population: 3583073}];

function numFormat(d) {
  return d ? Math.round(d / 1000000) + "M" : d;
}

new d3plus.Geomap()
  .config({
    colorScale: "population",
    colorScaleConfig: {
      buckets: [0, 5000000, 10000000, 20000000, 30000000],
      bucketFormat: function(d, i, arr) {
        var next = arr[i + 1];
        if (next) {
          return numFormat(d) + " to " + numFormat(next - 1000000);
        }
        else {
          return numFormat(d) + "+";
        }
      },
      scale: "buckets"
    },
    data: popData,
    ocean: "transparent",
    projection: "geoAlbersUsaTerritories",
    topojson: "https://d3plus.org/topojson/states.json"
  })
  .render();
```
