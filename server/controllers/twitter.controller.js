const { twitter: { consumerKey, consumerSecret } } = require('../config/keys');
const TwitterAPI = require('../utils/TwitterAPI');

const Twitter = new TwitterAPI(consumerKey, consumerSecret);

async function getUserTimeline(req, res, next) {
  try {
    const { handle } = req.params;
    const timeline = await Twitter.getUserTimeline(handle);
    res.status(200).send(timeline);
  } catch (e) {
    console.error(e);
    res.status(500).send(e);
  }
}

module.exports = { getUserTimeline };
