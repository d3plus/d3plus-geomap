import {extent, max, quantile} from "d3-array";
import {color} from "d3-color";
import * as d3Geo from "d3-geo";
import * as scales from "d3-scale";
import {event} from "d3-selection";
import {tile} from "d3-tile";
import {zoom, zoomTransform} from "d3-zoom";
import {feature} from "topojson-client";

import {accessor, assign, configPrep, constant} from "d3plus-common";
import {Circle, Path, pointDistance} from "d3plus-shape";
import {dataLoad as load, Viz} from "d3plus-viz";

/**
    @external Viz
    @see https://github.com/d3plus/d3plus-viz#Viz
*/

/**
    @class Geomap
    @extends external:Viz
    @desc Creates a geographical map with zooming, panning, image tiles, and the ability to layer choropleth paths and coordinate points. See [this example](https://d3plus.org/examples/d3plus-geomap/getting-started/) for help getting started.
*/
export default class Geomap extends Viz {

  /**
      @memberof Geomap
      @desc Invoked when creating a new class instance, and sets any default parameters.
      @private
  */
  constructor() {

    super();

    this._fitObject = false;
    this._ocean = "#cdd1d3";

    this._padding = 20;

    this._point = accessor("point");
    this._pointSize = constant(1);
    this._pointSizeMax = 10;
    this._pointSizeMin = 5;
    this._pointSizeScale = "linear";

    this._projection = d3Geo.geoMercator();

    this._rotate = [0, 0];

    this._shape = constant("Circle");
    this._shapeConfig = assign(this._shapeConfig, {
      Path: {
        fill: d => {
          if (this._colorScale && !this._coordData.features.includes(d)) {
            const c = this._colorScale(d);
            if (c !== undefined && c !== null) return this._colorScaleClass._colorScale(c);
          }
          return "#f5f5f3";
        },
        on: {
          "mouseenter": d => !this._coordData.features.includes(d) ? this._on.mouseenter.bind(this)(d) : null,
          "mousemove.shape": d => !this._coordData.features.includes(d) ? this._on["mousemove.shape"].bind(this)(d) : null,
          "mouseleave": d => !this._coordData.features.includes(d) ? this._on.mouseleave.bind(this)(d) : null
        },
        stroke: (d, i) => color(this._shapeConfig.Path.fill(d, i)).darker(),
        strokeWidth: 1
      }
    });

    this._tiles = true;
    this._tileGen = tile().wrap(false);
    this._tileUrl = "https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png";

    this._topojson = false;
    this._topojsonFilter = d => !["010"].includes(d.id);
    this._topojsonId = accessor("id");

    this._zoom = true;
    this._zoomBehavior = zoom();
    this._zoomBrush = false;
    // this._zoomFactor = 2;
    this._zoomPan = true;
    // this._zoomReset = true;
    this._zoomScroll = true;
    this._zoomSet = false;

  }

  /**
      Renders map tiles based on the current zoom level.
      @private
  */
  _renderTiles() {

    const tau = 2 * Math.PI,
          transform = zoomTransform(this._geomapGroup.node());

    let tileData = [];
    if (this._tiles) {
      // const d = this._projection(this._rotate)[0] - this._projection([0, 0])[0];
      tileData = this._tileGen
        .extent(this._zoomBehavior.translateExtent())
        .scale(this._projection.scale() * tau * transform.k)
        .translate(transform.apply(this._projection.translate()))
        ();

      this._tileGroup.attr("transform", `scale(${tileData.scale})translate(${tileData.translate})`);

    }

    const images = this._tileGroup.selectAll("image.tile")
        .data(tileData, d => `${d.x}-${d.y}-${d.z}`);

    images.exit().remove();

    images.enter().append("image")
      .attr("class", "tile")
      .attr("xlink:href", d => this._tileUrl
        .replace("{s}", ["a", "b", "c"][Math.random() * 3 | 0])
        .replace("{z}", d.z)
        .replace("{x}", d.x)
        .replace("{y}", d.y))
      .attr("width", 1)
      .attr("height", 1)
      .attr("x", d => d.x)
      .attr("y", d => d.y);

  }

  /**
      Handles events dispatched from this._zoomBehavior
      @private
  */
  _zoomed() {

    this._zoomGroup.attr("transform", event.transform);
    this._renderTiles();

    //   if (event && !this._zoomPan) {
    //     this._zoomPan = true;
    //     zoomEvents();
    //   }

    //   let s = this._zoomBehavior.scale();
    //   const trans = this._zoomBehavior.translate();
    //
    //   let pz = s / this._polyZoom;
    //
    //   if (pz < minZoom) {
    //     pz = minZoom;
    //     s = pz * this._polyZoom;
    //     this._zoomBehavior.scale(s);
    //   }
    // const nh = height;
    // const bh = coordBounds[1][1] - coordBounds[0][1];
    // const bw = coordBounds[1][0] - coordBounds[0][0];
    // const xoffset = (width - bw * pz) / 2;
    // const xmin = xoffset > 0 ? xoffset : 0;
    // const xmax = xoffset > 0 ? width - xoffset : width;
    // const yoffset = (nh - bh * pz) / 2;
    // const ymin = yoffset > 0 ? yoffset : 0;
    // const ymax = yoffset > 0 ? nh - yoffset : nh;
    //
    // const extent = this._zoomBehavior.translateExtent();
    // if (transform.x + extent[0][0] * transform.k > xmin) {
    //   transform.x = -extent[0][0] * transform.k + xmin;
    // }
    // else if (transform.x + extent[1][0] * transform.k < xmax) {
    //   transform.x = xmax - extent[1][0] * transform.k;
    // }
    //
    // if (transform.y + extent[0][1] * transform.k > ymin) {
    //   transform.y = -extent[0][1] * transform.k + ymin;
    // }
    // else if (transform.y + extent[1][1] * transform.k < ymax) {
    //   transform.y = ymax - extent[1][1] * transform.k;
    // }
    // console.log(transform, this._zoomBehavior.translateExtent());
    //   this._zoomBehavior.translate(trans);

  }



  /**
      Handles adding/removing zoom event listeners.
      @private
  */
  _zoomEvents() {

    if (this._zoomBrush) {
      // brushGroup.style("display", "inline");
      this._geomapGroup.on(".zoom", null);
    }
    else if (this._zoom) {
      // brushGroup.style("display", "none");
      this._geomapGroup.call(this._zoomBehavior);
      if (!this._zoomScroll) {
        this._geomapGroup
          .on("mousewheel.zoom", null)
          .on("MozMousePixelScroll.zoom", null)
          .on("wheel.zoom", null);
      }
      if (!this._zoomPan) {
        this._geomapGroup
          .on("mousedown.zoom", null)
          .on("mousemove.zoom", null)
          .on("touchstart.zoom", null)
          .on("touchmove.zoom", null);
      }
    }
    else {
      this._geomapGroup.on(".zoom", null);
    }

  }

  /**
      Extends the draw behavior of the abstract Viz class.
      @private
  */
  _draw(callback) {

    super._draw(callback);

    const height = this._height - this._margin.top - this._margin.bottom,
          width = this._width - this._margin.left - this._margin.right;

    this._geomapGroup = this._select.selectAll("svg.d3plus-geomap-geomapGroup").data([0]);
    this._geomapGroup = this._geomapGroup.enter().append("svg")
      .attr("class", "d3plus-geomap-geomapGroup")
      .attr("opacity", 0)
      .attr("width", width)
      .attr("height", height)
      .attr("x", this._margin.left)
      .attr("y", this._margin.top)
      .style("background-color", this._ocean || "transparent")
      .merge(this._geomapGroup);
    this._geomapGroup.transition(this._transition)
      .attr("opacity", 1)
      .attr("width", width)
      .attr("height", height)
      .attr("x", this._margin.left)
      .attr("y", this._margin.top);

    const ocean = this._geomapGroup.selectAll("rect.d3plus-geomap-ocean").data([0]);
    ocean.enter().append("rect")
        .attr("class", "d3plus-geomap-ocean")
      .merge(ocean)
        .attr("width", width)
        .attr("height", height)
        .attr("fill", this._ocean || "transparent");

    this._tileGroup = this._geomapGroup.selectAll("g.d3plus-geomap-tileGroup").data([0]);
    this._tileGroup = this._tileGroup.enter().append("g")
      .attr("class", "d3plus-geomap-tileGroup")
      .merge(this._tileGroup);

    this._zoomGroup = this._geomapGroup.selectAll("g.d3plus-geomap-zoomGroup").data([0]);
    this._zoomGroup = this._zoomGroup.enter().append("g")
      .attr("class", "d3plus-geomap-zoomGroup")
      .merge(this._zoomGroup);

    let pathGroup = this._zoomGroup.selectAll("g.d3plus-geomap-paths").data([0]);
    pathGroup = pathGroup.enter().append("g")
      .attr("class", "d3plus-geomap-paths")
      .merge(pathGroup);

    // TODO: Brush to Zoom
    // const brushGroup = this._select.selectAll("g.brush").data([0]);
    // brushGroup.enter().append("g").attr("class", "brush");
    //
    // var xBrush = d3.scale.identity().domain([0, width]),
    //     yBrush = d3.scale.identity().domain([0, height]);
    //
    // function brushended(e) {
    //
    //   if (!event.sourceEvent) return;
    //
    //   const extent = brush.extent();
    //   brushGroup.call(brush.clear());
    //
    //   const zs = this._zoomBehavior.scale(), zt = this._zoomBehavior.translate();
    //
    //   const pos1 = extent[0].map((p, i) => (p - zt[i]) / (zs / this._polyZoom));
    //   const pos2 = extent[1].map((p, i) => (p - zt[i]) / (zs / this._polyZoom));
    //
    //   zoomToBounds([pos1, pos2]);
    //
    // }
    //
    // var brush = d3.svg.brush()
    //   .x(xBrush)
    //   .y(yBrush)
    //   .on("brushend", brushended);
    //
    // if (this._zoom) brushGroup.call(brush);

    function topo2feature(topo, key) {
      const k = key && topo.objects[key] ? key : Object.keys(topo.objects)[0];
      return feature(topo, topo.objects[k]);
    }

    const coordData = this._coordData = this._topojson
      ? topo2feature(this._topojson, this._topojsonKey)
      : {type: "FeatureCollection", features: []};

    if (this._topojsonFilter) coordData.features = coordData.features.filter(this._topojsonFilter);

    const path = this._path = d3Geo.geoPath()
      .projection(this._projection);

    const pointData = this._filteredData
      .filter((d, i) => this._point(d, i) instanceof Array);

    const pathData = this._filteredData
      .filter((d, i) => !(this._point(d, i) instanceof Array))
      .reduce((obj, d) => {
        obj[this._id(d)] = d;
        return obj;
      }, {});

    const topoData = coordData.features.reduce((arr, feature) => {
      const id = this._topojsonId(feature);
      arr.push({
        __d3plus__: true,
        data: pathData[id],
        feature,
        id
      });
      return arr;
    }, []);

    const r = scales[`scale${this._pointSizeScale.charAt(0).toUpperCase()}${this._pointSizeScale.slice(1)}`]()
      .domain(extent(pointData, (d, i) => this._pointSize(d, i)))
      .range([this._pointSizeMin, this._pointSizeMax]);

    if (!this._zoomSet) {

      const fitData = this._fitObject ? topo2feature(this._fitObject, this._fitKey) : coordData;

      let extentBounds = {
        type: "FeatureCollection",
        features: this._fitFilter ? fitData.features.filter(this._fitFilter) : fitData.features.slice()
      };

      extentBounds.features = extentBounds.features.reduce((arr, d) => {

        const reduced = {
          type: d.type,
          id: d.id,
          geometry: {
            coordinates: d.geometry.coordinates,
            type: d.geometry.type
          }
        };

        if (d.geometry.coordinates.length > 1) {

          const areas = [],
                distances = [];

          d.geometry.coordinates.forEach(c => {

            reduced.geometry.coordinates = [c];
            areas.push(path.area(reduced));

          });

          reduced.geometry.coordinates = [d.geometry.coordinates[areas.indexOf(max(areas))]];
          const center = path.centroid(reduced);

          d.geometry.coordinates.forEach(c => {

            reduced.geometry.coordinates = [c];
            distances.push(pointDistance(path.centroid(reduced), center));

          });

          const distCutoff = quantile(areas.reduce((arr, dist, i) => {
            if (dist) arr.push(areas[i] / dist);
            return arr;
          }, []), 0.9);

          reduced.geometry.coordinates = d.geometry.coordinates.filter((c, i) => {
            const dist = distances[i];
            return dist === 0 || areas[i] / dist >= distCutoff;
          });

        }

        arr.push(reduced);
        return arr;

      }, []);

      let pad = this._padding;
      if (typeof pad === "string") {
        pad = pad.match(/([-\d\.]+)/g).map(Number);
        if (pad.length === 3) pad.push(pad[1]);
        if (pad.length === 2) pad = pad.concat(pad);
        if (pad.length === 1) pad = Array(4).fill(pad);
      }
      else {
        pad = Array(4).fill(pad);
      }

      if (!extentBounds.features.length && pointData.length) {

        const bounds = [[undefined, undefined], [undefined, undefined]];
        pointData.forEach((d, i) => {

          const point = this._projection(this._point(d, i));
          if (bounds[0][0] === void 0 || point[0] < bounds[0][0]) bounds[0][0] = point[0];
          if (bounds[1][0] === void 0 || point[0] > bounds[1][0]) bounds[1][0] = point[0];
          if (bounds[0][1] === void 0 || point[1] < bounds[0][1]) bounds[0][1] = point[1];
          if (bounds[1][1] === void 0 || point[1] > bounds[1][1]) bounds[1][1] = point[1];

        });

        extentBounds = {
          type: "FeatureCollection",
          features: [{
            type: "Feature",
            geometry: {
              type: "MultiPoint",
              coordinates: bounds.map(b => this._projection.invert(b))
            }
          }]
        };
        const maxSize = max(pointData, (d, i) => r(this._pointSize(d, i)));
        pad = pad.map(p => p + maxSize);

      }

      this._projection = this._projection
        .fitExtent(
          extentBounds.features.length ? [[pad[3], pad[0]], [width - pad[1] * 2, height - pad[2] * 2]] : [[0, 0], [width, height]],
          extentBounds.features.length ? extentBounds : {type: "Sphere"}
        );

      this._zoomBehavior
        .extent([[0, 0], [width, height]])
        .scaleExtent([1, 16])
        .translateExtent([[0, 0], [width, height]])
        .on("zoom", this._zoomed.bind(this));

      this._zoomSet = true;

    }

    // TODO: Zoom math?
    // function zoomMath(factor) {
    //
    //   const center = [width / 2, height / 2];
    //
    //   const extent = this._zoomBehavior.scaleExtent(),
    //         scale = this._zoomBehavior.scale(),
    //         translate = this._zoomBehavior.translate();
    //
    //   let targetScale = scale * factor,
    //       x = translate[0],
    //       y = translate[1];
    //
    //   // If we're already at an extent, done
    //   if (targetScale === extent[0] || targetScale === extent[1]) return false;
    //
    //   // If the factor is too much, scale it down to reach the extent exactly
    //   const clampedScale = Math.max(extent[0], Math.min(extent[1], targetScale));
    //   if (clampedScale !== targetScale) {
    //     targetScale = clampedScale;
    //     factor = targetScale / scale;
    //   }
    //
    //   // Center each vector, stretch, then put back
    //   x = (x - center[0]) * factor + center[0];
    //   y = (y - center[1]) * factor + center[1];
    //
    //   this._zoomBehavior.scale(targetScale).translate([x, y]);
    //   zoomed(this._duration);
    //
    //   return true;
    //
    // }

    // TODO: Zoom controls
    // if (this._zoom) {
    //
    //   const controls = this._select.selectAll(".map-controls").data([0]);
    //   const controlsEnter = controls.enter().append("div")
    //     .attr("class", "map-controls");
    //
    //   controlsEnter.append("div").attr("class", "zoom-in")
    //     .on("click", () => zoomMath(this._zoomFactor));
    //
    //   controlsEnter.append("div").attr("class", "zoom-out")
    //     .on("click", () => zoomMath(1 / this._zoomFactor));
    //
    //   controlsEnter.append("div").attr("class", "zoom-reset");
    //   controls.select(".zoom-reset").on("click", () => {
    //     // vars.highlight.value = false;
    //     // this._highlightPath = undefined;
    //     zoomLogic();
    //   });
    //
    // }

    // TODO: Zoom logic? What's this do?
    // function zoomLogic(d) {
    //
    //   this._zoomReset = true;
    //
    //   if (d) zoomToBounds(this._path.bounds(d));
    //   else {
    //
    //     let ns = s;
    //
    //     // next line might not be needed?
    //     ns = ns / Math.PI / 2 * this._polyZoom;
    //
    //     this._zoomBehavior.scale(ns * 2 * Math.PI).translate(t);
    //     zoomed(this._duration);
    //
    //   }
    //
    // }

    this._shapes.push(new Path()
      .data(topoData)
      .d(d => path(d.feature))
      .select(pathGroup.node())
      .x(0).y(0)
      .config(configPrep.bind(this)(this._shapeConfig, "shape", "Path"))
      .render());

    let pointGroup = this._zoomGroup.selectAll("g.d3plus-geomap-pins").data([0]);
    pointGroup = pointGroup.enter().append("g")
      .attr("class", "d3plus-geomap-pins")
      .merge(pointGroup);

    const circles = new Circle()
      .config(configPrep.bind(this)(this._shapeConfig, "shape", "Circle"))
      .data(pointData)
      .r((d, i) => r(this._pointSize(d, i)))
      .select(pointGroup.node())
      .sort((a, b) => this._pointSize(b) - this._pointSize(a))
      .x((d, i) => this._projection(this._point(d, i))[0])
      .y((d, i) => this._projection(this._point(d, i))[1]);

    const events = Object.keys(this._on);
    const classEvents = events.filter(e => e.includes(".Circle")),
          globalEvents = events.filter(e => !e.includes(".")),
          shapeEvents = events.filter(e => e.includes(".shape"));
    for (let e = 0; e < globalEvents.length; e++) circles.on(globalEvents[e], this._on[globalEvents[e]]);
    for (let e = 0; e < shapeEvents.length; e++) circles.on(shapeEvents[e], this._on[shapeEvents[e]]);
    for (let e = 0; e < classEvents.length; e++) circles.on(classEvents[e], this._on[classEvents[e]]);

    this._shapes.push(circles.render());

    // Attaches any initial zoom event handlers.
    this._zoomEvents();

    // TODO: Zooming to Bounds
    // function zoomToBounds(b, mod = 250) {
    //
    //   const w = width - mod;
    //
    //   let ns = this._scale / Math.max((b[1][0] - b[0][0]) / w, (b[1][1] - b[0][1]) / height);
    //   const nt = [(w - ns * (b[1][0] + b[0][0])) / 2, (height - ns * (b[1][1] + b[0][1])) / 2];
    //
    //   ns = ns / Math.PI / 2 * this._polyZoom;
    //
    //   this._zoomBehavior.scale(ns * 2 * Math.PI).translate(nt);
    //   zoomed(this._duration);
    //
    // }

    // TODO: Detect zoom brushing
    // select("body")
    //   .on(`keydown.d3plus-geomap-${this._uuid}`, function() {
    //     if (event.keyCode === 16) {
    //       this._zoomBrush = true;
    //       zoomEvents();
    //     }
    //   })
    //   .on(`keyup.d3plus-geomap-${this._uuid}`, function() {
    //     if (event.keyCode === 16) {
    //       this._zoomBrush = false;
    //       zoomEvents();
    //     }
    //   });

    this._renderTiles();

    return this;

  }

  /**
      @memberof Geomap
      @desc Topojson files sometimes include small geographies that negatively impact how the library determines the default zoom level (for example, a small island or territory far off the coast that is barely visible to the eye). The fitFilter method can be used to remove specific geographies from the logic used to determine the zooming.

The *value* passed can be a single id to remove, an array of ids, or a filter function. Take a look at the [Choropleth Example](http://d3plus.org/examples/d3plus-geomap/getting-started/) to see it in action.
      @param {Number|String|Array|Function} [*value*]
      @chainable
  */
  fitFilter(_) {
    if (arguments.length) {
      if (typeof _ === "function") return this._fitFilter = _, this;
      if (!(_ instanceof Array)) _ = [_];
      return this._fitFilter = d => _.includes(d.id), this;
    }
    return this._fitFilter;
  }

  /**
      @memberof Geomap
      @desc If the topojson being used to determine the zoom fit (either the main [topojson](#Geomap.topojson) object or the [fitObject](#Geomap.fitObject)) contains multiple geographical sets (for example, a file containing state and county boundaries), use this method to indentify which set to use for the zoom fit.

If not specified, the first key in the *Array* returned from using `Object.keys` on the topojson will be used.
      @param {String} *value*
      @chainable
  */
  fitKey(_) {
    return arguments.length ? (this._fitKey = _, this) : this._fitKey;
  }

  /**
      @memberof Geomap
      @desc The topojson to be used for the initial projection [fit extent](https://github.com/d3/d3-geo#projection_fitExtent). The value passed should either be a valid Topojson *Object* or a *String* representing a filepath or URL to be loaded.

Additionally, a custom formatting function can be passed as a second argument to this method. This custom function will be passed the data that has been loaded, as long as there are no errors. This function needs to return the final Topojson *Object*.
      @param {Object|String} *data* = `undefined`
      @param {Function} [*formatter*]
      @chainable
  */
  fitObject(_, f) {
    return arguments.length ? (this._queue.push([load.bind(this), _, f, "fitObject"]), this) : this._fitObject;
  }

  /**
      @memberof Geomap
      @desc The color visible behind any shapes drawn on the map projection. By default, a color value matching the color used in the map tiles is used to help mask the loading time needed to render the tiles. Any value CSS color value may be used, including hexidecimal, rgb, rgba, and color strings like `"blue"` and `"transparent"`.
      @param {String} [*value* = "#cdd1d3"]
      @chainable
  */
  ocean(_) {
    return arguments.length ? (this._ocean = _, this) : this._ocean;
  }

  /**
      @memberof Geomap
      @desc The outer padding between the edge of the visualization and the shapes drawn. The value passed can be either a single number to be used on all sides, or a CSS string pattern (ie. `"20px 0 10px"`).
      @param {Number|String} [*value* = 20]
      @chainable
  */
  padding(_) {
    return arguments.length ? (this._padding = _, this) : this._padding;
  }

  /**
      @memberof Geomap
      @desc The accessor to be used when detecting coordinate points in the objects passed to the [data](https://d3plus.org/docs/#Viz.data) method. Values are expected to be in the format `[longitude, latitude]`, which is in-line with d3's expected coordinate mapping.
      @param {Function|Array} [*value*]
      @chainable
  */
  point(_) {
    return arguments.length ? (this._point = typeof _ === "function" ? _ : constant(_), this) : this._point;
  }

  /**
      @memberof Geomap
      @desc The accessor or static value to be used for sizing coordinate points.
      @param {Function|Number} [*value*]
      @chainable
  */
  pointSize(_) {
    return arguments.length ? (this._pointSize = typeof _ === "function" ? _ : constant(_), this) : this._pointSize;
  }

  /**
      @memberof Geomap
      @desc The maximum pixel radius used in the scale for sizing coordinate points.
      @param {Number} [*value* = 10]
      @chainable
  */
  pointSizeMax(_) {
    return arguments.length ? (this._pointSizeMax = _, this) : this._pointSizeMax;
  }

  /**
      @memberof Geomap
      @desc The minimum pixel radius used in the scale for sizing coordinate points.
      @param {Number} [*value* = 5]
      @chainable
  */
  pointSizeMin(_) {
    return arguments.length ? (this._pointSizeMin = _, this) : this._pointSizeMin;
  }

  /**
      @memberof Geomap
      @desc Toggles the visibility of the map tiles.
      @param {Boolean} [*value* = true]
      @chainable
  */
  tiles(_) {
    return arguments.length ? (this._tiles = _, this) : this._tiles;
  }

  /**
      @memberof Geomap
      @desc By default, d3plus uses the `light_all` style provided by [CARTO](https://carto.com/location-data-services/basemaps/) for it's map tiles. The [tileUrl](https://d3plus.org/docs/#Geomap.tileUrl) method changes the base URL used for fetching the tiles, as long as the string passed contains `{x}`, `{y}`, and `{z}` variables enclosed in curly brackets for the zoom logic to load the correct tiles.
      @param {String} [url="https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png"]
      @chainable
  */
  tileUrl(_) {
    return arguments.length ? (this._tileUrl = _, this) : this._tileUrl;
  }

  /**
      @memberof Geomap
      @desc The topojson to be used for drawing geographical paths. The value passed should either be a valid Topojson *Object* or a *String* representing a filepath or URL to be loaded.

Additionally, a custom formatting function can be passed as a second argument to this method. This custom function will be passed the data that has been loaded, as long as there are no errors. This function should return the final Topojson *Obejct*.
      @param {Object|String} *data* = []
      @param {Function} [*formatter*]
      @chainable
  */
  topojson(_, f) {
    return arguments.length ? (this._queue.push([load.bind(this), _, f, "topojson"]), this) : this._topojson;
  }

  /**
      @memberof Geomap
      @desc If the [topojson](#Geomap.topojson) being used contains boundaries that should not be shown, this method can be used to filter them out of the final output. The *value* passed can be a single id to remove, an array of ids, or a filter function.
      @param {Number|String|Array|Function} [*value*]
      @chainable
  */
  topojsonFilter(_) {
    if (arguments.length) {
      if (typeof _ === "function") return this._topojsonFilter = _, this;
      if (!(_ instanceof Array)) _ = [_];
      return this._topojsonFilter = d => _.includes(d.id), this;
    }
    return this._topojsonFilter;
  }

  /**
      @memberof Geomap
      @desc If the [topojson](#Geomap.topojson) contains multiple geographical sets (for example, a file containing state and county boundaries), use this method to indentify which set to use.

If not specified, the first key in the *Array* returned from using `Object.keys` on the topojson will be used.
      @param {String} *value*
      @chainable
  */
  topojsonKey(_) {
    return arguments.length ? (this._topojsonKey = _, this) : this._topojsonKey;
  }

  /**
      @memberof Geomap
      @desc The accessor used to map each topojson geometry to it's corresponding [data](https://d3plus.org/docs/#Viz.data) point.
      @param {String|Function} *value* = "id"
      @chainable
  */
  topojsonId(_) {
    return arguments.length ? (this._topojsonId = typeof _ === "function" ? _ : accessor(_), this, this) : this._topojsonId;
  }

  /**
      @memberof Geomap
      @desc Toggles the ability to zoom/pan the map.
      @param {Boolean} [*value* = true]
      @chainable
  */
  zoom(_) {
    return arguments.length ? (this._zoom = _, this) : this._zoom;
  }

}
