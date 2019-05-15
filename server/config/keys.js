require('dotenv-safe').config();

module.exports = {
  twitter: {
    consumerKey: process.env.TWITTER_CONSUMER_KEY || 'twitterconsumerKey',
    consumerSecret: process.env.TWITTER_CONSUMER_SECRET || 'twitterconsumerSecret',
    accessToken: process.env.TWITTER_ACCESS_TOKEN || 'twitteraccessToken',
    accessTokenSecret: process.env.TWITTER_TOKEN_SECRET || 'twitteraccessTokenSecret',
  },
};
