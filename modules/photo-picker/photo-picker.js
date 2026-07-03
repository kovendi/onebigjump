// Classic script (not a module) — see iphone-frame.js for why.
// window.photoPickerModule.renderPhotoPicker({ name, id, onChange }) -> HTMLElement
// onChange(file) fires when a photo is picked

window.photoPickerModule = (function () {
  function renderPhotoPicker({ name, id, onChange } = {}) {
    const wrapper = document.createElement("div");
    wrapper.className = "photo-picker";

    const fieldId = id || name;

    const circle = document.createElement("button");
    circle.type = "button";
    circle.className = "photo-picker__circle";

    const icon = document.createElement("img");
    icon.className = "photo-picker__icon";
    icon.src = "../../assets/icon-photo.svg";
    icon.alt = "";
    circle.appendChild(icon);

    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.name = name;
    input.id = fieldId;
    input.className = "photo-picker__input";

    circle.addEventListener("click", () => input.click());

    input.addEventListener("change", () => {
      const file = input.files && input.files[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = () => {
        circle.innerHTML = "";
        const preview = document.createElement("img");
        preview.className = "photo-picker__preview";
        preview.src = reader.result;
        preview.alt = "";
        circle.appendChild(preview);
      };
      reader.readAsDataURL(file);

      if (onChange) onChange(file);
    });

    wrapper.appendChild(circle);
    wrapper.appendChild(input);
    return wrapper;
  }

  return { renderPhotoPicker };
})();
