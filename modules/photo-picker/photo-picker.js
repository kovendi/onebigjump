// Classic script (not a module) — see iphone-frame.js for why.
// window.photoPickerModule.renderPhotoPicker({ name, id, onChange }) -> HTMLElement
// onChange(dataUrl) fires with a resized/compressed JPEG data URL when a photo is picked

window.photoPickerModule = (function () {
  var MAX_DIMENSION = 500;
  var JPEG_QUALITY = 0.75;

  function resizeImage(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const img = new Image();
        img.onload = () => {
          let { width, height } = img;
          if (width > height && width > MAX_DIMENSION) {
            height = Math.round((height * MAX_DIMENSION) / width);
            width = MAX_DIMENSION;
          } else if (height > MAX_DIMENSION) {
            width = Math.round((width * MAX_DIMENSION) / height);
            height = MAX_DIMENSION;
          }
          const canvas = document.createElement("canvas");
          canvas.width = width;
          canvas.height = height;
          canvas.getContext("2d").drawImage(img, 0, 0, width, height);
          resolve(canvas.toDataURL("image/jpeg", JPEG_QUALITY));
        };
        img.onerror = reject;
        img.src = reader.result;
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }

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

      resizeImage(file).then((dataUrl) => {
        circle.innerHTML = "";
        const preview = document.createElement("img");
        preview.className = "photo-picker__preview";
        preview.src = dataUrl;
        preview.alt = "";
        circle.appendChild(preview);

        if (onChange) onChange(dataUrl);
      });
    });

    wrapper.appendChild(circle);
    wrapper.appendChild(input);
    return wrapper;
  }

  return { renderPhotoPicker };
})();
