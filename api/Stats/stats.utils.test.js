import { getCountryStats } from './stats.utils';

const testStats = {
    Global: {
        NewConfirmed: 264767,
        TotalConfirmed: 25746235,
        NewDeaths: 6478,
        TotalDeaths: 856969,
        NewRecovered: 254670,
        TotalRecovered: 17071445
    },
    Countries: [
        {
            Country: "United States of America",
            CountryCode: "US",
            Slug: "united-states",
            NewConfirmed: 43253,
            TotalConfirmed: 6073840,
            NewDeaths: 1067,
            TotalDeaths: 184664,
            NewRecovered: 17838,
            TotalRecovered: 2202663,
            Date: "2020-09-02T23:15:17Z",
            Premium: { }
        },
        {
            Country: "Netherlands",
            CountryCode: "NL",
            Slug: "netherlands",
            NewConfirmed: 462,
            TotalConfirmed: 71129,
            NewDeaths: 6,
            TotalDeaths: 6230,
            NewRecovered: 0,
            TotalRecovered: 0,
            Date: "2020-09-02T23:15:17Z",
            Premium: { }
        },
    ],
    Date: "2020-09-02T23:15:17Z"
};

describe('getCountryStats tests', () => {
    it('should return global stats if country is null', () => {
        const stats = getCountryStats(null, testStats);
        expect(stats).toEqual({ ...testStats.Global, Date: testStats.Date });
    });

    it('should return global stats if explicitly requested', () => {
        const stats = getCountryStats('global', testStats);
        expect(stats).toEqual({ ...testStats.Global, Date: testStats.Date });
    });

    it('should return existing country stats', () => {
        const stats = getCountryStats('united-states', testStats);
        expect(stats).toEqual({
            NewConfirmed: 43253,
            TotalConfirmed: 6073840,
            NewDeaths: 1067,
            TotalDeaths: 184664,
            NewRecovered: 17838,
            TotalRecovered: 2202663,
            Date: "2020-09-02T23:15:17Z",
        });
    });

    it('should return null for non-existing country', () => {
        const stats = getCountryStats('kings-landing', testStats);
        expect(stats).toBeNull();
    });
});