import { CronJob } from 'cron';
import fetchGithub from './tasks/fetch-github';

new CronJob('*/1 * * * *', function(){ fetchGithub() }, null, true, 'Europe/Lisbon')