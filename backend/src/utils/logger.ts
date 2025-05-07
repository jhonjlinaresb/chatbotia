import winston from 'winston';
import path from 'path';
import fs from 'fs';

const logDir = path.resolve(__dirname, '../../logs');
if (!fs.existsSync(logDir)) { fs.mkdirSync(logDir, { recursive: true }); }

/**
 * @summary Logger centralizado con consola y archivo
 */
const logger = winston.createLogger
({
  level: 'info',
  format: winston.format.combine
  (
    winston.format.timestamp(),
    winston.format.printf(({ timestamp, level, message }) => { return `[${timestamp}] ${level.toUpperCase()}: ${message}`; })
  ),
  transports:
  [
    new winston.transports.Console(),
    new winston.transports.File({ filename: `${logDir}/error.log`, level: 'error' }),
    new winston.transports.File({ filename: `${logDir}/combined.log` })
  ]
});

export default logger;