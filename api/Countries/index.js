const axios = require('axios').default;

const REQUEST_URL = 'https://api.covid19api.com/countries';

module.exports = async function (context) {
    try {
        const res = await axios.get(REQUEST_URL);
        context.res = {
            status: res.status,
            statusText: res.statusText,
            body: res.data,
        };
    } catch (error) {
        context.log.error(`Failed to get countries: ${error}`);
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
