import './controllers.css';
import CI360 from '../src';

import {
  EARBUDS_PLUGIN,
  GURKHA_SUV_HOTSPOTS_CONFIG,
  NIKE_PLUGIN,
  PLUGIN_PROPS,
  PROPERTIES_COLORS,
  URL_PROPERTIES,
} from './constants';

const spinDirections = document.getElementById('spin-directions');
const copyText = document.getElementById('copy-text');
const codeBlock = document.getElementById('code-block');
const codeWrapper = document.getElementById('code-wrapper');
const pointerZoomSelector = document.getElementById('pointer-zoom-selector');

const copyButton = document.querySelector('.code-section .copy-button');
const outputCode = document.querySelector('.output-code');
const pointerZoomCheckbox = document.getElementById('pointer-checkbox');
const pluginCheckboxOptions = document.querySelectorAll('.plugin-option');
const imageXAmountSelector = document.getElementById('x-images-selector');
const imageYSelector = document.getElementById('images-y');
const autoplaySpeed = document.getElementById('spin-speed');
const dragSpeed = document.getElementById('drag-speed');

const customStylingCheckbox = document.getElementById('custom-styling-checkbox');
const customStylingWrapper = document.getElementById('custom-styling-wrapper');
const customStylingTextarea = document.getElementById('custom-styling-textarea');

const folderPathOption = document.getElementById('folder-path-option');
const folderPathInput = document.getElementById('folder-path');
const filenamePatternInput = document.getElementById('filename-pattern');
const customImagesInput = document.getElementById('custom-images-input');
const nikeXImagesSelector = document.getElementById('nike-x-images');

const instance = new CI360();

function changeSpinDirectionHandler(event) {
  const spinDirection = event.target.value;
  const isYDirection = spinDirection === 'Y';
  const isCustom = spinDirection === 'custom';

  // Show/hide custom fields
  folderPathOption.style.display = isCustom ? 'block' : 'none';
  filenamePatternInput.disabled = !isCustom;

  // Show/hide appropriate image amount inputs
  imageXAmountSelector.style.display = (!isYDirection && !isCustom) ? 'block' : 'none';
  nikeXImagesSelector.style.display = isYDirection ? 'block' : 'none';
  customImagesInput.style.display = isCustom ? 'block' : 'none';

  // Show/hide Y-axis selector
  imageYSelector.style.display = isYDirection ? 'block' : 'none';

  if (isCustom) {
    // For custom, use current input values or defaults
    const folder = folderPathInput.value || '';
    const filename = filenamePatternInput.value || '{index}.jpg';
    const amountX = parseInt(customImagesInput.value, 10) || 36;

    if (folder) {
      const updatedView = instance.updateView('demo-generator', {
        folder,
        filenameX: filename,
        amountX,
        amountY: 0,
        filenameY: null,
      });
      updateCodeBlock(updatedView.viewerConfig);
    }
  } else {
    // Preset datasets
    const config = isYDirection ? NIKE_PLUGIN : EARBUDS_PLUGIN;
    const updatedView = instance.updateView('demo-generator', config);

    // Set the selector values
    if (isYDirection) {
      nikeXImagesSelector.value = 35;
    } else {
      imageXAmountSelector.value = 233;
    }

    // Update filename pattern display
    filenamePatternInput.value = isYDirection ? '{index}.jpg' : '{index}.jpg';

    updateCodeBlock(updatedView.viewerConfig);
  }
}

function changeCustomFolder(event) {
  const folder = event.target.value;
  const filename = filenamePatternInput.value || '{index}.jpg';
  const amountX = parseInt(customImagesInput.value, 10) || 36;

  if (folder) {
    const updatedView = instance.updateView('demo-generator', {
      folder,
      filenameX: filename,
      amountX,
    });
    updateCodeBlock(updatedView.viewerConfig);
  }
}

function changeFilenamePattern(event) {
  const filename = event.target.value;
  const folder = folderPathInput.value;

  if (folder && filename) {
    const updatedView = instance.updateView('demo-generator', {
      filenameX: filename,
    });
    updateCodeBlock(updatedView.viewerConfig);
  }
}

function changeCustomImageAmount(event) {
  const amountX = parseInt(event.target.value, 10);

  if (amountX > 0) {
    const updatedView = instance.updateView('demo-generator', { amountX });
    updateCodeBlock(updatedView.viewerConfig);
  }
}

function changeDragSpeed(event) {
  const { value } = event.target;
  const updatedView = instance.updateView('demo-generator', { dragSpeed: parseInt(value, 10) });

  updateCodeBlock(updatedView.viewerConfig);
}

function changeAutoplaySpeed(event) {
  const { value } = event.target;
  const updatedView = instance.updateView('demo-generator', { speed: parseInt(value, 10) });

  updateCodeBlock(updatedView.viewerConfig);
}

function copyCodeHandler() {
  navigator.clipboard.writeText(outputCode.innerText);

  copyText.innerHTML = 'Copied';

  setTimeout(() => {
    copyText.innerHTML = 'Copy';
  }, 500);
}

function changeImageXAmount(event) {
  const { value } = event.target;
  const updatedView = instance.updateView('demo-generator', { amountX: parseInt(value, 10) });

  updateCodeBlock(updatedView.viewerConfig);
}

function changePointerZoom(event) {
  const checked = event.target.checked;
  const value = parseFloat(pointerZoomSelector.value, 10);
  const updatedView = instance.updateView('demo-generator', { pointerZoom: checked ? value : false });
  pointerZoomSelector.disabled = !checked;

  updateCodeBlock(updatedView.viewerConfig);
}

function changePointerZoomSelector(event) {
  const { value } = event.target;

  const updatedView = instance.updateView('demo-generator', { pointerZoom: parseFloat(value, 10) });

  updateCodeBlock(updatedView.viewerConfig);
}

function pluginCheckboxOptionsHandler(event) {
  const checked = event.target.checked;
  const key = event.target.getAttribute('data-plugin-property');
  const pluginValue = event.target.getAttribute('data-plugin-value');

  let value = checked;
  if (pluginValue) {
    value = checked ? JSON.parse(pluginValue) : undefined;
  }

  const updatedView = instance.updateView('demo-generator', { [key]: value });

  updateCodeBlock(updatedView.viewerConfig);
}

function updateCodeBlock(config) {
  codeBlock.innerText = '';
  const configKeys = Object.keys(config);
  const keys = configKeys.filter((key) => PLUGIN_PROPS[key] && !!config[key]);

  keys.forEach((key) => {
    const { label } = PLUGIN_PROPS[key];
    const propertyWrapper = document.createElement('div');
    const propertyName = document.createElement('span');
    const propertyValue = document.createElement('span');

    propertyName.innerText = label;

    propertyName.style.color = PROPERTIES_COLORS.NAME;

    if (URL_PROPERTIES.includes(key)) {
      propertyValue.style.color = PROPERTIES_COLORS.URL;
    }

    propertyWrapper.appendChild(propertyName);

    propertyValue.innerText = `"${config[key]}"`;

    propertyWrapper.innerHTML += '=';
    propertyWrapper.appendChild(propertyValue);

    codeBlock.appendChild(propertyWrapper);
    codeWrapper.scrollTop = codeWrapper.scrollHeight;
  });
}

dragSpeed.addEventListener('change', changeDragSpeed);
autoplaySpeed.addEventListener('change', changeAutoplaySpeed);
pointerZoomCheckbox.addEventListener('change', changePointerZoom);
imageXAmountSelector.addEventListener('change', changeImageXAmount);
pointerZoomSelector.addEventListener('change', changePointerZoomSelector);
spinDirections.addEventListener('change', changeSpinDirectionHandler);
copyButton.addEventListener('click', copyCodeHandler);
folderPathInput.addEventListener('change', changeCustomFolder);
filenamePatternInput.addEventListener('change', changeFilenamePattern);
customImagesInput.addEventListener('change', changeCustomImageAmount);
nikeXImagesSelector.addEventListener('change', changeImageXAmount);
pluginCheckboxOptions.forEach((option) => {
  option.addEventListener('change', pluginCheckboxOptionsHandler);
});

const suvCarContainer = document.getElementById('gurkha-suv');

const config = {
  folder: 'https://scaleflex.cloudimg.io/v7/demo/suv-orange-car-360/',
  filenameX: 'orange-{index}.jpg',
  amountX: 73,
  lazyload: true,
  speed: 120,
  pointerZoom: 2,
  responsive: 'scaleflex',
  autoplay: true,
  fullscreen: true,
  magnifier: 3,
  playOnce: true,
  bottomCircle: false,
  hotspots: GURKHA_SUV_HOTSPOTS_CONFIG,
  inertia: true,
};

instance.init(suvCarContainer, config);

// Initialize demo-generator with event callbacks
const demoGeneratorContainer = document.getElementById('demo-generator');
const demoGeneratorConfig = {
  folder: 'https://scaleflex.cloudimg.io/v7/demo/earbuds/',
  filenameX: '{index}.jpg',
  amountX: 233,
  autoplay: true,
  speed: 100,
  pointerZoom: 1.5,
  dragSpeed: 100,
  bottomCircle: false,
  fullscreen: true,
  keys: true,
  responsive: 'scaleflex',
  lazyload: true,
  // Event callbacks
  onReady: (event) => {
    console.log('onReady:', event.viewerId);
  },
  onLoad: (event) => {
    console.log('onLoad:', `${event.imagesX} images loaded`);
  },
  onSpin: (event) => {
    console.log('onSpin:', `Frame ${event.activeImageX + 1}/${event.amountX}`, event.direction);
  },
  onAutoplayStart: (event) => {
    console.log('onAutoplayStart:', event.viewerId);
  },
  onAutoplayStop: (event) => {
    console.log('onAutoplayStop:', event.viewerId);
  },
  onFullscreenOpen: (event) => {
    console.log('onFullscreenOpen:', event.viewerId);
  },
  onFullscreenClose: (event) => {
    console.log('onFullscreenClose:', event.viewerId);
  },
  onZoomIn: (event) => {
    console.log('onZoomIn:', `zoom level ${event.zoomLevel}`);
  },
  onZoomOut: (event) => {
    console.log('onZoomOut:', event.viewerId);
  },
  onDragStart: (event) => {
    console.log('onDragStart:', event.viewerId);
  },
  onDragEnd: (event) => {
    console.log('onDragEnd:', event.viewerId);
  },
};

instance.init(demoGeneratorContainer, demoGeneratorConfig);

const demoGeneratorInstance = instance.getViewById('demo-generator');

updateCodeBlock(demoGeneratorInstance.viewerConfig);

// Custom styling functionality
let customStyleElement = null;
let cssDebounceTimer = null;

function toggleCustomStyling(event) {
  const isChecked = event.target.checked;
  customStylingWrapper.style.display = isChecked ? 'block' : 'none';

  if (isChecked) {
    // Apply CSS when enabling
    applyCustomCss();
  } else if (customStyleElement) {
    customStyleElement.remove();
    customStyleElement = null;
  }
}

function scopeCssToInstance(css, instanceId) {
  // Parse CSS and prefix each selector with the instance ID
  return css.replace(
    /([^\{\}]+)\{/g,
    (match, selectors) => {
      const scopedSelectors = selectors
        .split(',')
        .map((selector) => {
          const trimmed = selector.trim();
          if (!trimmed) return trimmed;
          // Handle selectors that already start with the instance
          if (trimmed.startsWith(`#${instanceId}`)) {
            return trimmed;
          }
          // Scope the selector to the instance
          return `#${instanceId} ${trimmed}`;
        })
        .join(', ');
      return `${scopedSelectors} {`;
    }
  );
}

function applyCustomCss() {
  const css = customStylingTextarea.value.trim();

  // Remove existing custom style if present
  if (customStyleElement) {
    customStyleElement.remove();
    customStyleElement = null;
  }

  if (!css) return;

  // Create scoped CSS
  const scopedCss = scopeCssToInstance(css, 'demo-generator');

  // Create and inject style element
  customStyleElement = document.createElement('style');
  customStyleElement.id = 'demo-generator-custom-styles';
  customStyleElement.textContent = scopedCss;
  document.head.appendChild(customStyleElement);
}

function handleCssInput() {
  // Only apply if custom styling is enabled
  if (!customStylingCheckbox.checked) return;

  // Debounce to avoid too frequent updates while typing
  clearTimeout(cssDebounceTimer);
  cssDebounceTimer = setTimeout(applyCustomCss, 150);
}

customStylingCheckbox.addEventListener('change', toggleCustomStyling);
customStylingTextarea.addEventListener('input', handleCssInput);

// Initialize all gallery examples with cloudimage-360 class
instance.initAll();
