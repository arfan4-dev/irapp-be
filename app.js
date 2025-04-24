import dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import cors from 'cors';
import cookieParser from 'cookie-parser';
import passport from 'passport';
import path from 'path';
import router from './src/routes/index.js';
import { swaggerServe, swaggerSetup } from './swagger.js';
import { CORS_ALLOWED_ORIGINS } from './src/config/env.config.js';
import { ApiError } from './src/utils/api.utils.js';
import logger from './src/utils/logger.utils.js';

const app = express()
// This will solve CORS Policy Error
// app.use(
//   cors({
//     origin: function (origin, callback) {
//       // Allow requests with no origin, such as mobile apps or curl requests
//       if (!origin || CORS_ALLOWED_ORIGINS.includes(origin)) {
//         callback(null, true);
//       } else {
//         callback(new Error('Not allowed by CORS'));
//       }
//     },
//     methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
//     credentials: true, // Allow cookies with cross-origin requests
//   })
// );
app.use(
  cors({
    origin: '*', // ✅ Allow all origins
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    credentials: true // ⚠️ Note: `credentials: true` is not compatible with `origin: '*'`
  })
);

// JSON

app.use(express.json({ limit: '50mb' }))
app.use(express.urlencoded({ extended: true, limit: '50mb' }))
// app.use(express.static('public'))
// Passport Middleware
app.use(passport.initialize());
// Cookie Parser
// app.use(express.static(path.join(process.cwd(), "public")));

app.use(cookieParser())
app.use(logger); // Custom morgan logger
// Load Routes
app.use('/api/v1', router) // This should match your API route structure
app.use('/api', swaggerServe, swaggerSetup)



app.use((err, req, res, next) => {
  if (err instanceof ApiError) {
    res.status(err.statusCode).json({
      success: err.success,
      message: err.message,
      errors: err.errors,
      stack: err.stack
    })
  } else {
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      stack: err.stack
    })
  }
})


export { app }