module.exports = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["./jest.setup.ts"],
  collectCoverage: true,
  coverageDirectory: "../../coverage",
  coverageReporters: ["json-summary", "text", "lcov"],
};
