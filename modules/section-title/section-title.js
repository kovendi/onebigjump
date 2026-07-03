// Classic script (not a module) — see iphone-frame.js for why.
// window.sectionTitleModule.renderSectionTitle({ text }) -> HTMLElement

window.sectionTitleModule = (function () {
  function renderSectionTitle({ text } = {}) {
    const wrapper = document.createElement("div");
    wrapper.className = "section-title";

    const heading = document.createElement("h2");
    heading.className = "section-title__text";
    heading.textContent = text;
    wrapper.appendChild(heading);

    const divider = document.createElement("hr");
    divider.className = "section-title__divider";
    wrapper.appendChild(divider);

    return wrapper;
  }

  return { renderSectionTitle };
})();
