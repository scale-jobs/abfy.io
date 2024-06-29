import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import {
  ABfyProvider,
  useAbfyContext,
  publishExperimentResult,
} from "../tempcontext";
import { ABFY_SESSION_STORAGE_KEY } from "../utils/constants";
import { logger } from "../utils/logger";

jest.mock("../utils/logger");
jest.mock("../ABfySessionProvider", () => jest.fn());

const mockUseABfySession = require("../ABfySessionProvider");

describe("ABfyProvider", () => {
  beforeEach(() => {
    sessionStorage.clear();
  });

  it("should store a renderId in sessionStorage if none exists", () => {
    render(
      <ABfyProvider backendUrl="http://example.com">
        <div>Test</div>
      </ABfyProvider>
    );

    const storedData = sessionStorage.getItem(ABFY_SESSION_STORAGE_KEY);
    expect(storedData).not.toBeNull();
    const { renderId } = JSON.parse(storedData as string);
    expect(renderId).toMatch(/^Render-\w+\d{3}$/);
  });

  it("should use the existing renderId if one exists in sessionStorage", () => {
    const existingRenderId = "Render-Existing123";
    sessionStorage.setItem(
      ABFY_SESSION_STORAGE_KEY,
      JSON.stringify({ renderId: existingRenderId })
    );

    render(
      <ABfyProvider backendUrl="http://example.com">
        <div>Test</div>
      </ABfyProvider>
    );

    const storedData = sessionStorage.getItem(ABFY_SESSION_STORAGE_KEY);
    expect(storedData).not.toBeNull();
    const { renderId } = JSON.parse(storedData as string);
    expect(renderId).toBe(existingRenderId);
  });
});

describe("useAbfyContext", () => {
  it("should throw an error if used outside of ABfyProvider", () => {
    const TestComponent = () => {
      useAbfyContext();
      return <div />;
    };

    expect(() => render(<TestComponent />)).toThrow(Error);
  });

  it("should provide backendUrl", () => {
    const TestComponent = () => {
      const { backendUrl } = useAbfyContext();
      return <div>{backendUrl}</div>;
    };

    render(
      <ABfyProvider backendUrl="http://example.com">
        <TestComponent />
      </ABfyProvider>
    );

    expect(screen.getByText("http://example.com")).toBeDefined();
  });
});

describe("publishExperimentResult", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockUseABfySession.mockReturnValue("MockRenderId");
  });

  it("should publish experiment result successfully", async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        statusText: "OK",
      } as Response)
    );

    await publishExperimentResult(
      "exp1",
      "var1",
      "http://example.com",
      "MockRenderId",
      "testContext"
    );

    // expect(global.fetch).toHaveBeenCalledWith("http://example.com", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({
    //     experimentId: "exp1",
    //     variantId: "var1",
    //     timestamp: expect.any(String),
    //     renderId: "MockRenderId",
    //     context: "testContext",
    //   }),
    // });
    expect(logger).toHaveBeenCalledWith({
      message: "Experiment result published successfully.",
      level: "INFO",
    });
  });

  it("should handle fetch errors", async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: false,
        statusText: "Internal Server Error",
      } as Response)
    );

    await publishExperimentResult(
      "exp1",
      "var1",
      "http://example.com",
      "testRenderId"
    );

    // expect(global.fetch).toHaveBeenCalledWith("http://example.com", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(
    //     expect.objectContaining({
    //       experimentId: "exp1",
    //       variantId: "var1",
    //       timestamp: expect.any(String),
    //       renderId: "testRenderId",
    //     })
    //   ),
    // });
    expect(logger).toHaveBeenCalledWith({
      message: "Error publishing experiment result",
      level: "ERROR",
      data: expect.any(Error),
    });
  });
});
