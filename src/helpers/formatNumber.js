// @flow

const DEFAULT_THOUSAND_SEPARATOR = '.';

type Options = {
  withFractionDigits?: boolean,
  thousandSeparator?: string,
};

export default function formatNumber(
  unformattedValue: number,
  options?: Options = {},
): string {
  let {
    withFractionDigits = true,
    thousandSeparator = DEFAULT_THOUSAND_SEPARATOR,
  } = options;

  let formattedValue = unformattedValue
    .toString()
    .replace(/(\d)(?=(\d{3})+(?!\d))/g, `$1${thousandSeparator}`);

  if (withFractionDigits) {
    return formattedValue.concat(',00');
  }
  return formattedValue;
}

export function formatWithRupiah(value: number) {
  return 'Rp ' + formatNumber(value);
}
