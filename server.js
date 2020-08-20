const path = require('path');
const createError = require('http-errors');

const logConfig = {
  level: 'error',
  prettyPrint: true,
  serializers: {
    res(reply) {
      return {
        statusCode: reply.statusCode,
      };
    },
  },
};

const fastify = require('fastify')({
  logger: logConfig,
});

const port = 3000;

fastify.register(require('fastify-cookie'));

fastify.register(require('fastify-session'), {
  cookieName: 'session',
  secret: 'a secret with minimum length of 32 characters',
  cookie: { secure: false },
  expires: 1800000,
});

fastify.register(require('point-of-view'), {
  engine: {
    ejs: require('ejs'),
  },
  root: path.join(__dirname, 'views'),
  defaultContext: {
    siteName: 'ROUX Meetups',
  },
});

fastify.register(require('fastify-static'), {
  root: path.join(__dirname, 'static'),
});

fastify.register(require('./services/data-service'));

fastify.decorateReply('locals', { speakerNames: [] });

fastify.addHook('preHandler', async function (req, reply) {
  reply.locals.speakerNames = await fastify.data.speakers.getNames();
  return;
});

fastify.setNotFoundHandler(function (req, reply) {
  const error = createError(404, `The page "${req.url}" was not found`, { expose: true });
  reply.statusCode = 404;
  reply.view('error.ejs', { error });
});

fastify.setErrorHandler(function (error, req, reply) {
  const status = error.statusCode || 500;
  const message = status >= 500 ? 'Internal Server Error' : error.message;
  const httpError = createError(status, message, { expose: false });

  status < 500 ? reply.log.info(error) : reply.log.error(error);
  reply.statusCode = status;
  reply.view('/error.ejs', { error: httpError });
});

fastify.register(require('./routes'));

// Run the server
const start = async () => {
  try {
    await fastify.listen(port);
    fastify.log.info(`server listening on ${fastify.server.address().port}`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
