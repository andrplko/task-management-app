import winston from 'winston';
import 'winston-daily-rotate-file';

const { combine, timestamp, colorize, printf } = winston.format;

const levels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  debug: 4,
};

const colors = {
  error: 'red',
  warn: 'yellow',
  info: 'green',
  http: 'magenta',
  debug: 'white',
};

winston.addColors(colors);

const format = combine(
  timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }),
  colorize({ all: true }),
  printf(
    ({ timestamp, level, message }) => `[${timestamp}] ${level}: ${message}`
  )
);

const commonRotateFileOptions = {
  dirname: 'logs',
  datePattern: 'YYYY-MM-DD',
  zippedArchive: false,
  maxSize: '20m',
  maxFiles: '14d',
};

const transports = [
  new winston.transports.Console(),
  new winston.transports.DailyRotateFile({
    ...commonRotateFileOptions,
    filename: 'all-%DATE%.log',
  }),
  new winston.transports.DailyRotateFile({
    ...commonRotateFileOptions,
    filename: 'error-%DATE%.log',
    level: 'error',
  }),
];

const logger = winston.createLogger({
  level: 'debug',
  levels,
  format,
  transports,
  exceptionHandlers: [
    new winston.transports.DailyRotateFile({
      ...commonRotateFileOptions,
      filename: 'exceptions-%DATE%.log',
    }),
  ],
  rejectionHandlers: [
    new winston.transports.DailyRotateFile({
      ...commonRotateFileOptions,
      filename: 'rejections-%DATE%.log',
    }),
  ],
});

export default logger;
