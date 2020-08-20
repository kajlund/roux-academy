const fp = require('fastify-plugin');

module.exports = fp((fastify, options, done) => {
  fastify.get('/', async function (req, reply) {
    if (!req.session.visitcount) {
      req.session.visitcount = 0;
    }
    req.session.visitcount += 1;
    // req.log.error(`***** Number of visits: ${req.session.visitcount}`);
    const topSpeakers = await this.data.speakers.getList();
    const artwork = await this.data.speakers.getAllArtwork();

    return reply.view('/layout/index.ejs', {
      pageTitle: 'Welcome',
      template: 'index',
      topSpeakers,
      artwork,
    });
  });

  fastify.register(require('./speakers'), { prefix: '/speakers' });
  fastify.register(require('./feedback'), { prefix: '/feedback' });
  done();
}, '3.x');
