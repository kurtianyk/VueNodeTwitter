const request = require('request-promise');

class TwitterAPI {
  constructor(consumer_key, consumer_secret) {
    (async () => {
      try {
      const token = await request({
        method: 'POST',
        url: 'https://api.twitter.com/oauth2/token',
        auth: {
          user: consumer_key,
          pass: consumer_secret
        },
        form: { grant_type:'client_credentials'},
        json: true
      })

      this.rp = request.defaults({
        baseUrl: 'https://api.twitter.com/1.1',
        timeout: 10000,
        headers: {
          Accept: '*/*',
          Authorization: `Bearer ${token.access_token}`,
          'Cache-Control': 'no-cache',
          Connection: 'close',
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        json: true,
      });
    } catch (e) {
      console.log('error', e.message);
      throw Error(e.message);
    }
    })();
  }

  async getUserTimeline(handle, count) {
    try {
      const user_timeline = await this.rp.get({ uri:'/statuses/user_timeline.json', qs: { screen_name: handle, count: count || 5 } });
      return user_timeline;
    } catch(e) {
      console.log('error', e.message);
      throw Error(e.message);
    }
  }

};

module.exports = TwitterAPI;
