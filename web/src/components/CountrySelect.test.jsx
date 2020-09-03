import React from 'react';
import { shallow } from 'enzyme';
import { Autocomplete } from '@material-ui/lab';
import CountrySelect from './CountrySelect';

const mockOnSelect = jest.fn();

jest.mock('react-i18next', () => ({
    useTranslation: () => ({
        t: jest.fn((str) => str),
    }),
}));

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
];

describe('SingleMetric tests', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = shallow(
            <CountrySelect
                countries={testCountries}
                onSelect={mockOnSelect}
                selected={testCountries[0]}
            />,
        );
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should pass countries to autocomplete', () => {
        const autocomplete = wrapper.find(Autocomplete).first();
        expect(autocomplete).toHaveProp('options', testCountries);
    });

    it('should pass selected country to autocomplete', () => {
        const autocomplete = wrapper.find(Autocomplete).first();
        expect(autocomplete).toHaveProp('value', testCountries[0]);
    });

    it('autocomplete onChange should call onSelect', () => {
        const autocomplete = wrapper.find(Autocomplete).first();
        autocomplete.prop('onChange')(null, testCountries[1]);
        expect(mockOnSelect).toHaveBeenCalledWith(testCountries[1]);
    });
});
