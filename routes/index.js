const fp = require('fastify-plugin');

module.exports = fp((fastify, options, done) => {
  fastify.get('/', (req, reply) => {
    if (!req.session.visitcount) {
      req.session.visitcount = 0;
    }
    req.session.visitcount += 1;
    // req.log.error(`***** Number of visits: ${req.session.visitcount}`);
    reply.view('/templates/layout/index.ejs', {
      pageTitle: 'Welcome',
      template: 'index',
    });
  });

  fastify.register(require('./speakers'), { prefix: '/speakers' });
  fastify.register(require('./feedback'), { prefix: '/feedback' });
  done();
}, '3.x');
