let filters = {
  brightness: {
    value: 100,
    min: 0,
    max: 200,
    unit: "%",
  },
  contrast: {
    value: 100,
    min: 0,
    max: 200,
    unit: "%",
  },
  saturation: {
    value: 100,
    min: 0,
    max: 200,
    unit: "%",
  },
  hueRotation: {
    value: 0,
    min: 0,
    max: 360,
    unit: "deg",
  },
  blur: {
    value: 0,
    min: 0,
    max: 20,
    unit: "px",
  },
  grayscale: {
    value: 0,
    min: 0,
    max: 100,
    unit: "%",
  },
  sepia: {
    value: 0,
    min: 0,
    max: 100,
    unit: "%",
  },
  opacity: {
    value: 100,
    min: 0,
    max: 100,
    unit: "%",
  },
  invert: {
    value: 0,
    min: 0,
    max: 100,
    unit: "%",
  },
};

const imageCanvas = document.querySelector("#image-canvas");
const imgInput = document.querySelector("#image-input");
const canvasCtx = imageCanvas.getContext("2d");
const resetButton = document.querySelector("#reset-btn");
const downloadButton = document.querySelector("#download-btn");
const presetsContainer = document.querySelector(".presets");
let image = null;
const filtersContainer = document.querySelector(".filters");

function createFilterElement(name, unit = "%", value, min, max) {
  const div = document.createElement("div");
  div.classList.add("filter");

  const input = document.createElement("input");
  input.type = "range";
  input.min = min;
  input.max = max;
  input.value = value;
  input.id = name;
  const p = document.createElement("p");
  p.innerText = name;
  div.appendChild(p);
  div.appendChild(input);

  input.addEventListener("input", (event) => {
    filters[name].value = input.value;
    scheduleFilterUpdate();
  });

  return div;
}

function createFilters() {
  Object.keys(filters).forEach((key) => {
    const filterElement = createFilterElement(
      key,
      filters[key].unit,
      filters[key].value,
      filters[key].min,
      filters[key].max,
    );
    filtersContainer.appendChild(filterElement);
  });
}

createFilters();

imgInput.addEventListener("change", (event) => {
  const file = event.target.files[0];
  const imagePlaceHolder = document.querySelector(".placeholder");
  imagePlaceHolder.style.display = "none";
  imageCanvas.style.display = "block";
  const img = new Image();
  image = img;
  img.src = URL.createObjectURL(file);
  img.onload = () => {
    imageCanvas.width = img.width;
    imageCanvas.height = img.height;
    canvasCtx.drawImage(img, 0, 0);
  };
});

function applyFilters() {
  canvasCtx.clearRect(0, 0, imageCanvas.width, imageCanvas.height);

  canvasCtx.filter = `
        brightness(${filters.brightness.value}${filters.brightness.unit})
        hue-rotate(${filters.hueRotation.value}${filters.hueRotation.unit})
        contrast(${filters.contrast.value}${filters.contrast.unit})
        saturate(${filters.saturation.value}${filters.saturation.unit})
        blur(${filters.blur.value}${filters.blur.unit})
        grayscale(${filters.grayscale.value}${filters.grayscale.unit})
        sepia(${filters.sepia.value}${filters.sepia.unit})
        opacity(${filters.opacity.value}${filters.opacity.unit})
        invert(${filters.invert.value}${filters.invert.unit})`;
  canvasCtx.drawImage(image, 0, 0);
}

let animationFrameId = null;

function scheduleFilterUpdate() {
  if (animationFrameId) return;

  animationFrameId = requestAnimationFrame(() => {
    applyFilters();
    animationFrameId = null;
  });
}

resetButton.addEventListener("click", () => {
  filters = {
    brightness: {
      value: 100,
      min: 0,
      max: 200,
      unit: "%",
    },
    contrast: {
      value: 100,
      min: 0,
      max: 200,
      unit: "%",
    },
    saturation: {
      value: 100,
      min: 0,
      max: 200,
      unit: "%",
    },
    hueRotation: {
      value: 0,
      min: 0,
      max: 360,
      unit: "deg",
    },
    blur: {
      value: 0,
      min: 0,
      max: 20,
      unit: "px",
    },
    grayscale: {
      value: 0,
      min: 0,
      max: 100,
      unit: "%",
    },
    sepia: {
      value: 0,
      min: 0,
      max: 100,
      unit: "%",
    },
    opacity: {
      value: 100,
      min: 0,
      max: 100,
      unit: "%",
    },
    invert: {
      value: 0,
      min: 0,
      max: 100,
      unit: "%",
    },
  };
  applyFilters();

  filtersContainer.innerHTML = "";
  createFilters();
});

downloadButton.addEventListener("click", () => {
  const link = document.createElement("a");
  link.download = "edited-image.png";
  link.href = imageCanvas.toDataURL();
  link.click();
});

const presets = {
  Normal: {
    brightness: 100,
    contrast: 100,
    saturation: 100,
    hueRotation: 0,
    blur: 0,
    grayscale: 0,
    sepia: 0,
    opacity: 100,
    invert: 0,
  },

  Drama: {
    brightness: 90,
    contrast: 170,
    saturation: 120,
    hueRotation: 0,
    blur: 0,
    grayscale: 0,
    sepia: 10,
    opacity: 100,
    invert: 0,
  },

  Vintage: {
    brightness: 110,
    contrast: 90,
    saturation: 80,
    hueRotation: 350,
    blur: 0,
    grayscale: 15,
    sepia: 60,
    opacity: 100,
    invert: 0,
  },

  OldSchool: {
    brightness: 105,
    contrast: 85,
    saturation: 70,
    hueRotation: 10,
    blur: 0,
    grayscale: 25,
    sepia: 80,
    opacity: 100,
    invert: 0,
  },

  Noir: {
    brightness: 95,
    contrast: 180,
    saturation: 0,
    hueRotation: 0,
    blur: 0,
    grayscale: 100,
    sepia: 0,
    opacity: 100,
    invert: 0,
  },

  Cinematic: {
    brightness: 95,
    contrast: 135,
    saturation: 115,
    hueRotation: 340,
    blur: 0,
    grayscale: 5,
    sepia: 10,
    opacity: 100,
    invert: 0,
  },

  GoldenHour: {
    brightness: 115,
    contrast: 110,
    saturation: 140,
    hueRotation: 20,
    blur: 0,
    grayscale: 0,
    sepia: 25,
    opacity: 100,
    invert: 0,
  },

  Warm: {
    brightness: 110,
    contrast: 110,
    saturation: 130,
    hueRotation: 15,
    blur: 0,
    grayscale: 0,
    sepia: 20,
    opacity: 100,
    invert: 0,
  },

  Cool: {
    brightness: 105,
    contrast: 115,
    saturation: 110,
    hueRotation: 180,
    blur: 0,
    grayscale: 0,
    sepia: 0,
    opacity: 100,
    invert: 0,
  },

  Arctic: {
    brightness: 110,
    contrast: 130,
    saturation: 90,
    hueRotation: 200,
    blur: 0,
    grayscale: 0,
    sepia: 0,
    opacity: 100,
    invert: 0,
  },

  Sunset: {
    brightness: 115,
    contrast: 120,
    saturation: 150,
    hueRotation: 30,
    blur: 0,
    grayscale: 0,
    sepia: 30,
    opacity: 100,
    invert: 0,
  },

  Dreamy: {
    brightness: 120,
    contrast: 85,
    saturation: 120,
    hueRotation: 0,
    blur: 2,
    grayscale: 0,
    sepia: 10,
    opacity: 100,
    invert: 0,
  },

  SoftGlow: {
    brightness: 125,
    contrast: 90,
    saturation: 110,
    hueRotation: 0,
    blur: 1,
    grayscale: 0,
    sepia: 5,
    opacity: 100,
    invert: 0,
  },

  Faded: {
    brightness: 115,
    contrast: 70,
    saturation: 60,
    hueRotation: 0,
    blur: 0,
    grayscale: 20,
    sepia: 20,
    opacity: 90,
    invert: 0,
  },

  DustyFilm: {
    brightness: 105,
    contrast: 75,
    saturation: 70,
    hueRotation: 5,
    blur: 0,
    grayscale: 10,
    sepia: 35,
    opacity: 95,
    invert: 0,
  },

  Retro: {
    brightness: 115,
    contrast: 105,
    saturation: 140,
    hueRotation: 20,
    blur: 0,
    grayscale: 10,
    sepia: 50,
    opacity: 100,
    invert: 0,
  },

  RetroPop: {
    brightness: 120,
    contrast: 140,
    saturation: 180,
    hueRotation: 15,
    blur: 0,
    grayscale: 0,
    sepia: 20,
    opacity: 100,
    invert: 0,
  },

  Moody: {
    brightness: 80,
    contrast: 140,
    saturation: 90,
    hueRotation: 0,
    blur: 0,
    grayscale: 10,
    sepia: 20,
    opacity: 100,
    invert: 0,
  },

  DarkFade: {
    brightness: 75,
    contrast: 150,
    saturation: 70,
    hueRotation: 0,
    blur: 0,
    grayscale: 20,
    sepia: 15,
    opacity: 100,
    invert: 0,
  },

  Cyberpunk: {
    brightness: 110,
    contrast: 150,
    saturation: 190,
    hueRotation: 250,
    blur: 0,
    grayscale: 0,
    sepia: 0,
    opacity: 100,
    invert: 0,
  },

  Neon: {
    brightness: 120,
    contrast: 170,
    saturation: 200,
    hueRotation: 280,
    blur: 0,
    grayscale: 0,
    sepia: 0,
    opacity: 100,
    invert: 0,
  },

  Matrix: {
    brightness: 90,
    contrast: 150,
    saturation: 180,
    hueRotation: 90,
    blur: 0,
    grayscale: 20,
    sepia: 0,
    opacity: 100,
    invert: 0,
  },
  Forest: {
    brightness: 105,
    contrast: 120,
    saturation: 140,
    hueRotation: 80,
    blur: 0,
    grayscale: 0,
    sepia: 5,
    opacity: 100,
    invert: 0,
  },

  Ocean: {
    brightness: 105,
    contrast: 125,
    saturation: 130,
    hueRotation: 190,
    blur: 0,
    grayscale: 0,
    sepia: 0,
    opacity: 100,
    invert: 0,
  },

  PurpleHaze: {
    brightness: 110,
    contrast: 130,
    saturation: 160,
    hueRotation: 270,
    blur: 0,
    grayscale: 0,
    sepia: 0,
    opacity: 100,
    invert: 0,
  },

  SepiaClassic: {
    brightness: 105,
    contrast: 110,
    saturation: 80,
    hueRotation: 0,
    blur: 0,
    grayscale: 10,
    sepia: 100,
    opacity: 100,
    invert: 0,
  },

  BlackWhite: {
    brightness: 105,
    contrast: 130,
    saturation: 0,
    hueRotation: 0,
    blur: 0,
    grayscale: 100,
    sepia: 0,
    opacity: 100,
    invert: 0,
  },

  HighContrastBW: {
    brightness: 100,
    contrast: 200,
    saturation: 0,
    hueRotation: 0,
    blur: 0,
    grayscale: 100,
    sepia: 0,
    opacity: 100,
    invert: 0,
  },

  Sketch: {
    brightness: 130,
    contrast: 200,
    saturation: 0,
    hueRotation: 0,
    blur: 1,
    grayscale: 100,
    sepia: 0,
    opacity: 100,
    invert: 0,
  },
};

Object.keys(presets).forEach((presetName) => {
  const presetButton = document.createElement("button");
  presetButton.classList.add("btn");
  presetButton.innerText = presetName;
  presetsContainer.appendChild(presetButton);

  presetButton.addEventListener("click", () => {
    const preset = presets[presetName];
    Object.keys(preset).forEach((filterName) => {
      filters[filterName].value = preset[filterName];
    });
    applyFilters();
    filtersContainer.innerHTML = "";
    createFilters();
  });
});
