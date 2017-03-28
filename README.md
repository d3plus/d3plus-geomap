# d3plus-geomap

[![NPM Release](http://img.shields.io/npm/v/d3plus-geomap.svg?style=flat)](https://www.npmjs.org/package/d3plus-geomap)
[![Build Status](https://travis-ci.org/d3plus/d3plus-geomap.svg?branch=master)](https://travis-ci.org/d3plus/d3plus-geomap)
[![Dependency Status](http://img.shields.io/david/d3plus/d3plus-geomap.svg?style=flat)](https://david-dm.org/d3plus/d3plus-geomap)
[![Slack](https://img.shields.io/badge/Slack-Click%20to%20Join!-green.svg?style=social)](https://goo.gl/forms/ynrKdvusekAwRMPf2)

A reusable geo map built on D3 and Topojson

## Installing

If you use NPM, `npm install d3plus-geomap`. Otherwise, download the [latest release](https://github.com/d3plus/d3plus-geomap/releases/latest). The released bundle supports AMD, CommonJS, and vanilla environments. Create a [custom bundle using Rollup](https://github.com/rollup/rollup) or your preferred bundler. You can also load directly from [d3plus.org](https://d3plus.org):

```html
<script src="https://d3plus.org/js/d3plus-geomap.v0.4.full.min.js"></script>
```


## API Reference
<a name="Geomap"></a>

### Geomap ⇐ <code>Viz</code>
**Kind**: global class  
**Extends**: <code>Viz</code>  

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

<a name="new_Geomap_new"></a>

#### new Geomap()
Creates SVG paths and coordinate points based on an array of data. See [this example](https://d3plus.org/examples/d3plus-geomap/getting-started/) for help getting started using the geomap generator.

<a name="Geomap.fitFilter"></a>

#### Geomap.fitFilter([*value*]) ↩︎
If *value* is specified, filters the features used to calculate the initial projection fitExtent based on an ID, array of IDs, or filter function and returns the current class instance. If *value* is not specified, returns the current bounds filter.

**Kind**: static method of <code>[Geomap](#Geomap)</code>  
**Chainable**  

| Param | Type |
| --- | --- |
| [*value*] | <code>Number</code> \| <code>String</code> \| <code>Array</code> \| <code>function</code> | 

<a name="Geomap.fitKey"></a>

#### Geomap.fitKey(*value*) ↩︎
If *value* is specified, sets the topojson object key to be used and returns the current class instance. If *value* is not specified, returns the current topojson object key.

**Kind**: static method of <code>[Geomap](#Geomap)</code>  
**Chainable**  

| Param | Type |
| --- | --- |
| *value* | <code>String</code> | 

<a name="Geomap.fitObject"></a>

#### Geomap.fitObject(*data*, [*formatter*]) ↩︎
Sets the topojson to be used for the initial projection [fit extent](https://github.com/d3/d3-geo#projection_fitExtent). The value passed should either be a valid Topojson *Object* or a *String* representing a filepath or URL to be loaded.

Additionally, a custom formatting function can be passed as a second argument to this method. This custom function will be passed the data that has been loaded, as long as there are no errors. This function should return the final Topojson *Obejct*.

If *data* is not specified, this method returns the current Topojson *Object*, which by default is `undefined`.

**Kind**: static method of <code>[Geomap](#Geomap)</code>  
**Chainable**  

| Param | Type | Description |
| --- | --- | --- |
| *data* | <code>Object</code> \| <code>String</code> | = `undefined` |
| [*formatter*] | <code>function</code> |  |

<a name="Geomap.ocean"></a>

#### Geomap.ocean([*value*]) ↩︎
If *value* is specified, sets the ocean color and returns the current class instance. If *value* is not specified, returns the current ocean color.

**Kind**: static method of <code>[Geomap](#Geomap)</code>  
**Chainable**  

| Param | Type | Default |
| --- | --- | --- |
| [*value*] | <code>String</code> | <code>&quot;#cdd1d3&quot;</code> | 

<a name="Geomap.padding"></a>

#### Geomap.padding([*value*]) ↩︎
Defines the outer padding between the edge of the visualization and the shapes drawn. The value can either be a single number to be used on all sides, or a CSS string pattern (ie. `"20px 0 10px"`).

**Kind**: static method of <code>[Geomap](#Geomap)</code>  
**Chainable**  

| Param | Type | Default |
| --- | --- | --- |
| [*value*] | <code>Number</code> \| <code>String</code> | <code>20</code> | 

<a name="Geomap.point"></a>

#### Geomap.point([*value*]) ↩︎
If *value* is specified, sets the point accessor to the specified function or array and returns the current class instance. Point values are expected in the format [longitude, latitude], which is in-line with d3's expected [x, y] mapping. If *value* is not specified, returns the current point accessor.

**Kind**: static method of <code>[Geomap](#Geomap)</code>  
**Chainable**  

| Param | Type |
| --- | --- |
| [*value*] | <code>function</code> \| <code>Array</code> | 

<a name="Geomap.pointSize"></a>

#### Geomap.pointSize([*value*]) ↩︎
If *value* is specified, sets the point size accessor to the specified function or number and returns the current class instance. If *value* is not specified, returns the current point size accessor.

**Kind**: static method of <code>[Geomap](#Geomap)</code>  
**Chainable**  

| Param | Type |
| --- | --- |
| [*value*] | <code>function</code> \| <code>Number</code> | 

<a name="Geomap.pointSizeMax"></a>

#### Geomap.pointSizeMax([*value*]) ↩︎
If *value* is specified, sets the maximum point radius and returns the current class instance. If *value* is not specified, returns the current maximum point radius.

**Kind**: static method of <code>[Geomap](#Geomap)</code>  
**Chainable**  

| Param | Type | Default |
| --- | --- | --- |
| [*value*] | <code>Number</code> | <code>10</code> | 

<a name="Geomap.pointSizeMin"></a>

#### Geomap.pointSizeMin([*value*]) ↩︎
If *value* is specified, sets the minimum point radius and returns the current class instance. If *value* is not specified, returns the current minimum point radius.

**Kind**: static method of <code>[Geomap](#Geomap)</code>  
**Chainable**  

| Param | Type | Default |
| --- | --- | --- |
| [*value*] | <code>Number</code> | <code>5</code> | 

<a name="Geomap.tiles"></a>

#### Geomap.tiles([*value*]) ↩︎
If *value* is specified, toggles the map tiles and returns the current class instance. If *value* is not specified, returns the current tiling boolean.

**Kind**: static method of <code>[Geomap](#Geomap)</code>  
**Chainable**  

| Param | Type | Default |
| --- | --- | --- |
| [*value*] | <code>Boolean</code> | <code>true</code> | 

<a name="Geomap.topojson"></a>

#### Geomap.topojson(*data*, [*formatter*]) ↩︎
Sets the topojson to be used for drawing geographical paths. The value passed should either be a valid Topojson *Object* or a *String* representing a filepath or URL to be loaded.

Additionally, a custom formatting function can be passed as a second argument to this method. This custom function will be passed the data that has been loaded, as long as there are no errors. This function should return the final Topojson *Obejct*.

If *data* is not specified, this method returns the current Topojson *Object*, which by default is `null`.

**Kind**: static method of <code>[Geomap](#Geomap)</code>  
**Chainable**  

| Param | Type | Description |
| --- | --- | --- |
| *data* | <code>Object</code> \| <code>String</code> | = [] |
| [*formatter*] | <code>function</code> |  |

<a name="Geomap.topojsonFilter"></a>

#### Geomap.topojsonFilter([*value*]) ↩︎
If *value* is specified, filters the features used to calculate the initial projection fitExtent based on an ID, array of IDs, or filter function and returns the current class instance. If *value* is not specified, returns the current bounds filter.

**Kind**: static method of <code>[Geomap](#Geomap)</code>  
**Chainable**  

| Param | Type |
| --- | --- |
| [*value*] | <code>Number</code> \| <code>String</code> \| <code>Array</code> \| <code>function</code> | 

<a name="Geomap.topojsonKey"></a>

#### Geomap.topojsonKey(*value*) ↩︎
If *value* is specified, sets the topojson object key to be used and returns the current class instance. If *value* is not specified, returns the current topojson object key.

**Kind**: static method of <code>[Geomap](#Geomap)</code>  
**Chainable**  

| Param | Type |
| --- | --- |
| *value* | <code>String</code> | 

<a name="Geomap.topojsonId"></a>

#### Geomap.topojsonId(*value*) ↩︎
Specifies the accessor for the unique ID inside of each topojson object.

**Kind**: static method of <code>[Geomap](#Geomap)</code>  
**Chainable**  

| Param | Type | Description |
| --- | --- | --- |
| *value* | <code>String</code> \| <code>function</code> | = "id" |

<a name="Geomap.zoom"></a>

#### Geomap.zoom([*value*]) ↩︎
If *value* is specified, toggles the zoom behavior and returns the current class instance. If *value* is not specified, returns the current zoom behavior.

**Kind**: static method of <code>[Geomap](#Geomap)</code>  
**Chainable**  

| Param | Type | Default |
| --- | --- | --- |
| [*value*] | <code>Boolean</code> | <code>true</code> | 



###### <sub>Documentation generated on Tue, 28 Mar 2017 02:00:56 GMT</sub>
