import React from 'react';
import { shallow } from 'enzyme';
import SingleMetric from './SingleMetric';

const mockValue = '10k';
const mockAbbr = jest.fn(() => mockValue);
jest.mock('number-abbreviate', () => jest.fn((num) => mockAbbr(num)));

const testName = 'test';
const testValue = 10000;

describe('SingleMetric tests', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = shallow(<SingleMetric name={testName} value={testValue} />);
    });

    it('should display metric name', () => {
        expect(wrapper.find('[data-testid="metric-name"]').text()).toEqual(testName);
    });

    it('should display abbreviated value', () => {
        expect(mockAbbr).toHaveBeenCalledWith(testValue);
        expect(wrapper.find('[data-testid="metric-value"]').text()).toEqual(mockValue);
    });
});
