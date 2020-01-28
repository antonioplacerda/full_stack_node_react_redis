import { CronJob } from 'cron';
import fetchGithub from './tasks/fetch-github';

new CronJob('0,30 * * * *', () => fetchGithub, null, true, 'Europe/Lisbon')