// Classic script (not a module) — see iphone-frame.js for why.
// window.dropdownModule.renderDropdown({ name, id, label, placeholder, options, onChange }) -> HTMLElement
// options: [{ value, label }]

window.dropdownModule = (function () {
  function renderDropdown({ name, id, label, placeholder = "", options = [], onChange } = {}) {
    const wrapper = document.createElement("div");
    wrapper.className = "dropdown-field";

    const fieldId = id || name;

    if (label) {
      const labelEl = document.createElement("label");
      labelEl.className = "dropdown-field__label";
      labelEl.htmlFor = fieldId;
      labelEl.textContent = label;
      wrapper.appendChild(labelEl);
    }

    const control = document.createElement("div");
    control.className = "dropdown-field__control";

    const select = document.createElement("select");
    select.name = name;
    select.id = fieldId;
    select.className = "dropdown-field__select";

    if (placeholder) {
      const placeholderOption = document.createElement("option");
      placeholderOption.value = "";
      placeholderOption.textContent = placeholder;
      placeholderOption.disabled = true;
      placeholderOption.selected = true;
      select.appendChild(placeholderOption);
    }

    options.forEach(({ value, label: optionLabel }) => {
      const option = document.createElement("option");
      option.value = value;
      option.textContent = optionLabel;
      select.appendChild(option);
    });

    if (onChange) {
      select.addEventListener("change", () => onChange(select.value));
    }

    const icon = document.createElement("img");
    icon.className = "dropdown-field__icon";
    icon.src = "../../assets/icon-chevron-down.svg";
    icon.alt = "";

    control.appendChild(select);
    control.appendChild(icon);
    wrapper.appendChild(control);
    return wrapper;
  }

  return { renderDropdown };
})();
