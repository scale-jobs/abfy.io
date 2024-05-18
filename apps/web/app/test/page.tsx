import React from "react";
import { Experiment } from "@repo/abfy/Experiment";
import { Variant } from "@repo/abfy/Variant";

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

        <div>
          <h2>Some other component that is not the variants</h2>
        </div>
      </Experiment>
    </>
  );
}

export default test;
