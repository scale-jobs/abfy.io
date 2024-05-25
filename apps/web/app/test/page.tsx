import React from "react";
import { Experiment } from "@repo/abfy/Experiment";
import { Variant } from "@repo/abfy/Variant";
import { KeyAction } from "@repo/abfy/KeyAction";

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
        <h2>Some other component that is not the variants</h2>
        <KeyAction>
          <button>Click me for Key Action Recording</button>
        </KeyAction>
      </div>
    </>
  );
}

export default test;
