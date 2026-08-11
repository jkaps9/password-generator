import { useState, useCallback } from "react";

export default function App() {
  const [formData, setFormData] = useState({
    length: 8,
    includeUppercase: true,
    includeLowercase: true,
    includeNumbers: false,
    includeSymbols: false,
  });

  const [password, setPassword] = useState("");

  const handleInputChange = (e) => {
    const { name, value, type } = e.target;
    console.log(name, value, type);
    const parsedValue = type === "checkbox" ? e.target.checked : value;
    setFormData((prev) => ({ ...prev, [name]: parsedValue }));
  };

  const generatePassword = useCallback(() => {
    let chars = "";
    if (formData.includeUppercase) chars += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (formData.includeLowercase) chars += "abcdefghijklmnopqrstuvwxyz";
    if (formData.includeNumbers) chars += "0123456789";
    if (formData.includeSymbols) chars += "!@#$%^&*()_+";

    let generated = "";
    for (let i = 0; i < formData.length; i++) {
      const index = Math.floor(Math.random() * chars.length);
      generated += chars[index];
    }
    setPassword(generated);
  }, [
    formData.length,
    formData.includeUppercase,
    formData.includeLowercase,
    formData.includeNumbers,
    formData.includeSymbols,
  ]);

  const handleSubmit = (e) => {
    e.preventDefault();
    generatePassword();
  };

  return (
    <>
      <header>
        <h1>Password Generator</h1>
      </header>
      <main>
        <div className="password-output">
          <p className={password === "" && "faded"}>
            {password === "" ? "P4$5W0rD!" : password}
          </p>
        </div>
        <form onSubmit={handleSubmit} noValidate>
          <div className="input-group">
            <div>
              <label htmlFor="range">Character Length</label>
              <p>{formData.length}</p>
            </div>
            <input
              type="range"
              id="length"
              name="length"
              min="0"
              max="20"
              value={formData.length}
              step="1"
              onChange={handleInputChange}
            />
          </div>

          <div className="input-group">
            <div>
              <input
                type="checkbox"
                id="includeUppercase"
                name="includeUppercase"
                onChange={handleInputChange}
                checked={formData.includeUppercase}
              />
              <label htmlFor="includeUppercase">
                Include Uppercase Letters
              </label>
            </div>
            <div>
              <input
                type="checkbox"
                id="includeLowercase"
                name="includeLowercase"
                onChange={handleInputChange}
                checked={formData.includeLowercase}
              />
              <label htmlFor="includeLowercase">
                Include Lowercase Letters
              </label>
            </div>
            <div>
              <input
                type="checkbox"
                id="includeNumbers"
                name="includeNumbers"
                onChange={handleInputChange}
                checked={formData.includeNumbers}
              />
              <label htmlFor="includeNumbers">Include Numbers</label>
            </div>
            <div>
              <input
                type="checkbox"
                id="includeSymbols"
                name="includeSymbols"
                onChange={handleInputChange}
                checked={formData.includeSymbols}
              />
              <label htmlFor="includeSymbols">Include Symbols</label>
            </div>
            <div className="input-group">
              <button type="submit">Generate</button>
            </div>
          </div>
        </form>
      </main>
    </>
  );
}
