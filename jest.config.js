module.exports = {
    moduleNameMapper: {
        '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
            '<rootDir>/src/__mocks__/fileMock.js',
        '\\.(css|less)$': '<rootDir>/src/__mocks__/styleMock.js',
    },
    testEnvironment: 'jsdom',
    roots: ['<rootDir>/src'],
    collectCoverageFrom: ['src/**/*.{js,jsx,ts,tsx}', '!src/**/*.d.ts'],
    setupFilesAfterEnv: [
        '<rootDir>/src/setupTests.js'
    ],
    setupFiles: [
        'react-app-polyfill/jsdom'
    ],
    testMatch: [
        '<rootDir>/src/**/*.{spec,test}.{js,jsx,ts,tsx}',
    ],
};