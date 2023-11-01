import { convertPLNToUSD } from './../convertPLNToUSD';

describe('ConvertPLNtoUSD', () => {
	it('should return proper value when good input', () => {
		expect(convertPLNToUSD(1)).toBe('$0.29');
		expect(convertPLNToUSD(2)).toBe('$0.57');
		expect(convertPLNToUSD(20)).toBe('$5.71');
		expect(convertPLNToUSD(12)).toBe('$3.43');
	});
	it('should return NaN when input is text', () => {
		expect(convertPLNToUSD('test1')).toBeNaN();
		expect(convertPLNToUSD('5')).toBeNaN();
		expect(convertPLNToUSD('test3')).toBeNaN();
		expect(convertPLNToUSD('13')).toBeNaN();
	});
	it('should return NaN when function has no argument', () => {
		expect(convertPLNToUSD()).toBeNaN();
	});
	it('should return "Error" when input is not text or number', () => {
		expect(convertPLNToUSD({})).toBe('Error');
		expect(convertPLNToUSD(['text', 3])).toBe('Error');
		expect(convertPLNToUSD(null)).toBe('Error');
		expect(convertPLNToUSD(function () {})).toBe('Error');
	});
	it('should return $0.00 when input is smaller than 0', () => {
		expect(convertPLNToUSD(-1)).toBe('$0.00');
		expect(convertPLNToUSD(-3.44)).toBe('$0.00');
		expect(convertPLNToUSD(-22)).toBe('$0.00');
		expect(convertPLNToUSD(-0.01)).toBe('$0.00');
	});
});
