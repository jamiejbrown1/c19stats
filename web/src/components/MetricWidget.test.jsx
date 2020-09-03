import { shallow } from 'enzyme';
import React from 'react';
import MetricWidget from './MetricWidget';

jest.mock('react-i18next', () => ({
    useTranslation: () => ({
        t: jest.fn((str) => str),
    }),
}));

const testTitle = 'Metric';
const testTotalValue = 205000;
const testTodayValue = 3000;

describe('MetricWidget tests', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = shallow(
            <MetricWidget
                title={testTitle}
                total={testTotalValue}
                today={testTodayValue}
            />,
        );
    });

    it('should display metric title', () => {
        expect(wrapper.find('[data-testid="title"]').text()).toEqual(testTitle);
    });

    it('should pass correct value to total metric', () => {
        expect(wrapper.find('[data-testid="total-metric"]')).toHaveProp('value', testTotalValue);
    });

    it('should pass correct value to daily metric', () => {
        expect(wrapper.find('[data-testid="daily-metric"]')).toHaveProp('value', testTodayValue);
    });
});
