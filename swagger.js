// swagger.js is a file that generates the Swagger documentation for the API. It uses swagger-jsdoc to generate the documentation based on the JSDoc comments in the route files. The swaggerUi and swaggerServe functions are used to serve the Swagger documentation on a specific route in the application.
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { SWAGGER_STAGE_URL } from './src/config/env.config.js';

// const SWAGGER_STAGE_URL = SWAGGER_STAGE_URL;
const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Express API with Swagger',
      version: '1.0.0',
    },
    servers: [
      {
        url: `${SWAGGER_STAGE_URL}/api/v1`,
      },
    ],
    // add authentication options
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'apiKey',
          name: 'Authorization',
          scheme: 'bearer',
          in: 'header',
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ['./src/routes/*.js'], // Adjust path if necessary
};

const spec = swaggerJSDoc(options);

const swaggerServe = swaggerUi.serve;
const swaggerSetup = swaggerUi.setup(spec);

export { swaggerServe, swaggerSetup };