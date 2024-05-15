import React from "react";
import { Experiment } from "@repo/abfy/Experiment";
import { Variant } from "@repo/abfy/Variant";

function test() {
  return (
    <>
      <h1>Testing</h1>
      <Experiment id="Experiment1">
        <Variant id="VARIANT1" />
        <Variant id="VARIANT2" />
        <Variant id="VARIANT3" />
        <Variant id="VARIANT4" />
        <Variant id="VARIANT5" />
      </Experiment>
    </>
  );
}

export default test;
