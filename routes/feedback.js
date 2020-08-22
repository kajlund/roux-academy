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
    const errors = req.session.errors ? req.session.errors : false;
    const message = req.session.message ? req.session.message : '';
    req.session.errors = null;
    req.session.message = '';

    return reply.view('/layout/index.ejs', {
      pageTitle: 'Feedback',
      template: 'feedback',
      feedback,
      errors,
      message,
    });
  });

  fastify.post('/', { schema, attachValidation: true }, async function (req, reply) {
    if (req.validationError) {
      req.session.errors = req.validationError.validation;
      return reply.redirect('/feedback');
    }
    const { name, email, title, message } = req.body;
    await this.data.feedback.addEntry(name, email, title, message);
    req.session.message = 'Thank you for your feedback!';
    return reply.redirect('/feedback');
  });
};
