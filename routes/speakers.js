module.exports = async (fastify) => {
  fastify.get('/', async function () {
    const speakers = await this.data.speakers.getList();
    return speakers;
  });

  fastify.get('/:shortname', (req) => {
    return `Speaker ${req.params.shortname}`;
  });
};
