module.exports = async (fastify) => {
  fastify.get('/', async function (req, reply) {
    const speakers = await this.data.speakers.getList();
    return reply.view('/templates/layout/index.ejs', {
      pageTitle: 'Speakers',
      template: 'speakers',
      speakers,
    });
  });

  fastify.get('/:shortname', (req) => {
    return `Speaker ${req.params.shortname}`;
  });
};
