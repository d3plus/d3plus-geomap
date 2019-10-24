# Custom Coordinate Point Zoom

Topojson files will sometimes include geographies that negatively impact how the library determines the default zoom level (for example, Antarctica on a world map). We could use the [fitFilter](https://d3plus.org/docs/#Geomap.fitFilter) method to remove specific geographies from the logic used to determine the zooming, but sometimes this can turn into a game of whack-a-mole.

That's where [fitObject](https://d3plus.org/docs/#Geomap.fitObject) comes in. Simply pass it a valid Topojson Object, or a URL that resolves to one, and it's bounds will be used as the default zoom level. In this example, we define a set of two coordinate points, the top left and bottom right of the area we'd like to use.

```js
const myConfig = {
  fitObject: {
    "type": "Topology",
    "objects": {
      "custom-bounds": {
        "type": "GeometryCollection",
        "geometries":[
          {
            "type":"MultiPoint",
            "coordinates": [[-160, 70], [170, -55]]
          }
        ]
      }
    }
  }
};

const map = new d3plus.Geomap()
  .config(myConfig)
  .render();
```
