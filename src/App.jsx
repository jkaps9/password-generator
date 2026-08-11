import { useState } from "react";

export default function App() {
  const [formData, setFormData] = useState({
    length: 8,
    includeUppercase: false,
    includeLowerCase: false,
    includeNumbers: false,
    includeSymbols: false,
  });

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
        </form>
      </main>
    </>
  );
}
