import express from 'express'

const appMock = express()
appMock.use(express.json()).use(express.urlencoded({ extended: true }))

export { appMock }
