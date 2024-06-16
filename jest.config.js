// jest.config.js
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  roots: ["<rootDir>/src", "<rootDir>/spec"],
  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },
};
