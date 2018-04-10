// @flow

import formatNumber from '../formatNumber';

describe('formatNumber', () => {
  it('should format number without fraction', () => {
    let number = 1234;
    let formatted = formatNumber(number, {
      withFractionDigits: false,
    });

    expect(formatted).toBe('1.234');
  });

  it('should format number with fraction', () => {
    let number = 1234;
    let formatted = formatNumber(number, {
      withFractionDigits: true,
    });

    expect(formatted).toBe('1.234,00');
  });

  it('should format number with custom thousand separator', () => {
    let number = 1234567;
    let formatted = formatNumber(number, {
      thousandSeparator: ';',
    });

    expect(formatted).toBe('1;234;567,00');
  });
});
