export const getApiUrl = (path: string) => {
    return new URL(path, 'http://localhost:3001/').toString()
  }