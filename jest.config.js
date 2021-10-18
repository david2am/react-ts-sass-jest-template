/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  transform: {
    "^.+\\.svg$": "<rootDir>/.jest/svgTransform.js"
  },
  setupFilesAfterEnv: ['<rootDir>/.jest/setup.ts'],
};