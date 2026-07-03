// Classic script (not a module) — see iphone-frame.js for why.
// window.languageSwitcherModule.renderLanguageSwitcher() -> HTMLElement
// Reads/writes the current language via window.i18n. On change, reloads the
// page so all t()-rendered text picks up the new language.

window.languageSwitcherModule = (function () {
  const LANGUAGES = ["hu", "en", "ro"];

  function renderLanguageSwitcher() {
    const wrapper = document.createElement("div");
    wrapper.className = "language-switcher";

    const toggle = document.createElement("button");
    toggle.type = "button";
    toggle.className = "language-switcher__toggle";
    toggle.textContent = window.i18n.getLanguage().toUpperCase();
    wrapper.appendChild(toggle);

    const menu = document.createElement("div");
    menu.className = "language-switcher__menu";
    menu.hidden = true;

    LANGUAGES.forEach((code) => {
      const option = document.createElement("button");
      option.type = "button";
      option.className = "language-switcher__option";
      option.textContent = code.toUpperCase();
      if (code === window.i18n.getLanguage()) {
        option.classList.add("language-switcher__option--active");
      }
      option.addEventListener("click", () => {
        window.i18n.setLanguage(code);
        window.location.reload();
      });
      menu.appendChild(option);
    });
    wrapper.appendChild(menu);

    toggle.addEventListener("click", (e) => {
      e.stopPropagation();
      menu.hidden = !menu.hidden;
    });
    document.addEventListener("click", () => {
      menu.hidden = true;
    });

    return wrapper;
  }

  return { renderLanguageSwitcher };
})();
