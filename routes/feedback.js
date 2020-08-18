const FeedbackService = require('../services/FeedbackService');

const feedbackService = new FeedbackService('./data/feedback.json');

module.exports = async (fastify) => {
  fastify.get('/', async () => {
    const feedback = await feedbackService.getList();
    return feedback;
  });

  fastify.post('/', () => {
    return 'Feedback form posted';
  });
};
