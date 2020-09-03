/**
 * Returns the stats data for the requested country
 * defaults to global stats if country is undefined
 * returns null if country stats cannot be found
 *
 * @param country The country to extract data for
 * @param stats All the stats
 */
const getCountryStats = (country, stats) => {
    if (!country || country === 'global') {
        return { ...stats.Global, Date: stats.Date };
    }

    const countryStats = stats.Countries.find((c) => country === c.Slug);

    if (countryStats) {
        return {
            NewConfirmed: countryStats.NewConfirmed,
            TotalConfirmed: countryStats.TotalConfirmed,
            NewDeaths: countryStats.NewDeaths,
            TotalDeaths: countryStats.TotalDeaths,
            NewRecovered: countryStats.NewRecovered,
            TotalRecovered: countryStats.TotalRecovered,
            Date: countryStats.Date,
        };
    }
    return null;
};

module.exports = { getCountryStats };
