import fetch from 'node-fetch';
import { createClient } from 'redis';
const { promisify } = require('util');

const baseURL = 'https://jobs.github.com/positions.json';

const client = createClient(process.env.REDIS_URL);
const setAsync = promisify(client.set).bind(client);

export default async function fetchGithub() {
    const allJobs = [];

    let resultCount = 1;
    let onPage = 0;

    // fetch all pages
    while (onPage < 6) {
        const res = await fetch(baseURL);
        const jobs = await res.json();
        allJobs.push(...jobs);
        resultCount = jobs.length;
        console.log('got', resultCount, 'jobs');
        onPage++;
    }
    console.log('got', allJobs.length, 'jobs total');

    // filter jobs
    const jrJobs = allJobs.filter(job => {
        const jobTitle = job.title.toLowerCase();

        if (
            jobTitle.includes('senior') ||
            jobTitle.includes('manager') ||
            jobTitle.includes('sr.') ||
            jobTitle.includes('architect')
        ) {
            return false;
        }

        return true;
    });

    console.log('filtered down to ', jrJobs.length);

    const success = await setAsync('github', JSON.stringify(allJobs));
    console.log({success});
}
