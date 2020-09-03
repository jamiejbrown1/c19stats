import mockAxios from 'jest-mock-axios';
import Countries from './index';

const testCountries = [
    {
        Country: 'Togo',
        Slug: 'togo',
        ISO2: 'TG',
    },
    {
        Country: 'Zimbabwe',
        Slug: 'zimbabwe',
        ISO2: 'ZW',
    },
    {
        Country: 'Libya',
        Slug: 'libya',
        ISO2: 'LY',
    },
];

const log = { error: jest.fn() };

describe('Countries function tests', () => {
    let context;

    beforeEach(() => {
        context = { log };
    });

    afterEach(() => {
        mockAxios.reset();
        jest.clearAllMocks();
    });

    it('should return data from third party api', async () => {
        const promise = Countries(context);
        const responseObj = {
            status: 200,
            statusText: 'OK',
            data: testCountries,
        };

        expect(mockAxios.get).toHaveBeenCalled();
        mockAxios.mockResponse(responseObj);
        await promise;
        expect(context.res).toEqual({
            status: 200,
            statusText: 'OK',
            body: testCountries,
        });
    });

    it('should return any error response received', async () => {
        const promise = Countries(context);
        const errResponse = {
            response: {
                status: 400,
                statusText: 'Oh no!',
            },
        };
        expect(mockAxios.get).toHaveBeenCalled();
        mockAxios.mockError(errResponse);
        await promise;
        expect(log.error).toHaveBeenCalled();
        expect(context.res).toEqual(errResponse.response);
    });

    it('should return 500 for any other request errors', async () => {
        const promise = Countries(context);
        const errResponse = {
            message: 'Something went wrong',
        };
        expect(mockAxios.get).toHaveBeenCalled();
        mockAxios.mockError(errResponse);
        await promise;
        expect(log.error).toHaveBeenCalled();
        expect(context.res).toEqual({
            status: 500,
            statusText: errResponse.message,
        });
    });
});
