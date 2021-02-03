# d3plus-geomap

[![NPM Release](http://img.shields.io/npm/v/d3plus-geomap.svg?style=flat)](https://www.npmjs.org/package/d3plus-geomap) [![Build Status](https://travis-ci.org/d3plus/d3plus-geomap.svg?branch=master)](https://travis-ci.org/d3plus/d3plus-geomap) [![Dependency Status](http://img.shields.io/david/d3plus/d3plus-geomap.svg?style=flat)](https://david-dm.org/d3plus/d3plus-geomap) [![Gitter](https://img.shields.io/badge/-chat_on_gitter-brightgreen.svg?style=flat&logo=gitter-white)](https://gitter.im/d3plus/)

A reusable geo map built on D3 and Topojson

## Installing

If you use NPM, `npm install d3plus-geomap`. Otherwise, download the [latest release](https://github.com/d3plus/d3plus-geomap/releases/latest). You can also load d3plus-geomap as a standalone library or as part of [D3plus](https://github.com/d3plus/d3plus). ES modules, AMD, CommonJS, and vanilla environments are supported. In vanilla, a `d3plus` global is exported:

```html
<script src="https://cdn.jsdelivr.net/npm/d3plus-geomap@1"></script>
<script>
  console.log(d3plus);
</script>
```

[height]: 550
[delay]: 4000

## Simple Choropleth Map

D3plus makes it really easy to create choropleth maps. Let's make one using a dataset that includes US state ids and population estimates:

```js
var popData = [{id: "01", population: 4830620}, {id: "02", population: 733375}, {id: "04", population: 6641928}, {id: "05", population: 2958208}, {id: "06", population: 38421464}, {id: "08", population: 5278906}, {id: "09", population: 3593222}, {id: "10", population: 926454}, {id: "11", population: 647484}, {id: "12", population: 19645772}, {id: "13", population: 10006693}, {id: "15", population: 1406299}, {id: "16", population: 1616547}, {id: "17", population: 12873761}, {id: "18", population: 6568645}, {id: "19", population: 3093526}, {id: "20", population: 2892987}, {id: "21", population: 4397353}, {id: "22", population: 4625253}, {id: "23", population: 1329100}, {id: "24", population: 5930538}, {id: "25", population: 6705586}, {id: "26", population: 9900571}, {id: "27", population: 5419171}, {id: "28", population: 2988081}, {id: "29", population: 6045448}, {id: "30", population: 1014699}, {id: "31", population: 1869365}, {id: "32", population: 2798636}, {id: "33", population: 1324201}, {id: "34", population: 8904413}, {id: "35", population: 2084117}, {id: "36", population: 19673174}, {id: "37", population: 9845333}, {id: "38", population: 721640}, {id: "39", population: 11575977}, {id: "40", population: 3849733}, {id: "41", population: 3939233}, {id: "42", population: 12779559}, {id: "44", population: 1053661}, {id: "45", population: 4777576}, {id: "46", population: 843190}, {id: "47", population: 6499615}, {id: "48", population: 26538614}, {id: "49", population: 2903379}, {id: "50", population: 626604}, {id: "51", population: 8256630}, {id: "53", population: 6985464}, {id: "54", population: 1851420}, {id: "55", population: 5742117}, {id: "56", population: 579679}, {id: "72", population: 3583073}];
```

After initializing a new [Geomap](https://d3plus.org/docs/#Geomap) instance, we need to pass our `popData` array to the [data](https://d3plus.org/docs/#Viz.data) method and tell [colorScale](https://d3plus.org/docs/#Viz.colorScale) which key in our data array to use as the basis for the color scale:

```js
var chart = new d3plus.Geomap()
  .data(popData)
  .colorScale("population");
```

Choropleth maps need an additional data type in order to correctly shade geographical boundaries: [Topojson](https://github.com/mbostock/topojson). Topojson files are a JSON-type file that include web-optimized (ie. small filesize) boundaries for a given set of geographies. For this example, we need to use a topojson file for the United States. Topojson files can be created from Shapefiles or GeoJSON using various websites and the command-line tools [made available](https://github.com/mbostock/topojson) by the creators of the format.

Topojson files also include meta information (usually stored as "properties") that help us match our data to the specific geographical boundaries. If each of the objects in your Topojson include an `id` property that matches your data array, then you're good to go!

Additionally, Topojson files may include small geographies that negatively impact how the library determines the default zoom level (for example, a small island or territory far off the coast that is barely visible to the eye). We can use the [fitFilter](https://d3plus.org/docs/#Geomap.fitFilter) method to remove specific geographies from the logic used to determine the zooming, in this case removing small islands, like Guam and American Samoa, and removing Alaska in order to focus on the 48 contiguous US states.

```js
chart
  .topojson("https://d3plus.org/topojson/states.json")
  .fitFilter(function(d) {
    return ["02", "15", "43", "60", "66", "69", "72", "78"].indexOf(d.id) < 0;
  });
```

Once those 2 pieces are configured (data and Topojson), we are ready to [render](https://d3plus.org/docs/#Viz.render) the visualization:

```js
chart.render();
```


[<kbd><img src="/example/getting-started.png" width="990px" /></kbd>](https://d3plus.org/examples/d3plus-geomap/getting-started/)

[Click here](https://d3plus.org/examples/d3plus-geomap/getting-started/) to view this example live on the web.


### More Examples

 * [Resetting Defaults](http://d3plus.org/examples/d3plus-geomap/reset-config/)
 * [Changing the Fallback Topojson Fill](http://d3plus.org/examples/d3plus-geomap/topojson-default-fill/)
 * [Removing Background Tiles from a Geomap](http://d3plus.org/examples/d3plus-geomap/remove-tiles-from-geomap/)
 * [Hiding the Color Scale](http://d3plus.org/examples/d3plus-geomap/hiding-colorscale/)
 * [Geomap Color Scale Formatting](http://d3plus.org/examples/d3plus-geomap/format-geomap-scale/)
 * [Disable Geomap Zooming](http://d3plus.org/examples/d3plus-geomap/disable-geomap-zooming/)
 * [Income by Census Tract](http://d3plus.org/examples/d3plus-geomap/datausa-tracts/)
 * [Changing Geomap Tiles](http://d3plus.org/examples/d3plus-geomap/custom-tiles/)
 * [Custom Coordinate Point Zoom](http://d3plus.org/examples/d3plus-geomap/custom-coordinate-point-zoom/)
 * [Choropleth w/ Custom Colors](http://d3plus.org/examples/d3plus-geomap/custom-color/)
 * [Coordinate Points on a Map](http://d3plus.org/examples/d3plus-geomap/coordinate-points/)
 * [Overriding Default ColorScale Behavior](http://d3plus.org/examples/d3plus-geomap/color-scale-custom/)
 * [Choropleth w/ Jenks Breaks](http://d3plus.org/examples/d3plus-geomap/color-scale/)
 * [Changing Coordinate Point Sizes](http://d3plus.org/examples/d3plus-geomap/changing-coordinate-point-sizes/)
 * [Changing Map Projections](http://d3plus.org/examples/d3plus-geomap/change-projection/)
 * [Change Default Geomap Zooming](http://d3plus.org/examples/d3plus-geomap/change-default-geomap-zooming/)

## API Reference

##### 
* [Geomap](#Geomap)

---

<a name="Geomap"></a>
#### **Geomap** [<>](https://github.com/d3plus/d3plus-geomap/blob/master/src/Geomap.js#L46)


This is a global class, and extends all of the methods and functionality of [<code>Viz</code>](https://github.com/d3plus/d3plus-viz#Viz).


* [Geomap](#Geomap) ⇐ [<code>Viz</code>](https://github.com/d3plus/d3plus-viz#Viz)
    * [new Geomap()](#new_Geomap_new)
    * [.fitFilter([*value*])](#Geomap.fitFilter) ↩︎
    * [.fitKey(*value*)](#Geomap.fitKey) ↩︎
    * [.fitObject(*data*, [*formatter*])](#Geomap.fitObject) ↩︎
    * [.ocean([*value*])](#Geomap.ocean) ↩︎
    * [.point([*value*])](#Geomap.point) ↩︎
    * [.pointSize([*value*])](#Geomap.pointSize) ↩︎
    * [.pointSizeMax([*value*])](#Geomap.pointSizeMax) ↩︎
    * [.pointSizeMin([*value*])](#Geomap.pointSizeMin) ↩︎
    * [.projection(*projection*)](#Geomap.projection) ↩︎
    * [.projectionPadding([*value*])](#Geomap.projectionPadding) ↩︎
    * [.projectionRotate([*value*])](#Geomap.projectionRotate) ↩︎
    * [.tiles([*value*])](#Geomap.tiles) ↩︎
    * [.tileUrl([url])](#Geomap.tileUrl) ↩︎
    * [.topojson(*data*, [*formatter*])](#Geomap.topojson) ↩︎
    * [.topojsonFill(*value*)](#Geomap.topojsonFill) ↩︎
    * [.topojsonFilter([*value*])](#Geomap.topojsonFilter) ↩︎
    * [.topojsonKey(*value*)](#Geomap.topojsonKey) ↩︎
    * [.topojsonId(*value*)](#Geomap.topojsonId) ↩︎


<a name="new_Geomap_new" href="#new_Geomap_new">#</a> new **Geomap**()

Creates a geographical map with zooming, panning, image tiles, and the ability to layer choropleth paths and coordinate points. See [this example](https://d3plus.org/examples/d3plus-geomap/getting-started/) for help getting started.





<a name="Geomap.fitFilter" href="#Geomap.fitFilter">#</a> Geomap.**fitFilter**([*value*]) [<>](https://github.com/d3plus/d3plus-geomap/blob/master/src/Geomap.js#L408)

Topojson files sometimes include small geographies that negatively impact how the library determines the default zoom level (for example, a small island or territory far off the coast that is barely visible to the eye). The fitFilter method can be used to remove specific geographies from the logic used to determine the zooming.

The *value* passed can be a single id to remove, an array of ids, or a filter function. Take a look at the [Choropleth Example](http://d3plus.org/examples/d3plus-geomap/getting-started/) to see it in action.


This is a static method of [<code>Geomap</code>](#Geomap), and is chainable with other methods of this Class.


<a name="Geomap.fitKey" href="#Geomap.fitKey">#</a> Geomap.**fitKey**(*value*) [<>](https://github.com/d3plus/d3plus-geomap/blob/master/src/Geomap.js#L426)

If the topojson being used to determine the zoom fit (either the main [topojson](#Geomap.topojson) object or the [fitObject](#Geomap.fitObject)) contains multiple geographical sets (for example, a file containing state and county boundaries), use this method to indentify which set to use for the zoom fit.

If not specified, the first key in the *Array* returned from using `Object.keys` on the topojson will be used.


This is a static method of [<code>Geomap</code>](#Geomap), and is chainable with other methods of this Class.


<a name="Geomap.fitObject" href="#Geomap.fitObject">#</a> Geomap.**fitObject**(*data*, [*formatter*]) [<>](https://github.com/d3plus/d3plus-geomap/blob/master/src/Geomap.js#L444)

The topojson to be used for the initial projection [fit extent](https://github.com/d3/d3-geo#projection_fitExtent). The value passed should either be a valid Topojson *Object* or a *String* representing a filepath or URL to be loaded.

Additionally, a custom formatting function can be passed as a second argument to this method. This custom function will be passed the data that has been loaded, as long as there are no errors. This function needs to return the final Topojson *Object*.


This is a static method of [<code>Geomap</code>](#Geomap), and is chainable with other methods of this Class.

| Param | Type | Description |
| --- | --- | --- |
| *data* | <code>Object</code> \| <code>String</code> | = `undefined` |
| [*formatter*] | <code>function</code> |  |



<a name="Geomap.ocean" href="#Geomap.ocean">#</a> Geomap.**ocean**([*value*]) [<>](https://github.com/d3plus/d3plus-geomap/blob/master/src/Geomap.js#L467)

The color visible behind any shapes drawn on the map projection. By default, a color value matching the color used in the map tiles is used to help mask the loading time needed to render the tiles. Any value CSS color value may be used, including hexidecimal, rgb, rgba, and color strings like `"blue"` and `"transparent"`.


This is a static method of [<code>Geomap</code>](#Geomap), and is chainable with other methods of this Class.


<a name="Geomap.point" href="#Geomap.point">#</a> Geomap.**point**([*value*]) [<>](https://github.com/d3plus/d3plus-geomap/blob/master/src/Geomap.js#L477)

The accessor to be used when detecting coordinate points in the objects passed to the [data](https://d3plus.org/docs/#Viz.data) method. Values are expected to be in the format `[longitude, latitude]`, which is in-line with d3's expected coordinate mapping.


This is a static method of [<code>Geomap</code>](#Geomap), and is chainable with other methods of this Class.


<a name="Geomap.pointSize" href="#Geomap.pointSize">#</a> Geomap.**pointSize**([*value*]) [<>](https://github.com/d3plus/d3plus-geomap/blob/master/src/Geomap.js#L487)

The accessor or static value to be used for sizing coordinate points.


This is a static method of [<code>Geomap</code>](#Geomap), and is chainable with other methods of this Class.


<a name="Geomap.pointSizeMax" href="#Geomap.pointSizeMax">#</a> Geomap.**pointSizeMax**([*value*]) [<>](https://github.com/d3plus/d3plus-geomap/blob/master/src/Geomap.js#L497)

The maximum pixel radius used in the scale for sizing coordinate points.


This is a static method of [<code>Geomap</code>](#Geomap), and is chainable with other methods of this Class.


<a name="Geomap.pointSizeMin" href="#Geomap.pointSizeMin">#</a> Geomap.**pointSizeMin**([*value*]) [<>](https://github.com/d3plus/d3plus-geomap/blob/master/src/Geomap.js#L507)

The minimum pixel radius used in the scale for sizing coordinate points.


This is a static method of [<code>Geomap</code>](#Geomap), and is chainable with other methods of this Class.


<a name="Geomap.projection" href="#Geomap.projection">#</a> Geomap.**projection**(*projection*) [<>](https://github.com/d3plus/d3plus-geomap/blob/master/src/Geomap.js#L517)

Sets the map projection used when displaying topojson and coordinate points. All of the projections exported from [d3-geo](https://github.com/d3/d3-geo#projections), [d3-geo-projection](https://github.com/d3/d3-geo-projection#api-reference), and [d3-composite-projections](http://geoexamples.com/d3-composite-projections/) are accepted, whether as the string name (ie. "geoMercator") or the generator function itself. Map tiles are only usable when the projection is set to Mercator (which is also the default value).


This is a static method of [<code>Geomap</code>](#Geomap), and is chainable with other methods of this Class.


<a name="Geomap.projectionPadding" href="#Geomap.projectionPadding">#</a> Geomap.**projectionPadding**([*value*]) [<>](https://github.com/d3plus/d3plus-geomap/blob/master/src/Geomap.js#L528)

The outer padding between the edge of the visualization and the shapes drawn. The value passed can be either a single number to be used on all sides, or a CSS string pattern (ie. `"20px 0 10px"`).


This is a static method of [<code>Geomap</code>](#Geomap), and is chainable with other methods of this Class.


<a name="Geomap.projectionRotate" href="#Geomap.projectionRotate">#</a> Geomap.**projectionRotate**([*value*]) [<>](https://github.com/d3plus/d3plus-geomap/blob/master/src/Geomap.js#L538)

An array that corresponds to the value passed to the projection's [rotate](https://github.com/d3/d3-geo#projection_rotate) function. Use this method to shift the centerpoint of a map.


This is a static method of [<code>Geomap</code>](#Geomap), and is chainable with other methods of this Class.


<a name="Geomap.tiles" href="#Geomap.tiles">#</a> Geomap.**tiles**([*value*]) [<>](https://github.com/d3plus/d3plus-geomap/blob/master/src/Geomap.js#L556)

Toggles the visibility of the map tiles.


This is a static method of [<code>Geomap</code>](#Geomap), and is chainable with other methods of this Class.


<a name="Geomap.tileUrl" href="#Geomap.tileUrl">#</a> Geomap.**tileUrl**([url]) [<>](https://github.com/d3plus/d3plus-geomap/blob/master/src/Geomap.js#L573)

By default, d3plus uses the `light_all` style provided by [CARTO](https://carto.com/location-data-services/basemaps/) for it's map tiles. The [tileUrl](https://d3plus.org/docs/#Geomap.tileUrl) method changes the base URL used for fetching the tiles, as long as the string passed contains `{x}`, `{y}`, and `{z}` variables enclosed in curly brackets for the zoom logic to load the correct tiles.


This is a static method of [<code>Geomap</code>](#Geomap), and is chainable with other methods of this Class.


<a name="Geomap.topojson" href="#Geomap.topojson">#</a> Geomap.**topojson**(*data*, [*formatter*]) [<>](https://github.com/d3plus/d3plus-geomap/blob/master/src/Geomap.js#L592)

The topojson to be used for drawing geographical paths. The value passed should either be a valid Topojson *Object* or a *String* representing a filepath or URL to be loaded.

Additionally, a custom formatting function can be passed as a second argument to this method. This custom function will be passed the data that has been loaded, as long as there are no errors. This function should return the final Topojson *Obejct*.


This is a static method of [<code>Geomap</code>](#Geomap), and is chainable with other methods of this Class.

| Param | Type | Description |
| --- | --- | --- |
| *data* | <code>Object</code> \| <code>String</code> | = [] |
| [*formatter*] | <code>function</code> |  |



<a name="Geomap.topojsonFill" href="#Geomap.topojsonFill">#</a> Geomap.**topojsonFill**(*value*) [<>](https://github.com/d3plus/d3plus-geomap/blob/master/src/Geomap.js#L615)

The function is used to set default color of the map.


This is a static method of [<code>Geomap</code>](#Geomap), and is chainable with other methods of this Class.


<a name="Geomap.topojsonFilter" href="#Geomap.topojsonFilter">#</a> Geomap.**topojsonFilter**([*value*]) [<>](https://github.com/d3plus/d3plus-geomap/blob/master/src/Geomap.js#L625)

If the [topojson](#Geomap.topojson) being used contains boundaries that should not be shown, this method can be used to filter them out of the final output. The *value* passed can be a single id to remove, an array of ids, or a filter function.


This is a static method of [<code>Geomap</code>](#Geomap), and is chainable with other methods of this Class.


<a name="Geomap.topojsonKey" href="#Geomap.topojsonKey">#</a> Geomap.**topojsonKey**(*value*) [<>](https://github.com/d3plus/d3plus-geomap/blob/master/src/Geomap.js#L643)

If the [topojson](#Geomap.topojson) contains multiple geographical sets (for example, a file containing state and county boundaries), use this method to indentify which set to use.

If not specified, the first key in the *Array* returned from using `Object.keys` on the topojson will be used.


This is a static method of [<code>Geomap</code>](#Geomap), and is chainable with other methods of this Class.


<a name="Geomap.topojsonId" href="#Geomap.topojsonId">#</a> Geomap.**topojsonId**(*value*) [<>](https://github.com/d3plus/d3plus-geomap/blob/master/src/Geomap.js#L658)

The accessor used to map each topojson geometry to it's corresponding [data](https://d3plus.org/docs/#Viz.data) point.


This is a static method of [<code>Geomap</code>](#Geomap), and is chainable with other methods of this Class.

---



###### <sub>Documentation generated on Wed, 03 Feb 2021 14:48:30 GMT</sub>
