import { render, screen, cleanup } from '@testing-library/react';
import ResultBox from './ResultBox';
import '@testing-library/jest-dom/extend-expect';

const amountTestsFromPLN = [
	{ amount: 100, expected: 'PLN 100.00 = $28.57' },
	{ amount: 40, expected: 'PLN 40.00 = $11.43' },
	{ amount: 200, expected: 'PLN 200.00 = $57.14' },
	{ amount: 455, expected: 'PLN 455.00 = $130.00' },
];

const amountTestsFromUSD = [
	{ amount: 100, expected: '$100.00 = PLN 350.00' },
	{ amount: 200, expected: '$200.00 = PLN 700.00' },
	{ amount: 376, expected: '$376.00 = PLN 1,316.00' },
	{ amount: 24.44, expected: '$24.44 = PLN 85.54' },
];

describe('Component ResultBox', () => {
	it('should render without crashing', () => {
		render(<ResultBox from="PLN" to="USD" amount={200} />);
	});

	for (const amountTest of amountTestsFromPLN) {
		it('should render proper info about conversion when PLN -> USD', () => {
			render(<ResultBox from="PLN" to="USD" amount={amountTest.amount} />);

			const resultBox = screen.getByTestId('resultBox');

			expect(resultBox).toHaveTextContent(amountTest.expected);
		});
		cleanup();
	}

	for (const amountTest of amountTestsFromUSD) {
		it('should render proper info about conversion when USD -> PLN', () => {
			render(<ResultBox from="USD" to="PLN" amount={amountTest.amount} />);

			const resultBox = screen.getByTestId('resultBox');

			expect(resultBox).toHaveTextContent(amountTest.expected);
		});
		afterEach(cleanup);
	}

	it('should render the proper info about conversion PLN -> PLN', () => {
		render(<ResultBox from="PLN" to="PLN" amount={200} />);

		const resultBox = screen.getByTestId('resultBox');

		expect(resultBox).toHaveTextContent('PLN 200.00 = PLN 200.00');
	});

	it('should render the proper info about conversion USD -> USD', () => {
		render(<ResultBox from="USD" to="USD" amount={500} />);

		const resultBox = screen.getByTestId('resultBox');

		expect(resultBox).toHaveTextContent('$500.00 = $500.00');
	});

	it('should render "Wrong value..." when amount < 0', () => {
		render(<ResultBox from="PLN" to="USD" amount={-20} />);

		const wrongResult = screen.getByTestId('wrongResult');

		expect(wrongResult).toHaveTextContent('Wrong value...');
	});
});
