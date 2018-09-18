const express = require('express');
const validate = require('express-validation');
const controller = require('../../controllers/idea.controller');
const { authorize } = require('../../middlewares/auth');
const {
  listIdeas,
  createIdea,
  updateIdea,
} = require('../../validations/idea.validation');

const router = express.Router();

/**
 * Load idea when API with ideaId route parameter is hit
 */
router.param('ideaId', controller.load);


router
  .route('/')
  /**
   * @api {get} v1/ideas List Ideas
   * @apiDescription Get a list of ideas
   * @apiVersion 1.0.0
   * @apiName ListIdeas
   * @apiGroup Idea
   * @apiPermission admin
   *
   * @apiHeader {String} Athorization  Idea's access token
   *
   * @apiParam  {Number{1-}}         [page=1]     List page
   *
   * @apiSuccess {Object[]} ideas List of ideas.
   *
   * @apiError (Unauthorized 401)  Unauthorized  Only authenticated ideas can access the data
   * @apiError (Forbidden 403)     Forbidden     Only admins can access the data
   */
  .get(authorize(), validate(listIdeas), controller.list)
  /**
   * @api {post} v1/ideas Create Idea
   * @apiDescription Create a new idea
   * @apiVersion 1.0.0
   * @apiName CreateIdea
   * @apiGroup Idea
   * @apiPermission admin
   *
   * @apiHeader {String} Athorization  User's access token
   *
   * @apiSuccess {String}  content        Idea's name
   * @apiSuccess {Number}  ease           Idea's ease
   * @apiSuccess {Number}  confidence     Idea's confidence
   * @apiSuccess {Number}  impact         Idea's impact
   * @apiSuccess {Number}  average_score  Idea's average score
   * @apiSuccess {Date}    created_at     Timestamp
   *
   * @apiSuccess (Created 201) {String}  id             Idea's id
   * @apiSuccess (Created 201) {String}  content        Idea's name
   * @apiSuccess (Created 201) {Number}  ease           Idea's ease
   * @apiSuccess (Created 201) {Number}  confidence     Idea's confidence
   * @apiSuccess (Created 201) {Number}  impact         Idea's impact
   * @apiSuccess (Created 201) {Number}  average_score  Idea's average score
   * @apiSuccess (Created 201) {Date}    created_at     Timestamp
   *
   * @apiError (Bad Request 400)   ValidationError  Some parameters may contain invalid values
   * @apiError (Unauthorized 401)  Unauthorized     Only authenticated ideas can create the data
   * @apiError (Forbidden 403)     Forbidden        Only admins can create the data
   */
  .post(authorize(), validate(createIdea), controller.create);


router
  .route('/:ideaId')
  /**
   * @api {get} v1/ideas/:id Get Idea
   * @apiDescription Get idea information
   * @apiVersion 1.0.0
   * @apiName GetIdea
   * @apiGroup Idea
   * @apiPermission idea
   *
   * @apiHeader {String} Athorization  Idea's access token
   *
   * @apiSuccess {String}  id             Idea's id
   * @apiSuccess {String}  content        Idea's name
   * @apiSuccess {Number}  ease           Idea's ease
   * @apiSuccess {Number}  confidence     Idea's confidence
   * @apiSuccess {Number}  impact         Idea's impact
   * @apiSuccess {Number}  average_score  Idea's average score
   * @apiSuccess {Date}    created_at     Timestamp
   *
   * @apiError (Unauthorized 401) Unauthorized Only authenticated ideas can access the data
   * @apiError (Forbidden 403)    Forbidden    Only idea with same id or admins can access the data
   * @apiError (Not Found 404)    NotFound     Idea does not exist
   */
  .get(authorize(), controller.get)
  /**
   * @api {patch} v1/ideas/:id Update Idea
   * @apiDescription Update some fields of a idea document
   * @apiVersion 1.0.0
   * @apiName UpdateIdea
   * @apiGroup Idea
   * @apiPermission idea
   *
   * @apiHeader {String} Athorization  Idea's access token
   *
   * @apiParam  {String}             email     Idea's email
   * @apiParam  {String{6..128}}     password  Idea's password
   * @apiParam  {String{..128}}      [name]    Idea's name
   * @apiParam  {String=idea,admin}  [role]    Idea's role
   * (You must be an admin to change the idea's role)
   *
   * @apiSuccess {String}  id             Idea's id
   * @apiSuccess {String}  content        Idea's name
   * @apiSuccess {Number}  ease           Idea's ease
   * @apiSuccess {Number}  confidence     Idea's confidence
   * @apiSuccess {Number}  impact         Idea's impact
   * @apiSuccess {Number}  average_score  Idea's average score
   * @apiSuccess {Date}    created_at     Timestamp
   *
   * @apiError (Bad Request 400)  ValidationError  Some parameters may contain invalid values
   * @apiError (Unauthorized 401) Unauthorized Only authenticated ideas can modify the data
   * @apiError (Forbidden 403)    Forbidden    Only idea with same id or admins can modify the data
   * @apiError (Not Found 404)    NotFound     Idea does not exist
   */
  .put(authorize(), validate(updateIdea), controller.update)
  /**
   * @api {patch} v1/ideas/:id Delete Idea
   * @apiDescription Delete a idea
   * @apiVersion 1.0.0
   * @apiName DeleteIdea
   * @apiGroup Idea
   * @apiPermission idea
   *
   * @apiHeader {String} Athorization  Idea's access token
   *
   * @apiSuccess (No Content 204)  Successfully deleted
   *
   * @apiError (Unauthorized 401) Unauthorized  Only authenticated ideas can delete the data
   * @apiError (Forbidden 403)    Forbidden     Only idea with same id or admins can delete the data
   * @apiError (Not Found 404)    NotFound      Idea does not exist
   */
  .delete(authorize(), controller.remove);


module.exports = router;
