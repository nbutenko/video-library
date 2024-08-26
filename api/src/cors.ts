import { config } from './config'

const corsOptions = {
  origin: config.CORS_ALLOW_URLS,
  allowedHeaders:
    'Origin, X-Requested-With, Content-Type, Accept, Authorization',
  methods: 'GET, POST, PUT, PATCH, DELETE',
  optionsSuccessStatus: 200
}

export default corsOptions
