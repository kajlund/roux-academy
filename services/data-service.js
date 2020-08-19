const fp = require('fastify-plugin');

const SpeakersService = require('./SpeakerService');
const FeedbackService = require('./FeedbackService');

const speakersService = new SpeakersService('./data/speakers.json');
const feedbackService = new FeedbackService('./data/feedback.json');

module.exports = fp((fastify, options, done) => {
  fastify.decorate('data', {
    speakers: speakersService,
    feedback: feedbackService,
  });

  done();
}, '3.x');
