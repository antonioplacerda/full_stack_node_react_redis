import { CronJob } from 'cron';
import fetchGithub from './tasks/fetch-github';

new CronJob('1 * * * *', () => fetchGithub, null, true, 'Europe/Lisbon')