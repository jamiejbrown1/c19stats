const getCountryStats = require('./stats.utils').getCountryStats;
const axios = require('axios').default;
const REQUEST_URL = 'https://api.covid19api.com/summary';

module.exports = async function (context, req) {
    const country = context.bindingData.country;
    try {
        const res = await axios.get(REQUEST_URL);
        const stats = getCountryStats(country, res.data);
        if (stats) {
            context.res = {
                status: res.status,
                statusText: res.statusText,
                body: stats
            }
        } else {
            context.res = {
                status: 404,
                statusText: 'No data found for country'
            }
        }
    } catch (error) {
        if (error.response) {
            context.res = error.response;
        } else {
            context.res = {
                status: 500,
                statusText: error.message
            }
        }
    }
};
