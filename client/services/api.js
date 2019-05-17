import request from 'request-promise';

const SITE_URL = process.env.SITE_URL || document.location.origin;

const rp = request.defaults({
  baseUrl: SITE_URL,
  timeout: 10000,
  headers: {
    'Cache-Control': 'no-cache',
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  json: true,
});

const getUserTimeline = handle => rp.get(`/api/twitter/user_timeline/${handle}`);

export default {
  getUserTimeline,
};
