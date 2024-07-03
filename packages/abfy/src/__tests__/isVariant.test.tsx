import React from "react";
import { isVariant } from "../utils";
import { ABFY_VARIANT } from "../utils/constants";

describe("isVariant function", () => {
  it("should return false if the child doesnt have any props property", () => {
    const child = React.createElement("div");
    const result = isVariant(child);
    expect(result).toBe(false);
  });

  it("should return flase if the child has props but no id", () => {
    const child = React.createElement("div", {});
    const result = isVariant(child);
    expect(result).toBe(false);
  });

  it("should return false if the child has id prop set to different value", () => {
    const child = React.createElement("div", { id: "someRandomValue" });

    const result = isVariant(child);
    expect(result).toBe(false);
  });

  it("should return true if the child has variantId prop set to different value", () => {
    const child = React.createElement("div", { variantId: ABFY_VARIANT });

    const result = isVariant(child);
    expect(result).toBe(true);
  });
});
