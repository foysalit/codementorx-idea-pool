const express = require('express');
const { authorize } = require('../../middlewares/auth');
const controller = require('../../controllers/user.controller');

const router = express.Router();

router
  .route('/')
  /**
   * @api {get} v1/me Logged in User Profile
   * @apiDescription Get logged in user profile information
   * @apiVersion 1.0.0
   * @apiName UserProfile
   * @apiGroup User
   * @apiPermission user
   *
   * @apiHeader {String} X-Access-Token  User's access token
   *
   * @apiSuccess {String}  name         User's name
   * @apiSuccess {String}  email        User's email
   * @apiSuccess {String}  avatar_url   User's avatar url
   *
   * @apiError (Unauthorized 401)  Unauthorized  Only authenticated Users can access the data
   */
  .get(authorize(), controller.loggedIn);

module.exports = router;
