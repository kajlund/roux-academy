module.exports = async (fastify) => {
  fastify.get('/', async function (req, reply) {
    const speakers = await this.data.speakers.getList();
    const artwork = await this.data.speakers.getAllArtwork();

    return reply.view('/layout/index.ejs', {
      pageTitle: 'Speakers',
      template: 'speakers',
      speakers,
      artwork,
    });
  });

  fastify.get('/:shortname', async function (req, reply) {
    const speaker = await this.data.speakers.getSpeaker(req.params.shortname);
    const artwork = await this.data.speakers.getArtworkForSpeaker(req.params.shortname);
    return reply.view('/layout/index.ejs', {
      pageTitle: 'Speakers',
      template: 'speakers-detail',
      speaker,
      artwork,
    });
  });
};
