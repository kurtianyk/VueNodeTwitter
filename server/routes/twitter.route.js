const express = require('express');

const router = express.Router();

const { getUserTimeline } = require('../controllers/twitter.controller');

router.get('/user_timeline/:handle', getUserTimeline);

module.exports = router;
