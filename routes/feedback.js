module.exports = async (fastify) => {
  fastify.get('/', async function (req, reply) {
    const feedback = await this.data.feedback.getList();
    return reply.view('/layout/index.ejs', {
      pageTitle: 'Feedback',
      template: 'feedback',
      feedback,
    });
  });

  fastify.post('/', () => {
    return 'Feedback form posted';
  });
};
