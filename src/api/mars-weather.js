const express = require('express');
const axios = require('axios');
const rateLimit = require('express-rate-limit');
const slowDown = require('express-slow-down');

const limiter = rateLimit({
  windowMs: 30 * 1000, //reset rate limit after 30 secs
  max: 10, // throw too many reqests error after 10 api hits with in the 30 sec window
});

const speedLimiter = slowDown({
  windowMs: 30 * 1000, //reset after slowdown after 30 secs
  delayAfter: 1,
  delayMs: 500 //delay each request after the first one by 500 milli sec
});

const router = express.Router();

const BASE_URL = 'https://api.nasa.gov/insight_weather/?';

let cachedData;
let cacheTime;

const apiKeys = new Map(); //your app's api key not third party api key
apiKeys.set('12345', true); // 12345 is the api key

router.get('/', limiter, speedLimiter, (req, res, next) => {
  const apiKey = req.get('X-API-KEY'); // use "X-API-KEY" as a header parameter followed by 12345 in postman to test
  if (apiKeys.has(apiKey)) {
    next();
  } else {
    const error = new Error('Invalid API KEY');
    next(error);
  }
}, async (req, res, next) => {
  // in memory cache
  if (cacheTime && cacheTime > Date.now() - 30 * 1000) {
    return res.json(cachedData);
  }
  try {
    const params = new URLSearchParams({
      api_key: process.env.NASA_API_KEY,
      feedtype: 'json',
      ver: '1.0'
    });
    // 1. make a request to nasa api
    const { data } = await axios.get(`${BASE_URL}${params}`);
    // 2. respond to this request with data from nasa api
    cachedData = data;
    cacheTime = Date.now();
    data.cacheTime = cacheTime;
    return res.json(data);
  } catch (error) {
    return next(error);
  }
});

module.exports = router;