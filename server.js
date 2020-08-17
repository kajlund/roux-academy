// Require the framework and instantiate it
const fastify = require('fastify')({ logger: true });

const port = 3000;

// Declare a route
fastify.get('/', async (request, reply) => {
  return 'Hello Fastify';
});

// Run the server!
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
