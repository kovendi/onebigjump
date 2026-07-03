// Classic script (not a module) — see iphone-frame.js for why.
// window.fileUploadModule.renderFileUpload({ name, id, label, buttonLabel, countLabel(count), onChange }) -> HTMLElement
// countLabel(count) -> string shown once files are selected; onChange(files) fires on selection

window.fileUploadModule = (function () {
  function renderFileUpload({ name, id, label, buttonLabel, countLabel, onChange } = {}) {
    const wrapper = document.createElement("div");
    wrapper.className = "file-upload";

    const fieldId = id || name;

    if (label) {
      const labelEl = document.createElement("label");
      labelEl.className = "file-upload__label";
      labelEl.htmlFor = fieldId;
      labelEl.textContent = label;
      wrapper.appendChild(labelEl);
    }

    const control = document.createElement("button");
    control.type = "button";
    control.className = "file-upload__control";

    const icon = document.createElement("img");
    icon.className = "file-upload__icon";
    icon.src = "../../assets/icon-upload.svg";
    icon.alt = "";

    const text = document.createElement("span");
    text.className = "file-upload__text";
    text.textContent = buttonLabel;

    control.appendChild(icon);
    control.appendChild(text);

    const input = document.createElement("input");
    input.type = "file";
    input.multiple = true;
    input.name = name;
    input.id = fieldId;
    input.className = "file-upload__input";

    control.addEventListener("click", () => input.click());

    input.addEventListener("change", () => {
      const count = input.files ? input.files.length : 0;
      text.textContent = count > 0 && countLabel ? countLabel(count) : buttonLabel;
      if (onChange) onChange(input.files);
    });

    wrapper.appendChild(control);
    wrapper.appendChild(input);
    return wrapper;
  }

  return { renderFileUpload };
})();
