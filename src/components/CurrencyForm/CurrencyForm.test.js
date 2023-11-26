import { render, screen, cleanup } from '@testing-library/react';
import CurrencyForm from './CurrencyForm';

import userEvent from '@testing-library/user-event';

const testCases = [
	{ amount: '100', from: 'PLN', to: 'USD' },
	{ amount: '20', from: 'USD', to: 'PLN' },
	{ amount: '200', from: 'PLN', to: 'USD' },
	{ amount: '345', from: 'USD', to: 'PLN' },
];

for (const test of testCases) {
	describe('Component CurrencyForm', () => {
		it('should render without crashing', () => {
			render(<CurrencyForm action={() => {}} />);
		});

		it('should run action callback with proper data on form submit', () => {
			// create fake action function
			const action = jest.fn();

			// render component
			render(<CurrencyForm action={action} />);

			// find “convert” button
			const submitButton = screen.getByText('Convert');

			//find fields elems
			const amountField = screen.getByTestId('amount');
			const fromField = screen.getByTestId('from');
			const toField = screen.getByTestId('to');

			// set test values to fields
			userEvent.type(amountField, test.amount);
			userEvent.selectOptions(fromField, test.from);
			userEvent.selectOptions(toField, test.to);

			// simulate user click on "convert" button
			userEvent.click(submitButton);

			// check if action callback was called once and with proper argument
			expect(action).toHaveBeenCalledTimes(1);
			expect(action).toHaveBeenCalledWith({
				amount: +test.amount,
				from: test.from,
				to: test.to,
			});
		});
	});

	// unmount component
	afterEach(cleanup);
}
