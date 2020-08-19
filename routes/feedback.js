module.exports = async (fastify) => {
  fastify.get('/', async function () {
    const feedback = await this.data.feedback.getList();
    return feedback;
  });

  fastify.post('/', () => {
    return 'Feedback form posted';
  });
};
