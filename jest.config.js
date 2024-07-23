/** @type {import('ts-jest').JestConfigWithTsJest} **/
module.exports = {
  testEnvironment: "node",
  preset: "ts-jest",
  testEnvironment: "node",
  testMatch: ["**/specs/**/*.spec.ts"],
  transform: {
    "^.+.tsx?$": ["ts-jest", {}],
  },
  reporters: ["default", ["jest-junit", { outputDirectory: "reports" }], ['jest-html-reporters', {publicPath: 'reports'}]]
};
