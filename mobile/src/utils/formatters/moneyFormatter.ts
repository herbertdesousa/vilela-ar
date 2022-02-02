import Intl from 'intl';
import 'intl/locale-data/jsonp/pt-BR';

export default (value: number | string): string => {
  const parsed = String(value);
  const decimals = parsed.slice(parsed.length - 2);
  const int = parsed.slice(0, parsed.length - 2);

  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(Number(`${int}.${decimals}`));
};
