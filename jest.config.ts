module.exports = {
  testPathIgnorePatterns: ["<rootDir>/.next/", "<rootDir>/node_modules/"],
  setupFilesAfterEnv: ["<rootDir>/tests/setupTests.ts"],
  setupFiles: ["dotenv/config"],
  preset: "ts-jest",
  testEnvironment: "node",
  moduleNameMapper: {
    "@/lib/(.*)": "<rootDir>/lib/$1",
    "@/constants": "<rootDir>/constants/index",
  },
};
