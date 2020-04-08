import winston from 'winston';
import moment from 'moment';

const { createLogger, format, transports } = winston;

const { colorize, combine, label, printf, timestamp } = format;

const isLabel = (info) => (info.label ? `[_${info.label}_]` : '');

const defaultFormat = printf(
  (info) =>
    `${moment(info.timestamp).format('MMM D, HH:mm:ss:SSS')} - ${isLabel(
      info
    )} [_${info.level}_] : ${info.message}`
);

const myCustomLevels = {
  levels: {
    fatal: 0,
    error: 1,
    warn: 2,
    success: 3,
    info: 4,
  },
  colors: {
    fatal: 'magenta',
    error: 'red',
    warn: 'yellow',
    success: 'green',
    info: 'blue',
  },
};

winston.addColors(myCustomLevels.colors);

const combineProd = (tag) =>
  combine(timestamp(), label({ label: tag }), defaultFormat);

const combineDev = (tag) =>
  combine(timestamp(), colorize(), label({ label: tag }), defaultFormat);

const getCombine = (tag) =>
  process.env.NODE_ENV === 'Production' ? combineProd(tag) : combineDev(tag);

const getLogger = (tag, level) =>
  createLogger({
    format: getCombine(tag),
    transports: [new transports.Console({ level })],
    levels: myCustomLevels.levels,
    silent: process.env.NODE_ENV === 'Test',
  });

const makeLogger = (tag, level) => {
  const logger = getLogger(tag, level);

  function makeLogFunction(name) {
    return (data) => logger[name](JSON.stringify(data));
  }

  return {
    fatal: makeLogFunction('fatal'),
    error: makeLogFunction('error'),
    warn: makeLogFunction('warn'),
    success: makeLogFunction('success'),
    info: makeLogFunction('info'),
  };
};

const loggerMiddleware = (req, res, next) => {
  const requestId =
    req.get('request_id') ||
    req.body.requestId ||
    Math.round(Math.random() * (100000 - 1000));

  const logger = makeLogger(String(requestId).trim(), process.env.LOG_LEVEL);

  req.logger = logger;

  return next();
};

const logger = getLogger();

export { loggerMiddleware, logger };
