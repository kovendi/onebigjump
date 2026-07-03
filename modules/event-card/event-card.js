// Classic script (not a module) — see iphone-frame.js for why.
// window.eventCardModule.renderEventCard({ eventId, imageUrl, name, startDate, endDate, location, followers, isExam, isPaid }) -> HTMLElement
// Depends on window.buttonModule and window.dateModule — load modules/button/button.js (and its CSS) and modules/date/date.js before this script.

window.eventCardModule = (function () {
  function renderMetaRow(iconSrc, text) {
    const row = document.createElement("div");
    row.className = "event-card__meta-row";
    const wrap = document.createElement("span");
    wrap.className = "event-card__meta-icon-wrap";
    const icon = document.createElement("img");
    icon.className = "event-card__meta-icon";
    icon.src = iconSrc;
    icon.alt = "";
    wrap.appendChild(icon);
    row.appendChild(wrap);
    const value = document.createElement("span");
    value.textContent = text;
    row.appendChild(value);
    return row;
  }

  function renderEventCard({ eventId, imageUrl, name, startDate, endDate, location, followers = 0, isExam = false, isPaid = false } = {}) {
    const card = document.createElement("div");
    card.className = "event-card";

    const image = document.createElement("img");
    image.className = "event-card__image";
    image.src = imageUrl;
    image.alt = "";
    card.appendChild(image);

    if (isExam) {
      const badge = document.createElement("div");
      badge.className = "event-card__badge event-card__badge--exam";
      badge.textContent = window.i18n.t("event_card.exam_badge");
      card.appendChild(badge);
    }

    if (isPaid) {
      const paidBadge = document.createElement("div");
      paidBadge.className = "event-card__badge event-card__badge--paid";
      paidBadge.textContent = window.i18n.t("event_card.paid_badge");
      card.appendChild(paidBadge);
    }

    const title = document.createElement("div");
    title.className = "event-card__name";
    title.textContent = name;
    card.appendChild(title);

    const meta = document.createElement("div");
    meta.className = "event-card__meta";
    meta.appendChild(renderMetaRow("../../assets/icon-calendar.svg", window.dateModule.formatDateRange(startDate, endDate)));
    meta.appendChild(renderMetaRow("../../assets/icon-location.svg", location));
    meta.appendChild(renderMetaRow("../../assets/icon-users.svg", `${followers} ${window.i18n.t("event_card.followers_label")}`));
    card.appendChild(meta);

    const actions = document.createElement("div");
    actions.className = "event-card__actions";

    let isFollowing = false;
    const followButton = window.buttonModule.renderButton({
      label: window.i18n.t("event_card.follow_action"),
      variant: "text-accent",
      iconSrc: "../../assets/icon-heart-outline.svg",
      onClick: () => {
        isFollowing = !isFollowing;
        followButton.querySelector("span").textContent = window.i18n.t(isFollowing ? "event_card.unfollow_action" : "event_card.follow_action");
        followButton.querySelector("img").src = isFollowing ? "../../assets/icon-heart-accent.svg" : "../../assets/icon-heart-outline.svg";
      }
    });
    actions.appendChild(followButton);

    actions.appendChild(window.buttonModule.renderButton({
      label: window.i18n.t("event_detail.buy_ticket_action"),
      variant: "secondary",
      iconSrc: "../../assets/icon-ticket-primary.svg",
      onClick: () => { window.location.href = `../ticket-purchase/ticket-purchase.html?id=${eventId}`; }
    }));

    card.appendChild(actions);

    return card;
  }

  return { renderEventCard };
})();
