// Classic script (not a module) — see iphone-frame.js for why.
// window.leaderboardBannerModule.renderLeaderboardBanner({ title, subtitle, onClick }) -> HTMLElement

window.leaderboardBannerModule = (function () {
  function renderLeaderboardBanner({ title, subtitle, onClick } = {}) {
    const banner = document.createElement("button");
    banner.type = "button";
    banner.className = "leaderboard-banner";

    const iconWrap = document.createElement("span");
    iconWrap.className = "leaderboard-banner__icon-wrap";
    const icon = document.createElement("img");
    icon.className = "leaderboard-banner__icon";
    icon.src = "../../assets/icon-nav-leaderboard.svg";
    icon.alt = "";
    iconWrap.appendChild(icon);
    banner.appendChild(iconWrap);

    const text = document.createElement("span");
    text.className = "leaderboard-banner__text";

    const titleEl = document.createElement("span");
    titleEl.className = "leaderboard-banner__title";
    titleEl.textContent = title;
    text.appendChild(titleEl);

    if (subtitle) {
      const subtitleEl = document.createElement("span");
      subtitleEl.className = "leaderboard-banner__subtitle";
      subtitleEl.textContent = subtitle;
      text.appendChild(subtitleEl);
    }

    banner.appendChild(text);

    const arrow = document.createElement("span");
    arrow.className = "leaderboard-banner__arrow";
    arrow.textContent = "›";
    banner.appendChild(arrow);

    if (onClick) {
      banner.addEventListener("click", onClick);
    }

    return banner;
  }

  return { renderLeaderboardBanner };
})();
