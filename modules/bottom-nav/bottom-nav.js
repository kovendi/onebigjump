// Classic script (not a module) — see iphone-frame.js for why.
// window.bottomNavModule.renderBottomNav({ active, onNavigate }) -> HTMLElement
// active: one of 'events' | 'dogs' | 'wallet' | 'members' | 'profile'
// onNavigate: optional, called with the item id when a nav item is tapped instead of the item's default `href`

window.bottomNavModule = (function () {
  const t = window.i18n.t;

  // href is relative to a page living at pages/<name>/<name>.html (one level under pages/)
  const ITEMS = [
    { id: "events", labelKey: "nav.events", icon: "icon-nav-events", href: "../events/events.html" },
    { id: "dogs", labelKey: "nav.dogs", icon: "icon-nav-dogs", href: "../dogs/dogs.html" },
    { id: "wallet", labelKey: "nav.wallet", icon: "icon-nav-wallet", elevated: true, href: "../wallet/wallet.html" },
    { id: "members", labelKey: "nav.members", icon: "icon-nav-members", href: null },
    { id: "profile", labelKey: "nav.profile", icon: "icon-nav-profile", href: null },
  ];

  function renderBottomNav({ active, onNavigate } = {}) {
    const nav = document.createElement("nav");
    nav.className = "bottom-nav";

    ITEMS.forEach((item) => {
      const isActive = item.id === active;

      const button = document.createElement("button");
      button.type = "button";
      button.className =
        "bottom-nav__item" +
        (isActive ? " bottom-nav__item--active" : "") +
        (item.elevated ? " bottom-nav__item--elevated" : "");

      const iconFile = item.elevated || isActive ? `${item.icon}-active` : item.icon;
      const icon = document.createElement("img");
      icon.className = "bottom-nav__icon";
      icon.src = `../../assets/${iconFile}.svg`;
      icon.alt = "";

      const label = document.createElement("span");
      label.className = "bottom-nav__label";
      label.textContent = t(item.labelKey);

      button.appendChild(icon);
      button.appendChild(label);

      if (!isActive) {
        button.addEventListener("click", () => {
          if (onNavigate) {
            onNavigate(item.id);
          } else if (item.href) {
            window.location.href = item.href;
          }
        });
      }

      nav.appendChild(button);
    });

    return nav;
  }

  return { renderBottomNav };
})();
