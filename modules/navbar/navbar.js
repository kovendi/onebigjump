// Classic script (not a module) — see iphone-frame.js for why.
// window.navbarModule.renderNavbar({ title, onNotificationClick, hasNotification, showBack, onBackClick, showSearch, onSearchClick }) -> HTMLElement
// title: already-translated string (caller resolves via i18n.t())
// onNotificationClick: called when the bell icon is tapped; hasNotification: shows a red indicator dot on the bell
// showBack: shows a back arrow before the title instead of empty space; onBackClick: called when tapped (defaults to history.back())
// showSearch: shows a search icon to the left of the bell (per-page opt-in, off by default); onSearchClick: called when tapped
//
// window.navbarModule.renderSearchNavbar({ placeholder, onBackClick, onInput }) -> HTMLElement
// A back button plus a full-width text input, for dedicated search pages (see pages/search).
// placeholder: already-translated string; onBackClick: called when the back arrow is tapped (defaults to history.back())
// onInput: called with the input's current value on every keystroke

window.navbarModule = (function () {
  function renderNavbar({ title = "", onNotificationClick, hasNotification = false, showBack = false, onBackClick, showSearch = false, onSearchClick } = {}) {
    const navbar = document.createElement("div");
    navbar.className = "navbar";

    const titleWrap = document.createElement("div");
    titleWrap.className = "navbar__title-wrap";

    if (showBack) {
      const backButton = document.createElement("button");
      backButton.type = "button";
      backButton.className = "navbar__back-button";
      backButton.setAttribute("aria-label", "Back");
      backButton.innerHTML = `<img src="../../assets/icon-back.svg" alt="" class="navbar__back-icon">`;
      backButton.addEventListener("click", onBackClick || (() => window.history.back()));
      titleWrap.appendChild(backButton);
    }

    const titleEl = document.createElement("span");
    titleEl.className = "navbar__title";
    titleEl.textContent = title;
    titleWrap.appendChild(titleEl);

    const actions = document.createElement("div");
    actions.className = "navbar__actions";

    if (showSearch) {
      const searchButton = document.createElement("button");
      searchButton.type = "button";
      searchButton.className = "navbar__search-button";
      searchButton.setAttribute("aria-label", "Search");
      searchButton.innerHTML = `<img src="../../assets/icon-search.svg" alt="" class="navbar__search-icon">`;

      if (onSearchClick) {
        searchButton.addEventListener("click", onSearchClick);
      }

      actions.appendChild(searchButton);
    }

    const notificationButton = document.createElement("button");
    notificationButton.type = "button";
    notificationButton.className = "navbar__notification-button";
    notificationButton.setAttribute("aria-label", "Notifications");
    notificationButton.innerHTML = `<img src="../../assets/icon-bell.svg" alt="" class="navbar__notification-icon">`;

    if (hasNotification) {
      const indicator = document.createElement("span");
      indicator.className = "navbar__notification-indicator";
      notificationButton.appendChild(indicator);
    }

    if (onNotificationClick) {
      notificationButton.addEventListener("click", onNotificationClick);
    }

    actions.appendChild(notificationButton);

    navbar.appendChild(titleWrap);
    navbar.appendChild(actions);

    return navbar;
  }

  function renderSearchNavbar({ placeholder = "", onBackClick, onInput } = {}) {
    const navbar = document.createElement("div");
    navbar.className = "navbar";

    const backButton = document.createElement("button");
    backButton.type = "button";
    backButton.className = "navbar__back-button";
    backButton.setAttribute("aria-label", "Back");
    backButton.innerHTML = `<img src="../../assets/icon-back.svg" alt="" class="navbar__back-icon">`;
    backButton.addEventListener("click", onBackClick || (() => window.history.back()));
    navbar.appendChild(backButton);

    const input = document.createElement("input");
    input.type = "text";
    input.className = "navbar__search-input";
    input.placeholder = placeholder;
    input.autofocus = true;

    if (onInput) {
      input.addEventListener("input", () => onInput(input.value));
    }

    navbar.appendChild(input);

    return navbar;
  }

  return { renderNavbar, renderSearchNavbar };
})();
