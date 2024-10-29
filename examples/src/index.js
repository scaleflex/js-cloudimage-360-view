import '../../src';
import './controllers.css';
import './styles/main.css';
import CI360 from '../../src/ci360';
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

const copyButton = document.querySelector('.copy-button');
const outputCode = document.querySelector('.output-code');
const pointerZoomCheckbox = document.getElementById('pointer-checkbox');
const pluginCheckboxOptions = document.querySelectorAll('.plugin-option');
const imageXAmountSelector = document.getElementById('x-images-selector');
const imageYSelector = document.getElementById('images-y');
const autoplaySpeed = document.getElementById('spin-speed');
const dragSpeed = document.getElementById('drag-speed');
const instance = new CI360();

function changeSpinDirectionHandler(event) {
  const spinDirection = event.target.value;
  const isYDirection = spinDirection === 'Y';
  const config = isYDirection ? NIKE_PLUGIN : EARBUDS_PLUGIN;
  const updatedView = instance.updateView('demo-generator', config);

  imageXAmountSelector.value = isYDirection ? 35 : 233;
  imageYSelector.style.display = isYDirection ? 'block' : 'none';

  updateCodeBlock(updatedView.viewerConfig);
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
  hotspots: GURKHA_SUV_HOTSPOTS_CONFIG,
};

instance.init(suvCarContainer, config);
instance.initAll();

const demoGeneratorInstance = instance.getViewById('demo-generator');

updateCodeBlock(demoGeneratorInstance.viewerConfig);
