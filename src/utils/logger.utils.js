// src/utils/logger.js
import morgan from 'morgan';

const format = process.env.NODE_ENV === 'production' ? 'combined' : 'dev';

const logger = morgan(format);

export default logger;
