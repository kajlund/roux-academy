const fp = require('fastify-plugin');

module.exports = fp((fastify, options, done) => {
  fastify.get('/', (req, reply) => {
    reply.view('/templates/index.ejs', { pageTitle: 'Welcome' });
  });

  fastify.register(require('./speakers'), { prefix: '/speakers' });
  fastify.register(require('./feedback'), { prefix: '/feedback' });
  done();
}, '3.x');
