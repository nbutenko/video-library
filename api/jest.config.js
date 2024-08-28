module.exports = {
  roots: ['<rootDir>/src'],
  preset: 'ts-jest',
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest'
  },
  setupFilesAfterEnv: ['./jest.setup.js'],
  clearMocks: true,
  testEnvironment: 'node'
}
