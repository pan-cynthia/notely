export const validateEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // regex: ^ = not, \s = whitespace char, @ = at symbol, combined = any char that is not a whitespace or at symbol
  return regex.test(email);
}
