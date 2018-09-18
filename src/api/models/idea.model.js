const mongoose = require('mongoose');
const httpStatus = require('http-status');
const APIError = require('../utils/APIError');

/**
 * Idea Schema
 * @private
 */
const ideaSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
    trim: true,
    max: 255,
  },
  impact: {
    type: Number,
    required: true,
    min: 1,
    max: 10,
  },
  ease: {
    type: Number,
    required: true,
    min: 1,
    max: 10,
  },
  confidence: {
    type: Number,
    required: true,
    min: 1,
    max: 10,
  },
  average_score: {
    type: Number,
    min: 1,
    max: 10,
  },
}, {
  timestamps: true,
});

/**
 * Add your
 * - pre-save hooks
 * - validations
 * - virtuals
 */
ideaSchema.pre('save', async function save(next) {
  try {
    const avg = (this.impact + this.ease + this.confidence) / 3;
    this.average_score = Number(parseFloat(avg).toFixed(2));
    
    return next();
  } catch (error) {
    return next(error);
  }
});

/**
 * Methods
 */
ideaSchema.method({
  transform() {
    const transformed = {};
    const fields = ['id', 'content', 'impact', 'ease', 'confidence', 'average_score', 'created_at'];

    fields.forEach((field) => {
      let dbField = field;

      if (field === 'created_at') dbField = 'createdAt';

      transformed[field] = this[dbField];
    });

    return transformed;
  },
});

/**
 * Statics
 */
ideaSchema.statics = {
  /**
   * List users in descending order of 'createdAt' timestamp.
   *
   * @param {number} skip - Number of users to be skipped.
   * @param {number} limit - Limit number of users to be returned.
   * @returns {Promise<User[]>}
   */
  list({
    page = 1,
  }) {
    const perPage = 10;
    return this.find({})
      .sort({ createdAt: -1 })
      .skip(perPage * (page - 1))
      .limit(perPage)
      .exec();
  },

  /**
   * Get idea
   *
   * @param {ObjectId} id - The objectId of idea.
   * @returns {Promise<Idea, APIError>}
   */
  async get(id) {
    try {
      let idea;

      if (mongoose.Types.ObjectId.isValid(id)) {
        idea = await this.findById(id).exec();
      }
      if (idea) {
        return idea;
      }

      throw new APIError({
        message: 'Idea does not exist',
        status: httpStatus.NOT_FOUND,
      });
    } catch (error) {
      throw error;
    }
  },
};

/**
 * @typedef Idea
 */
module.exports = mongoose.model('Idea', ideaSchema);
