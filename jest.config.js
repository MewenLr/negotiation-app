module.exports = {
  preset: '@vue/cli-plugin-unit-jest/presets/typescript-and-babel',
  projects: [
    {
      testMatch: ['<rootDir>/src/**/*.test.ts'],
      moduleNameMapper: { '^@/(.*)$': '<rootDir>/src/$1' },
      transform: {
        '.*\\.(vue)$': 'vue-jest',
        '^.+\\.tsx?$': 'ts-jest',
        '.+\\.(css|styl|less|sass|scss|png|jpg|ttf|woff|woff2)$': 'jest-transform-stub',
      },
    },
  ],
}
