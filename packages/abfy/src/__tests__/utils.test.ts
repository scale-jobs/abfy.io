import { randomIdGenerator, getRenderId, storeRenderId } from "../utils";
import { ABFY_SESSION_STORAGE_KEY } from "../utils/constants";
import { logger } from "../utils/logger";

jest.mock("../utils/logger");

describe("randomIdGenerator", () => {
  it("should generate a random ID with prefix", () => {
    const id = randomIdGenerator("test");
    expect(id).toMatch(/^test-\w+\d{3}$/);
  });

  it("should generate a random ID without prefix", () => {
    const id = randomIdGenerator();
    expect(id).toMatch(/^\w+\d{3}$/);
  });
});

describe("getRenderId", () => {
  beforeEach(() => {
    sessionStorage.clear();
  });

  it("should return null if no renderId in sessionStorage", () => {
    const renderId = getRenderId();
    expect(renderId).toBeNull();
  });

  it("should return the stored renderId", () => {
    const mockId = "12345";
    sessionStorage.setItem(
      ABFY_SESSION_STORAGE_KEY,
      JSON.stringify({ renderId: mockId })
    );

    const renderId = getRenderId();
    expect(renderId).toBe(mockId);
  });

  it("should handle JSON parse error and return null", () => {
    sessionStorage.setItem(ABFY_SESSION_STORAGE_KEY, "invalid-json");

    const renderId = getRenderId();
    expect(renderId).toBeNull();
    expect(logger).toHaveBeenCalledWith({
      message: "Error parsing session storage data:",
      level: "ERROR",
      data: expect.any(SyntaxError),
    });
  });
});

describe("storeRenderId", () => {
  beforeEach(() => {
    sessionStorage.clear();
  });

  it("should store the renderId in sessionStorage", () => {
    const mockId = "12345";
    storeRenderId(mockId);

    const storedData = sessionStorage.getItem(ABFY_SESSION_STORAGE_KEY);
    expect(storedData).toBe(JSON.stringify({ renderId: mockId }));
  });
});
