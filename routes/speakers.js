module.exports = async (fastify) => {
  fastify.get('/', async function (req, reply) {
    const speakers = await this.data.speakers.getList();
    return reply.view('/templates/layout/index.ejs', {
      pageTitle: 'Speakers',
      template: 'speakers',
      speakers,
    });
  });

  fastify.get('/:shortname', async function (req, reply) {
    const speaker = await this.data.speakers.getSpeaker(req.params.shortname);
    return reply.view('/templates/layout/index.ejs', {
      pageTitle: 'Speakers',
      template: 'speakers-detail',
      speaker,
    });
  });
};
