import { logger } from "../utils/logger";
import { Environments, LogLevels } from "../utils/constants";
import { LoggerContext } from "../utils/types";

describe("logger", () => {
  const originalEnv = process.env;

  beforeEach(() => {
    jest.resetModules();
    process.env = { ...originalEnv };
  });

  afterEach(() => {
    process.env = originalEnv;
  });

  it("should log info message in development mode", () => {
    process.env.NODE_ENV = Environments.development;
    console.log = jest.fn();

    const context: LoggerContext = {
      message: "Info message",
      level: LogLevels.INFO,
    };
    logger(context);

    expect(console.log).toHaveBeenCalledWith("Info message", undefined);
  });

  it("should log error message in development mode", () => {
    process.env.NODE_ENV = Environments.development;
    console.error = jest.fn();

    const context: LoggerContext = {
      message: "Error message",
      level: LogLevels.ERROR,
    };
    logger(context);

    expect(console.error).toHaveBeenCalledWith("Error message", undefined);
  });

  it("should log warning message in development mode", () => {
    process.env.NODE_ENV = Environments.development;
    console.warn = jest.fn();

    const context: LoggerContext = {
      message: "Warning message",
      level: LogLevels.WARN,
    };
    logger(context);

    expect(console.warn).toHaveBeenCalledWith("Warning message", undefined);
  });

  it("should log error message in production mode", () => {
    process.env.NODE_ENV = Environments.production;
    console.error = jest.fn();

    const context: LoggerContext = {
      message: "Error message",
      level: LogLevels.ERROR,
    };
    logger(context);

    expect(console.error).toHaveBeenCalledWith("Error message", undefined);
  });

  it("should not log info message in production mode", () => {
    process.env.NODE_ENV = Environments.production;
    console.log = jest.fn();

    const context: LoggerContext = {
      message: "Info message",
      level: LogLevels.INFO,
    };
    logger(context);

    expect(console.log).not.toHaveBeenCalled();
  });

  it("should throw error for improper log input", () => {
    process.env.NODE_ENV = Environments.development;

    const context: LoggerContext = {
      message: "Improper message",
      level: "UNKNOWN" as any,
    };

    expect(() => logger(context)).toThrowError("Improper Log Input");
  });

  it("should log message with data in development mode", () => {
    process.env.NODE_ENV = Environments.development;
    console.log = jest.fn();

    const context: LoggerContext = {
      message: "Info message",
      level: LogLevels.INFO,
      data: { key: "value" },
    };
    logger(context);

    expect(console.log).toHaveBeenCalledWith("Info message", { key: "value" });
  });

  it("should log error message with data in production mode", () => {
    process.env.NODE_ENV = Environments.production;
    console.error = jest.fn();

    const context: LoggerContext = {
      message: "Error message",
      level: LogLevels.ERROR,
      data: { key: "value" },
    };
    logger(context);

    expect(console.error).toHaveBeenCalledWith("Error message", {
      key: "value",
    });
  });
});
