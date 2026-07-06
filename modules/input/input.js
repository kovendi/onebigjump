// Classic script (not a module) — see iphone-frame.js for why.
// window.inputModule.renderInput({ type, name, placeholder, id, label }) -> HTMLElement

window.inputModule = (function () {
  function renderInput({ type = "text", name, placeholder = "", id, label, required = false } = {}) {
    const wrapper = document.createElement("div");
    wrapper.className = "input-field";

    const inputId = id || name;

    if (label) {
      const labelEl = document.createElement("label");
      labelEl.className = "input-field__label";
      labelEl.htmlFor = inputId;
      labelEl.textContent = label;
      wrapper.appendChild(labelEl);
    }

    const input = document.createElement("input");
    input.type = type;
    input.name = name;
    input.id = inputId;
    input.placeholder = placeholder;
    input.autocomplete = "off";
    input.className = "input-field__control";
    if (required) {
      input.required = true;
    }

    wrapper.appendChild(input);
    return wrapper;
  }

  return { renderInput };
})();
