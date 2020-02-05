import express from 'express';
import { createClient } from 'redis';
import { promisify } from 'util';

const app = express();
const port = 3001;

console.log(process.env.REDIS_URL);
const client = createClient(process.env.REDIS_URL);
const getAsync = promisify(client.get).bind(client);

app.get('/jobs', async (req, res) => {
    const jobs = await getAsync('github');
    res.header("Access-Control-Allow-Origin", "https://salty-badlands-66972.herokuapp.com/")
    res.send(jobs);
});

app.listen(port, () => console.log(`listening on port ${port}`));