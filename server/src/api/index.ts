import express from 'express';
import { createClient } from 'redis';
import { promisify } from 'util';

const app = express();
const port = 3001;

const client = createClient();
const getAsync = promisify(client.get).bind(client);

app.get('/jobs', async (req, res) => {
    const jobs = await getAsync('github');

    console.log(JSON.parse(jobs).length);

    res.send(jobs);
});

app.listen(port, () => console.log(`listening on port ${port}`));