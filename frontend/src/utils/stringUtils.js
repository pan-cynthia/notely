export const validateEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // regex: ^ = not, \s = whitespace char, @ = at symbol, combined = any char that is not a whitespace or at symbol
  return regex.test(email);
}

export const validatePassword = (password) => {
  const errors = [];

  if (password.length < 8) errors.push("Password must be at least 8 characters.");
  if (!/[A-Z]/.test(password)) errors.push("Password must contain at least one uppercase letter.");
  if (!/[a-z]/.test(password)) errors.push("Password must contain at least one lowercase letter.");
  if (!/[!@#$%^&*]/.test(password)) errors.push("Password must contain at least one special character.");

  return errors;
}

export const getUserInitials = (name) => {
  if (!name) return "";
  const words = name.split(" ");
  let initials = "";
  for (let i = 0; i < Math.min(words.length, 2); ++i) {
    initials += words[i][0];
  }
  return initials.toUpperCase();
}
