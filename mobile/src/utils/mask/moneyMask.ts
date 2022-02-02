import { moneyFormatter } from '../formatters';

export default (valueToFormat: number | string): string => {
  const prefix: string =
    typeof valueToFormat === 'number' && valueToFormat < 0 ? '-' : '';

  const parsedValue = String(valueToFormat).replace(/\D/g, '');

  if (Number(parsedValue) === 0) return '';
  if (parsedValue.length <= 2) {
    return `R$ 0,${parsedValue.padStart(2, '0')}`;
  }

  return `${prefix} ${moneyFormatter(parsedValue)}`;
};
