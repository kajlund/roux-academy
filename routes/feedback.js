const S = require('fluent-schema');

const bodySchema = S.object()
  .id('https://rouxmeetups.com/feedback')
  .title('Feedback Form')
  .description(' Feedback form body data')
  .prop('name', S.string().required().minLength(3))
  .prop('email', S.string().format(S.FORMATS.EMAIL).required())
  .prop('title', S.string().required().minLength(3))
  .prop('message', S.string().required().minLength(5));

const schema = {
  body: bodySchema,
};

module.exports = async (fastify) => {
  fastify.get('/', async function (req, reply) {
    const feedback = await this.data.feedback.getList();
    const errors = req.session.feedback ? req.session.feedback : false;
    req.session.feedback = null;

    return reply.view('/layout/index.ejs', {
      pageTitle: 'Feedback',
      template: 'feedback',
      feedback,
      errors,
    });
  });

  fastify.post('/', { schema, attachValidation: true }, (req, reply) => {
    if (req.validationError) {
      // `req.validationError.validation` contains the raw validation error
      req.session.feedback = req.validationError.validation;
      return reply.redirect('/feedback');
    }
    return 'Feedback form posted';
  });
};
