const express = require('express');
const path = require('path');
const { promisify } = require('util');
const redis = require("redis");

const app = express();
const client = redis.createClient();
const getAsync = promisify(client.get).bind(client);

const port = process.env.PORT || 8080;

app.use(express.static(path.join(__dirname, 'client', 'build')));

app.get('/ping', function (req, res) {
  return res.send('pong');
});

app.get('/jobs', async (req, res) => {
  const jobs = await getAsync('github');
  res.header([
    "Access-Control-Allow-Origin", "http://localhost:8080",
    "Content-Type", "application/json",
  ])
  res.send(jobs);
});

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
});

app.listen(port, () => console.log(`listening on port ${port}`));

