const httpStatus = require('http-status');
const Idea = require('../models/idea.model');
const { handler: errorHandler } = require('../middlewares/error');

/**
 * Load idea and append to req.
 * @public
 */
exports.load = async (req, res, next, id) => {
  try {
    const idea = await Idea.get(id);
    req.locals = { idea };
    return next();
  } catch (error) {
    return errorHandler(error, req, res);
  }
};

/**
 * Get idea
 * @public
 */
exports.get = (req, res) => res.json(req.locals.idea.transform());

/**
 * Create new idea
 * @public
 */
exports.create = async (req, res, next) => {
  try {
    const idea = new Idea(req.body);
    const savedIdea = await idea.save();
    res.status(httpStatus.CREATED);
    res.json(savedIdea.transform());
  } catch (error) {
    next(error);
  }
};

/**
 * Update existing idea
 * @public
 */
exports.update = (req, res, next) => {
  const idea = Object.assign(req.locals.idea, req.body);

  idea.save()
    .then(savedIdea => res.json(savedIdea.transform()))
    .catch(e => next(e));
};

/**
 * Get idea list
 * @public
 */
exports.list = async (req, res, next) => {
  try {
    const ideas = await Idea.list(req.query);
    const transformedIdeas = ideas.map(idea => idea.transform());
    res.json(transformedIdeas);
  } catch (error) {
    next(error);
  }
};

/**
 * Delete idea
 * @public
 */
exports.remove = (req, res, next) => {
  const { idea } = req.locals;

  idea.remove()
    .then(() => res.status(httpStatus.NO_CONTENT).end())
    .catch(e => next(e));
};