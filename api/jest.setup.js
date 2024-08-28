jest.mock('./src/db', () => {
  return {
    execute: jest.fn()
  }
})
