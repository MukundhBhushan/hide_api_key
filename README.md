Hiding the api keys
<pre>
hideapikey
├───.env -> environment vars  
├───src -> all source files  
|    ├──────api -> router files  
|    |   ├──────app.js -> express app file  
|    |   ├──────middlewares.js -> 404 and error handling file  
|    |   ├──────api -> /api/v1/* router  
|    |   |       ├───index.js -> /api/v1/ base router handler  
|    |   |       └───mars-weather.js -> /api/v1/mars-weather 3rd party api endpoint file, caching, app api key, etc  
</pre>
Hearder section postman  
X-API-KEY: 12345  
