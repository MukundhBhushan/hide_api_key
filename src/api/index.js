// /api/v1/* routes
const express = require('express');

const marsWeather = require('./mars-weather');

const router = express.Router();

router.get('/', (req, res) => {
  res.json({
    message: 'hello API route'
  });
});

// /api/mars-weather api routes
router.use('/mars-weather', marsWeather);

module.exports = router;