import '../../src';
import './controllers.css';
import './styles/main.css';

import {
  EARBUDS_PLUGIN,
  NIKE_PLUGIN,
  PLUGIN_PROPS,
  PROPERTIES_COLORS,
  URL_PROPERTIES,
  GURKHA_SUV_HOTSPOTS_CONFIG,
} from "./constants";

const spinDirections = document.getElementById("spin-directions");
const imagesY = document.getElementById("images-y");
const responsive = document.getElementById("responsive-checkbox");
const boxShadow = document.getElementById("box-shadow");
const imageXSelector = document.getElementById("x-images-selector");
const nikeXSelector = document.getElementById("nike-x-images");
const copyText = document.getElementById("copy-text");
const codeBlock = document.getElementById("code-block");
const codeWrapper = document.getElementById("code-wrapper");
const controlOption = document.getElementById("control-option");
const autoPlayBehavior = document.getElementById("auto-play-behavior");
let container = document.getElementById("demo-generator");

const copyButton = document.querySelector(".copy-button");
const outputCode = document.querySelector(".output-code");
const pointerZoomCheckbox = document.querySelector("[data-checkbox]");

const accordions = document.querySelectorAll("[data-accordion]");
const pluginCheckboxOptions = document.querySelectorAll(".plugin-option");
const pluginInputs = document.querySelectorAll("[plugin-input]");
let controlButtons = Array.from(document.querySelectorAll("control-buttons"));

let isSpinY = false;

const CLOUDIMAGE_360 = window.CI360;

function updateContainer() {
  container = document.getElementById("demo-generator");
}

function updateControlButtons() {
  controlButtons = Array.from(document.querySelectorAll(".control-buttons"));
}

function toggleControlButtons() {
  const yButtonsIds = ["control-up-button", "control-down-button"];

  controlButtons.forEach((button) => {
    if (isSpinY) {
      button.style.visibility = controlOption.checked ? "visible" : "hidden";
    } else {
      button.style.visibility = "hidden";

      button.style.visibility =
        controlOption.checked && !yButtonsIds.includes(button.id) ? "visible" : "hidden";
    }
  });
}

function changeSpinDirectionHandler(event) {
  const spinDirection = event.target.value;
  const earbudsPlugin = Object.entries(EARBUDS_PLUGIN);
  const nikePlugin = Object.entries(NIKE_PLUGIN);
  const isSpinYDirection = spinDirection === "Y";

  nikePlugin.forEach(([key, value]) => {
    updatePluginValues(key, { value }, null, !isSpinYDirection);
    isSpinYDirection ?
      container.setAttribute(key, value) :
      container.removeAttribute(key);
  });

  if (isSpinYDirection) {
    isSpinY = true;

    imageXSelector.style.display = "none";
    nikeXSelector.style.display = "block";
    imagesY.style.display = "flex";
  } else {
    isSpinY = false;

    earbudsPlugin.forEach(([key, value]) => {
      container.setAttribute(key, value);
      updatePluginValues(key, { value });
    });

    imageXSelector.style.display = "block";
    nikeXSelector.style.display = "none";
    imagesY.style.display = "none";
  }

  autoPlayBehavior.disabled = !autoPlayBehavior.disabled

  CLOUDIMAGE_360.update("demo-generator");
  updateContainer();
  updateControlButtons();
  toggleControlButtons();
}

function changePointerZoomHandler(event) {
  const ispluginCheckboxChecked = event.target.checked;
  const nextCheckbox = event.target.getAttribute("data-checkbox");
  const pluginInput = document.querySelector(`[data-input=${nextCheckbox}]`);
  const pluginAttribute = event.target.getAttribute("data-plugin-value");
  const value = pluginInput[pluginInput.type === "checkbox" ? "checked" : "value"];

  if (ispluginCheckboxChecked) {
    container.setAttribute(pluginAttribute, value);
  } else  {
    container.removeAttribute(pluginAttribute);
  }

  pluginInput.disabled=!pluginInput.disabled

  CLOUDIMAGE_360.update("demo-generator");
  updateContainer();

  updatePluginValues(
    pluginAttribute,
    { value: value },
    event.target.type,
  );
}

function changeResponsiveOptionHandler(event) {
  const allPluginInput = document.querySelectorAll("[responsive-option]");
  const ispluginCheckboxChecked = event.target.checked;

  allPluginInput.forEach((input) => {
    const pluginAttribute = input.getAttribute("data-plugin-value");
    if (ispluginCheckboxChecked) {
      container.setAttribute(pluginAttribute, input.value);

      updatePluginValues(
        pluginAttribute,
        { value: input.value },
        event.target.type,
      );
    } else {
      container.removeAttribute(pluginAttribute);
      updatePluginValues(pluginAttribute, { value: "" }, event.target.type);
    }

    input.disabled=!input.disabled
  });

  CLOUDIMAGE_360.update("demo-generator", true);
  updateContainer();
}

function changeBoxShadowOptionHandler(event) {
  const shadowBoxInput = document.querySelector("[box-shadow-option]");
  const ispluginCheckboxChecked = event.target.checked;
  const pluginAttribute = shadowBoxInput.getAttribute("data-plugin-value");

    if (ispluginCheckboxChecked) {
      container.setAttribute(pluginAttribute, shadowBoxInput.value);

      updatePluginValues(
        pluginAttribute,
        { value: shadowBoxInput.value },
        event.target.type,
      );
    } else {
      container.removeAttribute(pluginAttribute);
      updatePluginValues(pluginAttribute, { value: "" }, event.target.type);
    }

    shadowBoxInput.disabled=!shadowBoxInput.disabled

  CLOUDIMAGE_360.update("demo-generator", true);
  updateContainer();
}

function showAccordionContent(event) {
  const contentID = event.target.getAttribute("data-accordion");
  const accordionContent = (
    document.querySelector(`[data-accordion-content="${contentID}"]`)
  );

  accordionContent.style.display = !accordionContent.offsetWidth ? "block": "none";
}

function copyCodeHandler() {
  navigator.clipboard.writeText(outputCode.innerText);

  copyText.innerHTML = "Copied";

  setTimeout(() => {
    copyText.innerHTML = "Copy";
  }, 500);
}

function pluginCheckboxOptionsHandler(event) {
  const ispluginCheckboxChecked = event.target.checked;
  const pluginAttribute = event.target.getAttribute("data-plugin-value");
  const defaultValue = event.target.value
  const value = defaultValue === "on" ? "" : defaultValue

  if (ispluginCheckboxChecked) {
    container.setAttribute(pluginAttribute, value);
  } else {
    container.removeAttribute(pluginAttribute);
  }

  CLOUDIMAGE_360.update("demo-generator");
  updateContainer();
  updatePluginValues(pluginAttribute, { value: value }, event.target.type);
}

function changePluginInputsHandler(event) {
  const value = event.target.value;
  const pluginAttribute = event.target.getAttribute("data-plugin-value");

  if (value) {
    container.setAttribute(pluginAttribute, value);
  } else {
    container.removeAttribute(pluginAttribute);
  }

  CLOUDIMAGE_360.update("demo-generator");
  updateContainer();
  updatePluginValues(pluginAttribute, { value }, event.target.type);
}

function updatePluginValues(key, properties = {}, inputType, removeProp) {
  const isCheckbox = inputType === "checkbox";
  const isEmptyInput = !isCheckbox && !properties.value;

  if (
    Object.keys(PLUGIN_PROPS).includes(key)
    && (isCheckbox || isEmptyInput || removeProp)
  ) {
    delete PLUGIN_PROPS[key];
  } else if (key) {
    PLUGIN_PROPS[key] = {};
    PLUGIN_PROPS[key].value = properties.value;
  }

  updateCodeBlock();
}

function updateCodeBlock() {
  codeBlock.innerText = "";

  Object.entries(PLUGIN_PROPS).forEach(([key, properties]) => {
    const propertyWrapper = document.createElement("div");
    const propertyName = document.createElement("span");
    const propertyValue = document.createElement("span");

    propertyName.innerText = key;

    propertyName.style.color = PROPERTIES_COLORS.NAME;

    if (URL_PROPERTIES.includes(key)) {
      propertyValue.style.color = PROPERTIES_COLORS.URL;
    }

    propertyWrapper.appendChild(propertyName);

    if (properties?.value) {
      propertyValue.innerText = `"${properties?.value}"`;

      propertyWrapper.innerHTML += "=";
      propertyWrapper.appendChild(propertyValue);
    }

    codeBlock.appendChild(propertyWrapper);
    codeWrapper.scrollTop = codeWrapper.scrollHeight;
  });
}

updatePluginValues();
window.CI360.addHotspots("gurkha-suv", GURKHA_SUV_HOTSPOTS_CONFIG);

spinDirections.addEventListener("change", changeSpinDirectionHandler);
copyButton.addEventListener("click", copyCodeHandler);
controlOption.addEventListener("change", toggleControlButtons);
responsive.addEventListener("change", changeResponsiveOptionHandler);
boxShadow.addEventListener("change", changeBoxShadowOptionHandler);
pointerZoomCheckbox.addEventListener("change", changePointerZoomHandler);
accordions.forEach((accordion) => {
  accordion.addEventListener("click", showAccordionContent)
});
pluginCheckboxOptions.forEach((option) => {
  option.addEventListener("change", pluginCheckboxOptionsHandler)
});
pluginInputs.forEach((input) => {
  input.addEventListener("change", changePluginInputsHandler)
});