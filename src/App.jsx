import { useState, useCallback } from "react";
import CopyIcon from "./assets/icons/icon-copy.svg";
import ArrowIcon from "./assets/icons/icon-arrow-right.svg";
import { generateSecurePassword } from "./utils/passwordGenerator";

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
    const parsedValue = type === "checkbox" ? e.target.checked : value;
    setFormData((prev) => ({ ...prev, [name]: parsedValue }));
  };

  const generatePassword = useCallback(() => {
    const generated = generateSecurePassword(
      formData.length,
      formData.includeUppercase,
      formData.includeLowercase,
      formData.includeNumbers,
      formData.includeSymbols,
    );

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
    setPassword("");
    const counts =
      (formData.includeUppercase && 1) +
      (formData.includeLowercase && 1) +
      (formData.includeNumbers && 1) +
      (formData.includeSymbols && 1);

    if (formData.length < counts) return;
    if (formData.length === 0) return;
    generatePassword();
  };

  return (
    <>
      <header>
        <h1>Password Generator</h1>
      </header>
      <main>
        <div className="card row">
          <p className={password === "" ? "faded" : undefined}>
            {password === "" ? "P4$5W0rD!" : password}
          </p>
          <button
            className="btn"
            onClick={() => navigator.clipboard.writeText(password)}
            aria-label="copy password to clipboard"
          >
            <img src={CopyIcon} alt="" aria-hidden="true" />
          </button>
        </div>
        <div className="card">
          <form
            onSubmit={handleSubmit}
            className="generate-password-form"
            noValidate
          >
            <div className="input-group">
              <div className="row">
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
            </div>
            <div className="input-group">
              <button className="btn btn--primary" type="submit">
                Generate
                <img src={ArrowIcon} alt="" aria-hidden="true" />
              </button>
            </div>
          </form>
        </div>
      </main>
    </>
  );
}
