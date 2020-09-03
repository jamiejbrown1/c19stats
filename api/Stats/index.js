const axios = require('axios').default;
const { getCountryStats } = require('./stats.utils');

const REQUEST_URL = 'https://api.covid19api.com/summary';

module.exports = async function (context) {
    const { country } = context.bindingData;
    try {
        const res = await axios.get(REQUEST_URL);
        const stats = getCountryStats(country, res.data);
        if (stats) {
            context.res = {
                status: res.status,
                statusText: res.statusText,
                body: stats,
            };
        } else {
            context.res = {
                status: 404,
                statusText: 'No data found for country',
            };
        }
    } catch (error) {
        context.log.error(`Failed to get stats: ${error}`);
        if (error.response) {
            context.res = error.response;
        } else {
            context.res = {
                status: 500,
                statusText: error.message,
            };
        }
    }
};
