const request = require('request-promise');

class TwitterAPI {
  constructor(consumerKey, consumerSecret) {
    this.rp = request.defaults({
      baseUrl: 'https://api.twitter.com/1.1',
      timeout: 10000,
      headers: {
        Accept: '*/*',
        'Cache-Control': 'no-cache',
        Connection: 'close',
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      json: true,
    });

    (async () => {
      try {
        const token = await request({
          method: 'POST',
          url: 'https://api.twitter.com/oauth2/token',
          auth: {
            user: consumerKey,
            pass: consumerSecret,
          },
          form: { grant_type: 'client_credentials' },
          json: true,
        });

        this.rp = this.rp.defaults({
          headers: {
            Authorization: `Bearer ${token.access_token}`,
          },
        });
      } catch (e) {
        console.error(e.message);
        throw Error(e.message);
      }
    })();
  }

  async _checkUserExist(handle) {
    try {
      const user = await this.rp.get({ uri: '/users/lookup.json', qs: { screen_name: handle } });
      if (user) return true;
    } catch (e) {
      console.error(e.message);
      return null;
    }
  }

  async getUserTimeline(handle, count) {
    try {
      let userTimeline;
      const userExist = await this._checkUserExist(handle);

      if (userExist) {
        userTimeline = await this.rp.get({ uri: '/statuses/user_timeline.json', qs: { screen_name: handle, count: count || 5 } });
      }

      return userTimeline || [];
    } catch (e) {
      console.error(e.message);
      throw Error(e.message);
    }
  }
};

module.exports = TwitterAPI;
