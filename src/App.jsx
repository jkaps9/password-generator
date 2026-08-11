import { useState } from "react";

export default function App() {
  const [formData, setFormData] = useState({
    length: 8,
    includeUppercase: "off",
    includeLowerCase: "off",
    includeNumbers: "off",
    includeSymbols: "off",
  });

  const [password, setPassword] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
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
        <form noValidate>
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
                checked={formData.includeUppercase === "on"}
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
                checked={formData.includeLowercase === "on"}
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
                checked={formData.includeNumbers === "on"}
              />
              <label htmlFor="includeNumbers">Include Numbers</label>
            </div>
            <div>
              <input
                type="checkbox"
                id="includeSymbols"
                name="includeSymbols"
                onChange={handleInputChange}
                checked={formData.includeSymbols === "on"}
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
