const { twitter: { consumerKey, consumerSecret } } = require('../config/keys');
const TwitterAPI = require('../utils/TwitterAPI');

const Twitter =  new TwitterAPI(consumerKey, consumerSecret);

async function getUserTimeline(req, res, next) {
  try {
    const { handle, count } = req.param;
    const timeline = await Twitter.getUserTimeline(handle, count);
    res.status(200).send(timeline);
  } catch (error) {
    res.status(400).send(e);
  }
}

module.exports = { getUserTimeline };
