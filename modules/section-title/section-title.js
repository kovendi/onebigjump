// Classic script (not a module) — see iphone-frame.js for why.
// window.sectionTitleModule.renderSectionTitle({ text, actionIcon, actionLabel, onActionClick }) -> HTMLElement
// actionIcon/actionLabel/onActionClick are optional — when provided, renders an icon button (e.g. an info button) at the right of the heading.

window.sectionTitleModule = (function () {
  function renderSectionTitle({ text, actionIcon, actionLabel, onActionClick } = {}) {
    const wrapper = document.createElement("div");
    wrapper.className = "section-title";

    const row = document.createElement("div");
    row.className = "section-title__row";

    const heading = document.createElement("h2");
    heading.className = "section-title__text";
    heading.textContent = text;
    row.appendChild(heading);

    if (actionIcon) {
      const actionButton = document.createElement("button");
      actionButton.type = "button";
      actionButton.className = "section-title__action";
      if (actionLabel) actionButton.setAttribute("aria-label", actionLabel);
      if (onActionClick) actionButton.addEventListener("click", onActionClick);

      const actionIconEl = document.createElement("img");
      actionIconEl.className = "section-title__action-icon";
      actionIconEl.src = actionIcon;
      actionIconEl.alt = "";
      actionButton.appendChild(actionIconEl);

      row.appendChild(actionButton);
    }

    wrapper.appendChild(row);

    const divider = document.createElement("hr");
    divider.className = "section-title__divider";
    wrapper.appendChild(divider);

    return wrapper;
  }

  return { renderSectionTitle };
})();
