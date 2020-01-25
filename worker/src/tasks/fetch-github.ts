import fetch from 'node-fetch';

const baseURL = 'https://jobs.github.com/positions.json';

async function fetchGithub() {
    const allJobs = [];

    let resultCount = 1;
    let onPage = 0;

    while(onPage < 6) {
        const res = await fetch(baseURL);
        const jobs = await res.json();
        allJobs.push(...jobs);
        resultCount = jobs.length;
        console.log('got', resultCount, 'jobs');
        console.log('got', allJobs.length, 'jobs total');
        onPage++;
    }
    console.log('got', allJobs.length, 'jobs total');
}

module.exports = fetchGithub;

fetchGithub();
