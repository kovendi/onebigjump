// Classic script (not a module) — see iphone-frame.js for why.
// window.ticketCardModule.renderTicketCard({ imageUrl, eventName, ticketNumber, onQrClick }) -> HTMLElement

window.ticketCardModule = (function () {
  function renderTicketCard({ imageUrl, eventName, ticketNumber, used = false, onQrClick } = {}) {
    const card = document.createElement("div");
    card.className = "ticket-card";
    if (used) card.classList.add("ticket-card--used");
    card.style.backgroundImage = `linear-gradient(180deg, rgba(0, 0, 0, 0.05) 0%, rgba(0, 0, 0, 0.65) 100%), url("${imageUrl}")`;

    const body = document.createElement("div");
    body.className = "ticket-card__body";

    const name = document.createElement("div");
    name.className = "ticket-card__name";
    name.textContent = eventName;
    body.appendChild(name);

    const number = document.createElement("div");
    number.className = "ticket-card__number";
    number.textContent = window.i18n.t("wallet.ticket_number").replace("{number}", ticketNumber);
    body.appendChild(number);

    if (used) {
      const usedBadge = document.createElement("div");
      usedBadge.className = "ticket-card__used-label";
      usedBadge.textContent = window.i18n.t("wallet.ticket_used_label");
      body.appendChild(usedBadge);
    }

    card.appendChild(body);

    const qrButton = document.createElement("button");
    qrButton.type = "button";
    qrButton.className = "ticket-card__qr-button";
    qrButton.disabled = used;
    qrButton.setAttribute("aria-label", window.i18n.t("wallet.qr_action"));
    const qrIcon = document.createElement("img");
    qrIcon.className = "ticket-card__qr-icon";
    qrIcon.src = "../../assets/icon-qr.svg";
    qrIcon.alt = "";
    qrButton.appendChild(qrIcon);
    if (onQrClick && !used) qrButton.addEventListener("click", onQrClick);
    card.appendChild(qrButton);

    return card;
  }

  return { renderTicketCard };
})();
