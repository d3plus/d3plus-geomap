import zora from "zora";
import {default as Geomap} from "../src/Geomap.js";

export default zora()
  .test("Geomap", function *(assert) {

    yield cb => new Geomap().render(cb);
    assert.ok(true, "function success");

  });
