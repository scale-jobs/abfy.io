import React, { ReactElement } from "react";
import { isReactElement } from "../utils";
const mockReactElement = React.createElement("div");

describe("isReactElement", () => {
  it("should return true for a valid React element", () => {
    expect(isReactElement(mockReactElement)).toBe(true);
  });

  it("should return false for a string", () => {
    const element = "Hello";
    expect(isReactElement(element)).toBe(false);
  });

  it("should return false for a number", () => {
    const element = 123;
    expect(isReactElement(element)).toBe(false);
  });

  it("should return false for a boolean", () => {
    const element = true;
    expect(isReactElement(element)).toBe(false);
  });

  it("should return false for null", () => {
    const element = null;
    expect(isReactElement(element)).toBe(false);
  });

  it("should return false for an object without props", () => {
    expect(isReactElement(mockReactElement)).toBe(false);
  });

  it("should return true for an object with props", () => {
    const element = React.createElement("div", { id: "test" });
    expect(isReactElement(element)).toBe(true);
  });

  it("should return false for an array", () => {
    const element: Array<string> = [];
    expect(isReactElement(element)).toBe(false);
  });
});
