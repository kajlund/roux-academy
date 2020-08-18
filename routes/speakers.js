const SpeakersService = require('../services/SpeakerService');

const speakersService = new SpeakersService('./data/speakers.json');

module.exports = async (fastify) => {
  fastify.get('/', async () => {
    const speakers = await speakersService.getList();
    return speakers;
  });

  fastify.get('/:shortname', (req) => {
    return `Speaker ${req.params.shortname}`;
  });
};
