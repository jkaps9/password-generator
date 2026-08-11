import { useState, useEffect } from "react";
import CopyIcon from "./assets/icons/icon-copy.svg?react";
import ArrowIcon from "./assets/icons/icon-arrow-right.svg?react";
import CheckIcon from "./assets/icons/icon-check.svg?react";
import { generateSecurePassword } from "./utils/passwordGenerator";

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
  const [isCopiedTextVisible, setIsCopiedTextVisible] = useState(false);

  useEffect(() => {
    if (!isCopiedTextVisible) {
      return;
    }

    const timer = setTimeout(() => {
      setIsCopiedTextVisible(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, [isCopiedTextVisible]);

  const handleInputChange = (e) => {
    const { name, value, type } = e.target;
    const parsedValue = type === "checkbox" ? e.target.checked : value;
    setFormData((prev) => ({ ...prev, [name]: parsedValue }));
  };

  const generatePassword = async () => {
    const generated = generateSecurePassword(
      formData.length,
      formData.includeUppercase,
      formData.includeLowercase,
      formData.includeNumbers,
      formData.includeSymbols,
    );
    if (generated) {
      try {
        const zxcvbnModule = await import("zxcvbn");
        const zxcvbn = zxcvbnModule.default || zxcvbnModule;
        setPasswordAnalysis(zxcvbn(generated));
      } catch (err) {
        console.error("Failed to load password analysis tool", err);
        setPasswordAnalysis(null);
      }
    } else {
      setPasswordAnalysis(null);
    }
    setPassword(generated);
  };

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
    }

    if (Number(formData.length) === 0) {
      isValid = false;
      newErrors.lengthError = `Password length must be at least 1 character`;
    }

    if (Number(formData.length) < counts) {
      isValid = false;
      newErrors.lengthError = `Password length must be at least ${counts} characters`;
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

  const handleCopy = () => {
    if (password === "" || isCopiedTextVisible) {
      return;
    }
    navigator.clipboard.writeText(password);
    setIsCopiedTextVisible(true);
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
            className="btn row"
            onClick={handleCopy}
            aria-label={
              isCopiedTextVisible ? "Password copied" : "Copy password"
            }
            disabled={password === ""}
          >
            {isCopiedTextVisible ? (
              <>
                <p className="accent-text">COPIED</p>
                <CheckIcon
                  aria-hidden="true"
                  height={20}
                  width={17.5}
                ></CheckIcon>
              </>
            ) : (
              <>
                <CopyIcon
                  aria-hidden="true"
                  height={20}
                  width={17.5}
                ></CopyIcon>
              </>
            )}
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
                <label htmlFor="length">Character Length</label>
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
              <p id="lengthError" className="error-message" aria-live="polite">
                {errors.lengthError}
              </p>
            </div>

            <div className="input-group">
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
              <p
                id="checkboxError"
                className="error-message"
                aria-live="polite"
              >
                {errors.checkboxError}
              </p>
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
                <ArrowIcon aria-hidden="true"></ArrowIcon>
              </button>
            </div>
          </form>
        </div>
      </main>
    </>
  );
}
