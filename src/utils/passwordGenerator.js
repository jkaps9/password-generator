export function generateSecurePassword(
  length,
  includeUppercase,
  includeLowercase,
  includeNumbers,
  includeSymbols,
) {
  const sets = {
    upper: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    lower: "abcdefghijklmnopqrstuvwxyz",
    numbers: "0123456789",
    symbols: "!@#$%^&*()_+",
  };

  let chars = "";
  if (includeUppercase) chars += sets.upper;
  if (includeLowercase) chars += sets.lower;
  if (includeNumbers) chars += sets.numbers;
  if (includeSymbols) chars += sets.symbols;

  const randomValues = new Uint32Array(length);
  window.crypto.getRandomValues(randomValues);
  let tempIndex = 0;

  let passwordArray = [];

  if (includeUppercase)
    passwordArray.push(
      sets.upper[randomValues[tempIndex++] % sets.upper.length],
    );
  if (includeLowercase)
    passwordArray.push(
      sets.lower[randomValues[tempIndex++] % sets.lower.length],
    );
  if (includeNumbers)
    passwordArray.push(
      sets.numbers[randomValues[tempIndex++] % sets.numbers.length],
    );
  if (includeSymbols)
    passwordArray.push(
      sets.symbols[randomValues[tempIndex++] % sets.symbols.length],
    );

  while (tempIndex < length) {
    passwordArray.push(chars[randomValues[tempIndex] % chars.length]);
    tempIndex++;
  }

  const shuffleValues = new Uint32Array(length);
  window.crypto.getRandomValues(shuffleValues);

  for (let i = passwordArray.length - 1; i > 0; i--) {
    const j = shuffleValues[i] % (i + 1);
    [passwordArray[i], passwordArray[j]] = [passwordArray[j], passwordArray[i]];
  }

  return passwordArray.join("");
}
