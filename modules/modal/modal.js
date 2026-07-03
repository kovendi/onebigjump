// Classic script (not a module) — see iphone-frame.js for why.
// window.modalModule.openModal(contentEl) -> appends an overlay+card to document.body, returns close()
// window.modalModule.closeModal() -> closes the currently open modal, if any

window.modalModule = (function () {
  let activeOverlay = null;

  function closeModal() {
    if (activeOverlay) {
      activeOverlay.remove();
      activeOverlay = null;
    }
  }

  function openModal(contentEl) {
    closeModal();

    const overlay = document.createElement("div");
    overlay.className = "modal-overlay";
    overlay.addEventListener("click", (e) => {
      if (e.target === overlay) closeModal();
    });

    const card = document.createElement("div");
    card.className = "modal-card";

    const closeButton = document.createElement("button");
    closeButton.className = "modal-close";
    closeButton.type = "button";
    const closeIcon = document.createElement("img");
    closeIcon.src = "../../assets/icon-close.svg";
    closeIcon.alt = "";
    closeButton.appendChild(closeIcon);
    closeButton.addEventListener("click", closeModal);
    card.appendChild(closeButton);

    card.appendChild(contentEl);
    overlay.appendChild(card);
    document.body.appendChild(overlay);

    activeOverlay = overlay;
    return closeModal;
  }

  return { openModal, closeModal };
})();
