// Classic script (not a module) — see iphone-frame.js for why.
// window.dogCardModule.renderDogCard({ photo, name, breed, birthdate, microchip, goodDogCard, onProfileClick, onClick }) -> HTMLElement
// Depends on window.modalModule, window.buttonModule and window.dateModule — load modules/modal/modal.js, modules/button/button.js (and their CSS) and modules/date/date.js before this script.

window.dogCardModule = (function () {
  function openGoodDogCardModal() {
    const content = document.createElement("div");
    content.className = "dog-card__qr-modal";

    const title = document.createElement("div");
    title.className = "dog-card__qr-title";
    title.textContent = window.i18n.t("dog_card.qr_modal_title");
    content.appendChild(title);

    const qr = document.createElement("img");
    qr.className = "dog-card__qr-image";
    qr.src = "../../assets/qr-placeholder.svg";
    qr.alt = "";
    content.appendChild(qr);

    const description = document.createElement("p");
    description.className = "dog-card__qr-description";
    description.textContent = window.i18n.t("dog_card.qr_modal_description");
    content.appendChild(description);

    window.modalModule.openModal(content);
  }

  function calculateAge(birthdate) {
    const birth = window.dateModule.parseToDate(birthdate);
    if (!birth) return null;
    const today = new Date();
    if (today < birth) return null;

    let years = today.getFullYear() - birth.getFullYear();
    const hasHadBirthdayThisYear =
      today.getMonth() > birth.getMonth() ||
      (today.getMonth() === birth.getMonth() && today.getDate() >= birth.getDate());
    if (!hasHadBirthdayThisYear) years -= 1;

    if (years >= 1) return { unit: "years", count: years };

    let months = (today.getFullYear() - birth.getFullYear()) * 12 + (today.getMonth() - birth.getMonth());
    if (today.getDate() < birth.getDate()) months -= 1;

    if (months >= 1) return { unit: "months", count: months };

    const msPerDay = 24 * 60 * 60 * 1000;
    const days = Math.floor((today - birth) / msPerDay);
    return { unit: "days", count: days };
  }

  function renderMetaRow(iconSrc, text) {
    const row = document.createElement("div");
    row.className = "dog-card__meta-row";
    const wrap = document.createElement("span");
    wrap.className = "dog-card__meta-icon-wrap";
    const icon = document.createElement("img");
    icon.className = "dog-card__meta-icon";
    icon.src = iconSrc;
    icon.alt = "";
    wrap.appendChild(icon);
    row.appendChild(wrap);
    const value = document.createElement("span");
    value.textContent = text;
    row.appendChild(value);
    return row;
  }

  function renderDogCard({ photo, name, breed, birthdate, microchip, goodDogCard, onProfileClick, onClick } = {}) {
    const card = document.createElement("div");
    card.className = "dog-card";
    if (onClick) {
      card.classList.add("dog-card--clickable");
      card.addEventListener("click", onClick);
    }

    const top = document.createElement("div");
    top.className = "dog-card__top";

    const photoCol = document.createElement("div");
    photoCol.className = "dog-card__photo-col";

    const photoEl = document.createElement("img");
    photoEl.className = "dog-card__photo";
    photoEl.src = photo || "../../assets/icon-dogs.svg";
    photoEl.alt = "";
    photoCol.appendChild(photoEl);

    if (goodDogCard) {
      const badge = document.createElement("button");
      badge.type = "button";
      badge.className = "dog-card__badge";
      const badgeIcon = document.createElement("img");
      badgeIcon.className = "dog-card__badge-icon";
      badgeIcon.src = "../../assets/icon-badge-good-dog.svg";
      badgeIcon.alt = "";
      badge.appendChild(badgeIcon);
      badge.appendChild(document.createTextNode(window.i18n.t("dog_card.good_dog_badge")));
      badge.addEventListener("click", (e) => {
        e.stopPropagation();
        window.location.href = "../good-dog-card/good-dog-card.html";
      });
      photoCol.appendChild(badge);
    }

    top.appendChild(photoCol);

    const info = document.createElement("div");
    info.className = "dog-card__info";

    const header = document.createElement("div");
    header.className = "dog-card__header";

    const nameEl = document.createElement("div");
    nameEl.className = "dog-card__name";
    nameEl.textContent = name;
    header.appendChild(nameEl);

    if (breed) {
      const breedEl = document.createElement("span");
      breedEl.className = "dog-card__breed";
      breedEl.textContent = breed;
      header.appendChild(breedEl);
    }

    info.appendChild(header);

    const meta = document.createElement("div");
    meta.className = "dog-card__meta";
    if (birthdate) {
      const age = calculateAge(birthdate);
      const formattedBirthdate = window.dateModule.formatDate(birthdate);
      const birthdateText = age !== null
        ? `${formattedBirthdate} (${window.i18n.t(`dog_card.age_${age.unit}`).replace("{count}", age.count)})`
        : formattedBirthdate;
      meta.appendChild(renderMetaRow("../../assets/icon-calendar.svg", birthdateText));
    }
    if (microchip) meta.appendChild(renderMetaRow("../../assets/icon-microchip.svg", `${window.i18n.t("dog_card.microchip_label")} ${microchip}`));
    info.appendChild(meta);

    top.appendChild(info);
    card.appendChild(top);

    const actions = document.createElement("div");
    actions.className = "dog-card__actions";
    if (!goodDogCard) actions.classList.add("dog-card__actions--single");

    const profileButton = window.buttonModule.renderButton({
      label: window.i18n.t("dog_card.profile_action"),
      variant: "text-accent",
      iconSrc: "../../assets/icon-paw-accent.svg",
      onClick: (e) => {
        if (e) e.stopPropagation();
        if (onProfileClick) onProfileClick();
      }
    });
    actions.appendChild(profileButton);

    if (goodDogCard) {
      const qrButton = window.buttonModule.renderButton({
        label: window.i18n.t("dog_card.qr_action"),
        variant: "secondary",
        iconSrc: "../../assets/icon-qr.svg",
        onClick: (e) => {
          if (e) e.stopPropagation();
          openGoodDogCardModal();
        }
      });
      actions.appendChild(qrButton);
    }

    card.appendChild(actions);

    return card;
  }

  return { renderDogCard };
})();
