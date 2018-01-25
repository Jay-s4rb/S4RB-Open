module.exports = {
  verbose: false,
  cache: true,
  moduleFileExtensions: [
    'js',
    'vue',
  ],
  transform: {
    '^.+\\.js$': '<rootDir>/node_modules/babel-jest',
    '.*\\.(vue)$': '<rootDir>/node_modules/jest-vue-preprocessor'
  },
  collectCoverageFrom: [
    'src/**/*.{js,vue}',
    '!src/main.js',
    '!**/node_modules/**'
  ],
  moduleNameMapper: {
    "^vue$": "vue/dist/vue.common.js"
  },
  coverageDirectory: '<rootDir>/test/unit/coverage',
  mapCoverage: true
}