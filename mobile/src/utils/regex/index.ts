const postalCode = RegExp(/[0-9]{5}-[0-9]{3}/g);
const cpfAndCnpjRegex = RegExp(
  /^([0-9]{3}\.[0-9]{3}\.[0-9]{3}-[0-9]{2}|[0-9]{2}\.[0-9]{3}\.[0-9]{3}\/[0-9]{4}-[0-9]{2})$/,
);

export { postalCode, cpfAndCnpjRegex };
