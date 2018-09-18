const express = require('express');
const userRoutes = require('./user.route');
const authRoutes = require('./auth.route');
const ideaRoutes = require('./idea.route');

const router = express.Router();

/**
 * GET v1/status
 */
router.get('/status', (req, res) => res.send('OK'));

/**
 * GET v1/docs
 */
router.use('/docs', express.static('docs'));

router.use('/ideas', ideaRoutes);
router.use('/me', userRoutes);
router.use('/', authRoutes);

module.exports = router;
