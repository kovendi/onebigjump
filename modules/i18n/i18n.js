// Classic script (not a module) — file:// pages block ES module imports and fetch,
// so translations are loaded via <script> tags into window.LOCALES beforehand.
// A page must include locales/hu.js, locales/en.js, locales/ro.js before this file.
window.i18n = (function () {
  const SUPPORTED_LANGUAGES = ["hu", "en", "ro"];
  const DEFAULT_LANGUAGE = "hu";
  const STORAGE_KEY = "obj_language";

  function getLanguage() {
    return localStorage.getItem(STORAGE_KEY) || DEFAULT_LANGUAGE;
  }

  function setLanguage(code) {
    if (!SUPPORTED_LANGUAGES.includes(code)) {
      throw new Error(`Unsupported language: ${code}`);
    }
    localStorage.setItem(STORAGE_KEY, code);
  }

  function initI18n() {
    setLanguage(getLanguage());
  }

  function t(key) {
    const translations = window.LOCALES[getLanguage()] || {};
    return translations[key] ?? key;
  }

  return { initI18n, t, setLanguage, getLanguage };
})();
