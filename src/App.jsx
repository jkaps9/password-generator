import { useState, useCallback } from "react";
import CopyIcon from "./assets/icons/icon-copy.svg";
import ArrowIcon from "./assets/icons/icon-arrow-right.svg";
import { generateSecurePassword } from "./utils/passwordGenerator";
import zxcvbn from "zxcvbn";

export default function App() {
  const [formData, setFormData] = useState({
    length: 8,
    includeUppercase: true,
    includeLowercase: true,
    includeNumbers: false,
    includeSymbols: false,
  });

  const [errors, setErrors] = useState({
    lengthError: "",
    checkboxError: "",
  });

  const [password, setPassword] = useState("");
  const [passwordAnalysis, setPasswordAnalysis] = useState(null);

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
    if (generated) {
      setPasswordAnalysis(zxcvbn(generated));
    } else {
      setPasswordAnalysis(null);
    }
    setPassword(generated);
  }, [
    formData.length,
    formData.includeUppercase,
    formData.includeLowercase,
    formData.includeNumbers,
    formData.includeSymbols,
  ]);

  const validateForm = () => {
    let isValid = true;
    const newErrors = { lengthError: "" };
    const counts =
      (formData.includeUppercase && 1) +
      (formData.includeLowercase && 1) +
      (formData.includeNumbers && 1) +
      (formData.includeSymbols && 1);
    if (counts === 0) {
      isValid = false;
      newErrors.checkboxError = "Must select at least 1 checkbox";
    } else if (formData.length < counts) {
      isValid = false;
      newErrors.lengthError = `Password Length must be at least ${counts} characters`;
    } else if (formData.length === 0) {
      isValid = false;
      newErrors.lengthError = `Password Length must be at least ${counts} characters`;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setPassword("");
    setPasswordAnalysis(null);

    if (validateForm()) {
      generatePassword();
    }
  };

  return (
    <>
      <header>
        <h1>Password Generator</h1>
      </header>
      <main>
        <div className="card row">
          <p
            className={`${password === "" ? "faded" : undefined} password-output`}
          >
            {password === "" ? "P4$5W0rD!" : password}
          </p>
          <button
            className="btn"
            onClick={() => navigator.clipboard.writeText(password)}
            aria-label="copy password to clipboard"
          >
            <img
              src={CopyIcon}
              alt=""
              aria-hidden="true"
              height={20}
              width={17.5}
            />
          </button>
        </div>
        <div className="card">
          <form
            onSubmit={handleSubmit}
            className="generate-password-form"
            noValidate
          >
            <div className="input-group" aria-live="polite">
              <div className="row">
                <label htmlFor="range">Character Length</label>
                <p className="accent-text character-count">{formData.length}</p>
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
                aria-invalid={errors.lengthError ? "true" : "false"}
                aria-describedby="lengthError"
              />
              {errors.lengthError !== "" && (
                <p id="lengthError" className="error-message">
                  {errors.lengthError}
                </p>
              )}
            </div>

            <div className="input-group" aria-live="polite">
              <div>
                <input
                  type="checkbox"
                  id="includeUppercase"
                  name="includeUppercase"
                  onChange={handleInputChange}
                  checked={formData.includeUppercase}
                  aria-invalid={
                    errors.checkboxError && !formData.includeUppercase
                      ? "true"
                      : "false"
                  }
                  aria-describedby="checkboxError"
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
                  aria-invalid={
                    errors.checkboxError && !formData.includeLowercase
                      ? "true"
                      : "false"
                  }
                  aria-describedby="checkboxError"
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
                  aria-invalid={
                    errors.checkboxError && !formData.includeNumbers
                      ? "true"
                      : "false"
                  }
                  aria-describedby="checkboxError"
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
                  aria-invalid={
                    errors.checkboxError && !formData.includeSymbols
                      ? "true"
                      : "false"
                  }
                  aria-describedby="checkboxError"
                />
                <label htmlFor="includeSymbols">Include Symbols</label>
              </div>
              {errors.checkboxError !== "" && (
                <p id="checkboxError" className="error-message">
                  {errors.checkboxError}
                </p>
              )}
            </div>
            <div className="card card--inner row">
              <p className="faded">STRENGTH</p>
              <div className="password-strength">
                <p>
                  {passwordAnalysis?.score <= 1
                    ? "TOO WEAK!"
                    : passwordAnalysis?.score === 2
                      ? "WEAK"
                      : passwordAnalysis?.score === 3
                        ? "MEDIUM"
                        : passwordAnalysis?.score === 4
                          ? "STRONG"
                          : " "}
                </p>
                <div
                  className={`strength-bars  ${
                    passwordAnalysis?.score <= 1
                      ? "one-bar"
                      : passwordAnalysis?.score === 2
                        ? "two-bars"
                        : passwordAnalysis?.score === 3
                          ? "three-bars"
                          : passwordAnalysis?.score === 4
                            ? "four-bars"
                            : " "
                  }`}
                >
                  <div
                    className={`${passwordAnalysis?.score >= 0 ? "filled" : ""}`}
                  ></div>
                  <div
                    className={`${passwordAnalysis?.score >= 2 ? "filled" : ""}`}
                  ></div>
                  <div
                    className={`${passwordAnalysis?.score >= 3 ? "filled" : ""}`}
                  ></div>
                  <div
                    className={`${passwordAnalysis?.score >= 4 ? "filled" : ""}`}
                  ></div>
                </div>
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
