import React from "react";
import { Experiment } from "@repo/abfy";
import { Variant } from "@repo/abfy";
import { KeyAction } from "@repo/abfy";
import RandomComponent from "./RandomComponent";

function test() {
  return (
    <>
      <h1>Testing</h1>
      <Experiment id="Experiment1">
        <Variant>
          <h1>Variant 1</h1>
        </Variant>
        <Variant>
          <h1>Variant 2</h1>
        </Variant>
        <Variant>
          <h1>Variant 3</h1>
        </Variant>
        <Variant>
          <h1>Variant 4</h1>
        </Variant>
        <Variant>
          <h1>Variant 5</h1>
        </Variant>
      </Experiment>

      <div>
        <RandomComponent />
      </div>
    </>
  );
}

export default test;
