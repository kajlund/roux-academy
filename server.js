const path = require('path');

const SpeakersService = require('./services/SpeakerService');
const speakersService = new SpeakersService('./data/speakers.json');

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
  defaultContext: {
    siteName: 'ROUX Meetups',
  },
});

fastify.register(require('fastify-static'), {
  root: path.join(__dirname, 'static'),
});

fastify.decorateReply('locals', { speakerNames: [] });

fastify.addHook('preHandler', async function (req, reply) {
  reply.locals.speakerNames = await speakersService.getNames();
  return;
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
