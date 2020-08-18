module.exports = async (fastify) => {
  fastify.get('/', (req, reply) => {
    reply.view('/templates/index.ejs', { pageTitle: 'Welcome' });
  });

  fastify.get('/speakers', () => {
    return 'Speaker list';
  });

  fastify.get('/speakers/:shortname', (req) => {
    return `Speaker ${req.params.shortname}`;
  });

  fastify.get('/feedback', () => {
    return 'Feedback';
  });

  fastify.post('/feedback', () => {
    return 'Feedback form posted';
  });
};
