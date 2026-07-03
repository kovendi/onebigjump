// Classic script (not a module) — see iphone-frame.js for why.
// window.buttonModule.renderButton({ label, variant, onClick, type, iconSrc }) -> HTMLElement
// variant: "primary" (accent CTA, filled) | "secondary" (text-only, primary color) | "text-accent" (text-only, accent color)

window.buttonModule = (function () {
  function renderButton({ label, variant = "primary", onClick, type = "button", iconSrc } = {}) {
    const button = document.createElement("button");
    button.type = type;
    button.className = `button button--${variant}`;

    if (iconSrc) {
      const icon = document.createElement("img");
      icon.className = "button__icon";
      icon.src = iconSrc;
      icon.alt = "";
      button.appendChild(icon);
    }

    const text = document.createElement("span");
    text.textContent = label;
    button.appendChild(text);

    if (onClick) {
      button.addEventListener("click", onClick);
    }

    return button;
  }

  return { renderButton };
})();
