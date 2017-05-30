# d3plus-geomap

[![NPM Release](http://img.shields.io/npm/v/d3plus-geomap.svg?style=flat)](https://www.npmjs.org/package/d3plus-geomap) [![Build Status](https://travis-ci.org/d3plus/d3plus-geomap.svg?branch=master)](https://travis-ci.org/d3plus/d3plus-geomap) [![Dependency Status](http://img.shields.io/david/d3plus/d3plus-geomap.svg?style=flat)](https://david-dm.org/d3plus/d3plus-geomap) [![Gitter](https://img.shields.io/gitter/room/nwjs/nw.js.svg?style=flat)](https://gitter.im/d3plus/)

A reusable geo map built on D3 and Topojson

## Installing

If you use NPM, run `npm install d3plus-geomap --save`. Otherwise, download the [latest release](https://github.com/d3plus/d3plus-geomap/releases/latest). The released bundle supports AMD, CommonJS, and vanilla environments. You can also load directly from [d3plus.org](https://d3plus.org):

```html
<script src="https://d3plus.org/js/d3plus-geomap.v0.4.full.min.js"></script>
```


## API Reference

##### Classes
* [Geomap](#Geomap)

---

<a name="Geomap"></a>
#### **Geomap** [<>](https://github.com/d3plus/d3plus-geomap/blob/master/src/Geomap.js#L14)


This is a global class, and extends all of the methods and functionality of <code>Viz</code>.


* [Geomap](#Geomap) ⇐ <code>Viz</code>
    * [new Geomap()](#new_Geomap_new)
    * [.fitFilter([*value*])](#Geomap.fitFilter) ↩︎
    * [.fitKey(*value*)](#Geomap.fitKey) ↩︎
    * [.fitObject(*data*, [*formatter*])](#Geomap.fitObject) ↩︎
    * [.ocean([*value*])](#Geomap.ocean) ↩︎
    * [.padding([*value*])](#Geomap.padding) ↩︎
    * [.point([*value*])](#Geomap.point) ↩︎
    * [.pointSize([*value*])](#Geomap.pointSize) ↩︎
    * [.pointSizeMax([*value*])](#Geomap.pointSizeMax) ↩︎
    * [.pointSizeMin([*value*])](#Geomap.pointSizeMin) ↩︎
    * [.tiles([*value*])](#Geomap.tiles) ↩︎
    * [.topojson(*data*, [*formatter*])](#Geomap.topojson) ↩︎
    * [.topojsonFilter([*value*])](#Geomap.topojsonFilter) ↩︎
    * [.topojsonKey(*value*)](#Geomap.topojsonKey) ↩︎
    * [.topojsonId(*value*)](#Geomap.topojsonId) ↩︎
    * [.zoom([*value*])](#Geomap.zoom) ↩︎

<a name="new_Geomap_new" href="new_Geomap_new">#</a> new **Geomap**()

Creates SVG paths and coordinate points based on an array of data. See [this example](https://d3plus.org/examples/d3plus-geomap/getting-started/) for help getting started using the geomap generator.




<a name="Geomap.fitFilter" href="Geomap.fitFilter">#</a> Geomap.**fitFilter**([*value*]) [<>](https://github.com/d3plus/d3plus-geomap/blob/master/src/Geomap.js#L600)

If *value* is specified, filters the features used to calculate the initial projection fitExtent based on an ID, array of IDs, or filter function and returns the current class instance. If *value* is not specified, returns the current bounds filter.


This is a static method of [<code>Geomap</code>](#Geomap), and is chainable with other methods of this Class.

<a name="Geomap.fitKey" href="Geomap.fitKey">#</a> Geomap.**fitKey**(*value*) [<>](https://github.com/d3plus/d3plus-geomap/blob/master/src/Geomap.js#L615)

If *value* is specified, sets the topojson object key to be used and returns the current class instance. If *value* is not specified, returns the current topojson object key.


This is a static method of [<code>Geomap</code>](#Geomap), and is chainable with other methods of this Class.

<a name="Geomap.fitObject" href="Geomap.fitObject">#</a> Geomap.**fitObject**(*data*, [*formatter*]) [<>](https://github.com/d3plus/d3plus-geomap/blob/master/src/Geomap.js#L630)

Sets the topojson to be used for the initial projection [fit extent](https://github.com/d3/d3-geo#projection_fitExtent). The value passed should either be a valid Topojson *Object* or a *String* representing a filepath or URL to be loaded.

Additionally, a custom formatting function can be passed as a second argument to this method. This custom function will be passed the data that has been loaded, as long as there are no errors. This function should return the final Topojson *Obejct*.

If *data* is not specified, this method returns the current Topojson *Object*, which by default is `undefined`.


This is a static method of [<code>Geomap</code>](#Geomap), and is chainable with other methods of this Class.


| Param | Type | Description |
| --- | --- | --- |
| *data* | <code>Object</code> \| <code>String</code> | = `undefined` |
| [*formatter*] | <code>function</code> |  |

<a name="Geomap.ocean" href="Geomap.ocean">#</a> Geomap.**ocean**([*value*]) [<>](https://github.com/d3plus/d3plus-geomap/blob/master/src/Geomap.js#L640)

If *value* is specified, sets the ocean color and returns the current class instance. If *value* is not specified, returns the current ocean color.


This is a static method of [<code>Geomap</code>](#Geomap), and is chainable with other methods of this Class.

<a name="Geomap.padding" href="Geomap.padding">#</a> Geomap.**padding**([*value*]) [<>](https://github.com/d3plus/d3plus-geomap/blob/master/src/Geomap.js#L650)

Defines the outer padding between the edge of the visualization and the shapes drawn. The value can either be a single number to be used on all sides, or a CSS string pattern (ie. `"20px 0 10px"`).


This is a static method of [<code>Geomap</code>](#Geomap), and is chainable with other methods of this Class.

<a name="Geomap.point" href="Geomap.point">#</a> Geomap.**point**([*value*]) [<>](https://github.com/d3plus/d3plus-geomap/blob/master/src/Geomap.js#L660)

If *value* is specified, sets the point accessor to the specified function or array and returns the current class instance. Point values are expected in the format [longitude, latitude], which is in-line with d3's expected [x, y] mapping. If *value* is not specified, returns the current point accessor.


This is a static method of [<code>Geomap</code>](#Geomap), and is chainable with other methods of this Class.

<a name="Geomap.pointSize" href="Geomap.pointSize">#</a> Geomap.**pointSize**([*value*]) [<>](https://github.com/d3plus/d3plus-geomap/blob/master/src/Geomap.js#L670)

If *value* is specified, sets the point size accessor to the specified function or number and returns the current class instance. If *value* is not specified, returns the current point size accessor.


This is a static method of [<code>Geomap</code>](#Geomap), and is chainable with other methods of this Class.

<a name="Geomap.pointSizeMax" href="Geomap.pointSizeMax">#</a> Geomap.**pointSizeMax**([*value*]) [<>](https://github.com/d3plus/d3plus-geomap/blob/master/src/Geomap.js#L680)

If *value* is specified, sets the maximum point radius and returns the current class instance. If *value* is not specified, returns the current maximum point radius.


This is a static method of [<code>Geomap</code>](#Geomap), and is chainable with other methods of this Class.

<a name="Geomap.pointSizeMin" href="Geomap.pointSizeMin">#</a> Geomap.**pointSizeMin**([*value*]) [<>](https://github.com/d3plus/d3plus-geomap/blob/master/src/Geomap.js#L690)

If *value* is specified, sets the minimum point radius and returns the current class instance. If *value* is not specified, returns the current minimum point radius.


This is a static method of [<code>Geomap</code>](#Geomap), and is chainable with other methods of this Class.

<a name="Geomap.tiles" href="Geomap.tiles">#</a> Geomap.**tiles**([*value*]) [<>](https://github.com/d3plus/d3plus-geomap/blob/master/src/Geomap.js#L700)

If *value* is specified, toggles the map tiles and returns the current class instance. If *value* is not specified, returns the current tiling boolean.


This is a static method of [<code>Geomap</code>](#Geomap), and is chainable with other methods of this Class.

<a name="Geomap.topojson" href="Geomap.topojson">#</a> Geomap.**topojson**(*data*, [*formatter*]) [<>](https://github.com/d3plus/d3plus-geomap/blob/master/src/Geomap.js#L715)

Sets the topojson to be used for drawing geographical paths. The value passed should either be a valid Topojson *Object* or a *String* representing a filepath or URL to be loaded.

Additionally, a custom formatting function can be passed as a second argument to this method. This custom function will be passed the data that has been loaded, as long as there are no errors. This function should return the final Topojson *Obejct*.

If *data* is not specified, this method returns the current Topojson *Object*, which by default is `null`.


This is a static method of [<code>Geomap</code>](#Geomap), and is chainable with other methods of this Class.


| Param | Type | Description |
| --- | --- | --- |
| *data* | <code>Object</code> \| <code>String</code> | = [] |
| [*formatter*] | <code>function</code> |  |

<a name="Geomap.topojsonFilter" href="Geomap.topojsonFilter">#</a> Geomap.**topojsonFilter**([*value*]) [<>](https://github.com/d3plus/d3plus-geomap/blob/master/src/Geomap.js#L725)

If *value* is specified, filters the features used to calculate the initial projection fitExtent based on an ID, array of IDs, or filter function and returns the current class instance. If *value* is not specified, returns the current bounds filter.


This is a static method of [<code>Geomap</code>](#Geomap), and is chainable with other methods of this Class.

<a name="Geomap.topojsonKey" href="Geomap.topojsonKey">#</a> Geomap.**topojsonKey**(*value*) [<>](https://github.com/d3plus/d3plus-geomap/blob/master/src/Geomap.js#L740)

If *value* is specified, sets the topojson object key to be used and returns the current class instance. If *value* is not specified, returns the current topojson object key.


This is a static method of [<code>Geomap</code>](#Geomap), and is chainable with other methods of this Class.

<a name="Geomap.topojsonId" href="Geomap.topojsonId">#</a> Geomap.**topojsonId**(*value*) [<>](https://github.com/d3plus/d3plus-geomap/blob/master/src/Geomap.js#L750)

Specifies the accessor for the unique ID inside of each topojson object.


This is a static method of [<code>Geomap</code>](#Geomap), and is chainable with other methods of this Class.

<a name="Geomap.zoom" href="Geomap.zoom">#</a> Geomap.**zoom**([*value*]) [<>](https://github.com/d3plus/d3plus-geomap/blob/master/src/Geomap.js#L760)

If *value* is specified, toggles the zoom behavior and returns the current class instance. If *value* is not specified, returns the current zoom behavior.


This is a static method of [<code>Geomap</code>](#Geomap), and is chainable with other methods of this Class.

---

###### <sub>Documentation generated on Tue, 30 May 2017 19:12:49 GMT</sub>
