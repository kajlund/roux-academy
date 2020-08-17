const path = require('path');

const fastify = require('fastify')({ logger: true });

const port = 3000;

fastify.register(require('fastify-static'), {
  root: path.join(__dirname, 'static'),
});

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
