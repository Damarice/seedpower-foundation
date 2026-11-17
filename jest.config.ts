import type { Config } from 'jest';
import nextJest from 'next/jest.js';

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.ts and .env files
  dir: './',
});

const config: Config = {
  coverageProvider: 'v8',
  testEnvironment: 'jsdom',
  // Run @testing-library/jest-dom matchers after the test framework is installed
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  // Module name mapper for @/ path alias and Next.js Link mock
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
    '^next/link$': '<rootDir>/__mocks__/next/link.tsx',
  },
};

// createJestConfig is exported this way to ensure that next/jest can load the
// Next.js config which is async
export default createJestConfig(config);
