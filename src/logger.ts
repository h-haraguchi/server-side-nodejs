import {configure, getLogger} from 'log4js';

configure({
	appenders: {
		console: {type: 'console', layout:{type:'colored'}},
		schedule: {type: 'file', filename: 'logs/schedule.log', layout: {type: 'colored'}}
	},
	categories: {
		default: {appenders: ['console'], level: 'debug'},
		schedule: {appenders: ['schedule'], level: 'debug'}
	}
});

export const logger = {
	application: getLogger(),
	schedule: getLogger('schedule')
};
