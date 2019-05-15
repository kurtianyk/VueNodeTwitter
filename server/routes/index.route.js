const express = require('express');

const twitterRoutes = require('./twitter.route');

const router = express.Router();

router.use('/twitter', twitterRoutes);

module.exports = router;
