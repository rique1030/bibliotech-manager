export function validateEmail(email: string) {
  const emailIsValid = !!email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/i.test(email);
  if (!emailIsValid) throw new Error("Please enter a valid email address");
  if (!email.endsWith("@dyci.edu.ph"))
    throw new Error("Please enter a valid DYCI email address");
  return true;
}

export function validatePassword(password: string) {
  const passwordIsValid = !!password && password.length >= 8;
  if (!passwordIsValid) throw new Error("Please enter a valid password");
  return true;
}

export function validateID(id: string) {
  const idIsValid = !!id && /^\d{4}-\d{5,6}$/.test(id);
  if (!idIsValid) throw new Error("Please enter a valid ID");
  return true;
}
