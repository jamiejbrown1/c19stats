import mockAxios from 'jest-mock-axios';
import { getStats } from './StatsApi';

const responseObj = {
    status: 200,
    statusText: 'OK',
    data: 'useful data',
};

describe('Stats API tests', () => {
    afterEach(() => {
        mockAxios.reset();
    });

    it('getStats should call the api', async () => {
        const promise = getStats('global');
        expect(mockAxios.get).toHaveBeenCalled();
        mockAxios.mockResponse(responseObj);
        const data = await promise;
        expect(data).toEqual(responseObj.data);
    });

    it('getCountries should call the api', async () => {
        const promise = getStats('global');
        expect(mockAxios.get).toHaveBeenCalled();
        mockAxios.mockResponse(responseObj);
        const data = await promise;
        expect(data).toEqual(responseObj.data);
    });
});
