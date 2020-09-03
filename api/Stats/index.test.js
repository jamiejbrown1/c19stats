import mockAxios from 'jest-mock-axios';
import Stats from './index';

const mockGetCountryStats = jest.fn();
jest.mock('./stats.utils.js', () => ({
    getCountryStats: (country, stats) => mockGetCountryStats(country, stats)
}));

const testStats = {
    NewConfirmed: 43253,
    TotalConfirmed: 6073840,
    NewDeaths: 1067,
    TotalDeaths: 184664,
    NewRecovered: 17838,
    TotalRecovered: 2202663,
    Date: "2020-09-02T23:15:17Z",
};

describe('Stats function tests', () => {

    afterEach(() => {
        mockAxios.reset();
        jest.clearAllMocks();
    });

    it('should return data from third party api', async () => {
        mockGetCountryStats.mockReturnValueOnce(testStats);
        const context = { bindingData: { country: 'united-kingdom' } };
        const promise = Stats(context);

        const responseObj = {
            status: 200,
            statusText: 'OK',
            data: 'hello'
        };

        expect(mockAxios.get).toHaveBeenCalled();
        mockAxios.mockResponse(responseObj);
        await promise;
        expect(mockGetCountryStats).toHaveBeenCalledWith('united-kingdom', 'hello');
        expect(context.res).toEqual({
            status: 200,
            statusText: 'OK',
            body: testStats
        });
    });

    it('should return 404 if no stats found for country', async () => {
        mockGetCountryStats.mockReturnValueOnce(null);
        const context = { bindingData: { location: 'global' } };
        const promise = Stats(context);

        const responseObj = {
            status: 200,
            statusText: 'OK',
            data: 'hello'
        };

        expect(mockAxios.get).toHaveBeenCalled();
        mockAxios.mockResponse(responseObj);
        await promise;
        expect(context.res.status).toEqual(404);
    });

    it('should return any error response received', async () => {
        const context = { bindingData: { location: 'global' } };
        const promise = Stats(context);
        const errResponse = {
            response: {
                status: 400,
                statusText: 'Oh no!',
            }
        };
        expect(mockAxios.get).toHaveBeenCalled();
        mockAxios.mockError(errResponse);
        await promise;
        expect(context.res).toEqual(errResponse.response);
    });

    it('should return 500 for any other request errors', async () => {
        const context = { bindingData: { location: 'global' } };
        const promise = Stats(context);
        const errResponse = {
            message: "Something went wrong"
        };
        expect(mockAxios.get).toHaveBeenCalled();
        mockAxios.mockError(errResponse);
        await promise;
        expect(context.res).toEqual({
            status: 500,
            statusText: errResponse.message
        });
    });
});