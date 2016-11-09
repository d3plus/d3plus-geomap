import {test} from "tape";
import {default as Geomap} from "../src/Geomap.js";

test("Geomap", assert => {

  new Geomap()
    .render(() => {

      assert.true(true, "function success");
      assert.end();

    });

});
