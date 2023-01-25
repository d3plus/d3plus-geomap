import assert from "assert";
import {default as Geomap} from "../src/Geomap.js";
import it from "./jsdom.js";

it("Geomap", function *() {

  yield cb => {

    new Geomap().render(cb);

  };

  assert.strictEqual(document.getElementsByTagName("svg").length, 1, "automatically added <svg> element to page");
  assert.strictEqual(document.getElementsByClassName("d3plus-Geomap").length, 1, "created <g> container element");

});