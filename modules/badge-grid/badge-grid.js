// Classic script (not a module) — see iphone-frame.js for why.
// window.badgeGridModule.renderBadgeGrid({ badges: [{ id, label, icon, active, onClick }] }) -> HTMLElement
// `icon` is one of the keys returned by window.badgeGridModule.icons (paths into assets/).

window.badgeGridModule = (function () {
  const icons = {
    gdcBronze: "../../assets/icon-badge-gdc-bronze.svg",
    gdcSilver: "../../assets/icon-badge-gdc-silver.svg",
    gdcGold: "../../assets/icon-badge-gdc-gold.svg",
    festivalVisitor: "../../assets/icon-badge-festival-visitor.svg",
    healthChecked: "../../assets/icon-badge-health-checked.svg",
    founder: "../../assets/icon-badge-founder.svg",
    responsibleOwner: "../../assets/icon-badge-responsible-owner.svg",
    eventEnthusiast: "../../assets/icon-badge-event-enthusiast.svg",
    proudTrainer: "../../assets/icon-badge-proud-trainer.svg"
  };

  function renderBadgeGrid({ badges = [] } = {}) {
    const grid = document.createElement("div");
    grid.className = "badge-grid";

    badges.forEach(({ id, label, icon, active, onClick } = {}) => {
      const item = onClick ? document.createElement("button") : document.createElement("div");
      if (onClick) item.type = "button";
      item.className = `badge-grid__item${active ? "" : " badge-grid__item--inactive"}`;
      if (id) item.dataset.badgeId = id;

      const iconEl = document.createElement("img");
      iconEl.className = "badge-grid__icon";
      iconEl.src = icons[icon] || "";
      iconEl.alt = "";
      item.appendChild(iconEl);

      const labelEl = document.createElement("span");
      labelEl.className = "badge-grid__label";
      labelEl.textContent = label;
      item.appendChild(labelEl);

      if (onClick) item.addEventListener("click", onClick);

      grid.appendChild(item);
    });

    return grid;
  }

  return { renderBadgeGrid, icons };
})();
