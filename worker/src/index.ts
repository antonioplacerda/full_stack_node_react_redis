import { CronJob } from 'cron';

new CronJob('* * * * * *', () => {
    console.log('You will see this every second')
}, null, true, 'Europe/Lisbon')