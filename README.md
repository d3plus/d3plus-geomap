# d3plus-geomap

A reusable geo map built on D3 and Topojson

## Installing

If using npm, `npm install d3plus-geomap`. Otherwise, you can download the [latest release from GitHub](https://github.com/d3plus/d3plus-geomap/releases/latest) or load from a [CDN](https://cdn.jsdelivr.net/npm/d3plus-geomap@1).

```js
import modules from "d3plus-geomap";
```

d3plus-geomap can be loaded as a standalone library or bundled as part of [D3plus](https://github.com/d3plus/d3plus). ES modules, AMD, CommonJS, and vanilla environments are supported. In vanilla, a `d3plus` global is exported:

```html
<script src="https://cdn.jsdelivr.net/npm/d3plus-geomap@1"></script>
<script>
  console.log(d3plus);
</script>
```

## Examples

Live examples can be found on [d3plus.org](https://d3plus.org/), which includes a collection of example visualizations using [d3plus-react](https://github.com/d3plus/d3plus-react/). These examples are powered by the [d3plus-storybook](https://github.com/d3plus/d3plus-storybook/) repo, and PRs are always welcome. :beers:

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



###### <sub>Documentation generated on Wed, 25 Jan 2023 18:32:14 GMT</sub>
