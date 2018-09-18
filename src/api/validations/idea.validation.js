const Joi = require('joi');

module.exports = {

  // GET /v1/ideas
  listIdeas: {
    query: {
      page: Joi.number().min(1),
    },
  },

  // POST /v1/ideas
  createIdea: {
    body: {
      content: Joi.string().max(255).required(),
      ease: Joi.number().min(1).max(10).required(),
      impact: Joi.number().min(1).max(10).required(),
      confidence: Joi.number().min(1).max(10).required(),
      average_score: Joi.number().min(1).max(10),
    },
  },

  // PUT /v1/ideas/:ideaId
  updateIdea: {
    body: {
      content: Joi.string().max(255),
      ease: Joi.number().min(1).max(10),
      impact: Joi.number().min(1).max(10),
      confidence: Joi.number().min(1).max(10),
      average_score: Joi.number().min(1).max(10),
    },
    params: {
      ideaId: Joi.string().regex(/^[a-fA-F0-9]{24}$/).required(),
    },
  },
};
