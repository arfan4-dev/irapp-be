// Load environment variables
import dotenv from 'dotenv'
dotenv.config({
  path: './.env'
})
// Define environment variables
const { NODE_ENV, DATABASE_URL, PORT, CLIENT_URL, ALLOWED_ORIGINS, DB_NAME, SERVER_URL, JWT_ACCESS_TOKEN_SECRET_KEY,
  JWT_REFRESH_TOKEN_SECRET_KEY
} = process.env
// let CORS_ALLOWED_ORIGINS = ALLOWED_ORIGINS.split(',');
const CORS_ALLOWED_ORIGINS = ALLOWED_ORIGINS ? ALLOWED_ORIGINS.split(',') : [];

// Define Swagger stage URL based on environment
const SWAGGER_STAGE_URL = NODE_ENV === 'production' ? SERVER_URL : `http://localhost:${PORT}`
// Export environment variables
export {
  NODE_ENV, DATABASE_URL, PORT, CLIENT_URL, SWAGGER_STAGE_URL, DB_NAME, CORS_ALLOWED_ORIGINS, JWT_ACCESS_TOKEN_SECRET_KEY,
  JWT_REFRESH_TOKEN_SECRET_KEY
}
