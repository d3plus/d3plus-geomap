import {extent, max, quantile} from "d3-array";
import * as d3Geo from "d3-geo";
import * as scales from "d3-scale";
import {event} from "d3-selection";
import {tile} from "d3-tile";
import {zoom, zoomTransform} from "d3-zoom";
import {default as topo} from "../test/samoa.json";
// import {default as topo} from "world-atlas/world/110m.json";
import {feature} from "topojson-client";

import {accessor, constant} from "d3plus-common";
import {Circle, Path, pointDistance} from "d3plus-shape";
import {Viz} from "d3plus-viz";

/**
    @class Geomap
    @extends Viz
    @desc Creates SVG paths and coordinate points based on an array of data. See [this example](https://d3plus.org/examples/d3plus-geomap/getting-started/) for help getting started using the geomap generator.
*/
export default class Geomap extends Viz {

  /**
      @memberof Geomap
      @desc Invoked when creating a new class instance, and sets any default parameters.
      @private
  */
  constructor() {

    super();

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
    this._shapeConfig = Object.assign({}, this._shapeConfig, {
      Path: {
        fill: "#f5f5f3",
        stroke: "#b1babe",
        strokeWidth: 1
      }
    });

    this._tiles = true;
    this._tileGen = tile();
    // TODO: waiting on d3-tile release update
    // this._tileGen = tile().wrap(false);
    this._tileUrl = "https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png";

    this._topojson = topo;
    this._topojsonFilter = d => !["010"].includes(d.id);
    this._topojsonKey = "countries";

    this._zoom = true;
    this._zoomBehavior = zoom();
    this._zoomBrush = false;
    this._zoomFactor = 2;
    this._zoomPan = true;
    this._zoomReset = true;
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
        .data(tileData, d => d.join("-"));

    images.exit().remove();

    images.enter().append("image")
      .attr("class", "tile")
      .attr("xlink:href", d => this._tileUrl
        .replace("{s}", ["a", "b", "c"][Math.random() * 3 | 0])
        .replace("{z}", d[2])
        .replace("{x}", d[0])
        .replace("{y}", d[1]))
      .attr("width", 1)
      .attr("height", 1)
      .attr("x", d => d[0])
      .attr("y", d => d[1]);

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
      Extends the render behavior of the abstract Viz class.
      @private
  */
  render(callback) {

    super.render(callback);

    const height = this._height - this._margin.top - this._margin.bottom,
          width = this._width - this._margin.left - this._margin.right;

    this._geomapGroup = this._select.selectAll("svg.d3plus-geomap-geomapGroup").data([0]);
    this._geomapGroup = this._geomapGroup.enter().append("svg")
      .attr("class", "d3plus-geomap-geomapGroup")
      .attr("opacity", 0)
      .attr("width", width)
      .attr("height", height)
      .style("background-color", this._ocean || "transparent")
      .merge(this._geomapGroup);
    this._geomapGroup.transition(this._transition)
      .attr("opacity", 1)
      .attr("width", width)
      .attr("height", height);

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

    const coordData = this._topojson
                    ? feature(this._topojson, this._topojson.objects[this._topojsonKey])
                    : {type: "FeatureCollection", features: []};

    if (this._topojsonFilter) coordData.features = coordData.features.filter(this._topojsonFilter);

    const p = this._padding;

    const path = this._path = d3Geo.geoPath()
      .projection(this._projection);

    if (!this._zoomSet) {

      const extentBounds = {
        type: "FeatureCollection",
        features: this._bounds ? coordData.features.filter(this._bounds) : coordData.features.slice()
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

      this._projection = this._projection
        .fitExtent([[p, p], [width - p * 2, height - p * 2]], extentBounds);

      this._zoomBehavior
        .scaleExtent([1, 16])
        .translateExtent([[0, 0], [width, height]])
        .on("zoom", this._zoomed.bind(this));

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
      .config(this._shapeConfig.Path)
      .data(coordData.features)
      .d(path)
      .select(pathGroup.node())
      .x(0).y(0)
      .render());

    let pointGroup = this._zoomGroup.selectAll("g.d3plus-geomap-pins").data([0]);
    pointGroup = pointGroup.enter().append("g")
      .attr("class", "d3plus-geomap-pins")
      .merge(pointGroup);

    const pointData = this._filteredData.filter((d, i) => this._shape(d, i) !== "Path");

    const r = scales[`scale${this._pointSizeScale.charAt(0).toUpperCase()}${this._pointSizeScale.slice(1)}`]()
      .domain(extent(pointData, (d, i) => this._pointSize(d, i)))
      .range([this._pointSizeMin, this._pointSizeMax]);

    const circles = new Circle()
      .config(this._shapeConfig)
      .config(this._shapeConfig.Circle || {})
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
      @desc If *value* is specified, filters the features used to calculate the initial projection fitExtent based on an ID, array of IDs, or filter function and returns the current class instance. If *value* is not specified, returns the current bounds filter.
      @param {Number|String|Array|Function} [*value*]
  */
  bounds(_) {
    if (arguments.length) {
      if (typeof _ === "function") return this._bounds = _, this;
      if (!(_ instanceof Array)) _ = [_];
      return this._bounds = d => _.includes(d.id), this;
    }
    return this._bounds;
  }

  /**
      @memberof Geomap
      @desc If *value* is specified, sets the ocean color and returns the current class instance. If *value* is not specified, returns the current ocean color.
      @param {String} [*value* = "#cdd1d3"]
  */
  ocean(_) {
    return arguments.length ? (this._ocean = _, this) : this._ocean;
  }

  /**
      @memberof Geomap
      @desc If *value* is specified, sets the topojson outer padding and returns the current class instance. If *value* is not specified, returns the current topojson outer padding.
      @param {Number} [*value* = 20]
  */
  padding(_) {
    return arguments.length ? (this._padding = _, this) : this._padding;
  }

  /**
      @memberof Geomap
      @desc If *value* is specified, sets the point accessor to the specified function or array and returns the current class instance. Point values are expected in the format [longitude, latitude], which is in-line with d3's expected [x, y] mapping. If *value* is not specified, returns the current point accessor.
      @param {Function|Array} [*value*]
  */
  point(_) {
    return arguments.length ? (this._point = typeof _ === "function" ? _ : constant(_), this) : this._point;
  }

  /**
      @memberof Geomap
      @desc If *value* is specified, sets the point size accessor to the specified function or number and returns the current class instance. If *value* is not specified, returns the current point size accessor.
      @param {Function|Number} [*value*]
  */
  pointSize(_) {
    return arguments.length ? (this._pointSize = typeof _ === "function" ? _ : constant(_), this) : this._pointSize;
  }

  /**
      @memberof Geomap
      @desc If *value* is specified, sets the maximum point radius and returns the current class instance. If *value* is not specified, returns the current maximum point radius.
      @param {Number} [*value* = 10]
  */
  pointSizeMax(_) {
    return arguments.length ? (this._pointSizeMax = _, this) : this._pointSizeMax;
  }

  /**
      @memberof Geomap
      @desc If *value* is specified, sets the minimum point radius and returns the current class instance. If *value* is not specified, returns the current minimum point radius.
      @param {Number} [*value* = 5]
  */
  pointSizeMin(_) {
    return arguments.length ? (this._pointSizeMin = _, this) : this._pointSizeMin;
  }

  /**
      @memberof Geomap
      @desc If *value* is specified, toggles the map tiles and returns the current class instance. If *value* is not specified, returns the current tiling boolean.
      @param {Boolean} [*value* = true]
  */
  tiles(_) {
    return arguments.length ? (this._tiles = _, this) : this._tiles;
  }

  /**
      @memberof Geomap
      @desc If *value* is specified, sets the topojson to be used and returns the current class instance. If *value* is not specified, returns the current topojson.
      @param {Boolean|Object} [*value*]
  */
  topojson(_) {
    return arguments.length ? (this._topojson = _, this) : this._topojson;
  }

  /**
      @memberof Geomap
      @desc If *value* is specified, filters the features used to calculate the initial projection fitExtent based on an ID, array of IDs, or filter function and returns the current class instance. If *value* is not specified, returns the current bounds filter.
      @param {Number|String|Array|Function} [*value*]
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
      @desc If *value* is specified, sets the topojson object key to be used and returns the current class instance. If *value* is not specified, returns the current topojson object key.
      @param {String} [*value* = "countries"]
  */
  topojsonKey(_) {
    return arguments.length ? (this._topojsonKey = _, this) : this._topojsonKey;
  }

  /**
      @memberof Geomap
      @desc If *value* is specified, toggles the zoom behavior and returns the current class instance. If *value* is not specified, returns the current zoom behavior.
      @param {Boolean} [*value* = true]
  */
  zoom(_) {
    return arguments.length ? (this._zoom = _, this) : this._zoom;
  }

}
