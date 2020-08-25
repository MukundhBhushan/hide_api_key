const express = require('express');

require('dotenv').config();

const middlewares = require('./middlewares');
const api = require('./api');

const app = express();
app.set('trust proxy', 1);

app.use(express.json());

app.get('/', (req, res) => {
  res.json({
    message: 'hello'
  });
});

app.use('/api/v1', api);

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

app.listen(3000 || process.env.PORT,()=>{
    console.log('listing')
})