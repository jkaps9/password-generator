export function generateSecurePassword(
  length,
  includeUppercase,
  includeLowercase,
  includeNumbers,
  includeSymbols,
) {
  let chars = "";
  if (includeUppercase) chars += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  if (includeLowercase) chars += "abcdefghijklmnopqrstuvwxyz";
  if (includeNumbers) chars += "0123456789";
  if (includeSymbols) chars += "!@#$%^&*()_+";

  let generated = "";
  for (let i = 0; i < length; i++) {
    const index = Math.floor(Math.random() * chars.length);
    generated += chars[index];
  }

  return generated;
}
