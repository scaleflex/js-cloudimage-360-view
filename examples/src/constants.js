import { GURKHA_SUV_HOTSPOTS_CONFIG } from './hotspots-config.constant';

const NIKE_PLUGIN = {
  "data-folder": "https://scaleflex.cloudimg.io/v7/demo/360-nike/",
  "data-filename-x": "nike-{index}.jpg",
  "data-filename-y": "nike-y-{index}.jpg",
  "data-amount-x": "35",
  "data-amount-y": "36",
  "data-autoplay-behavior": "spin-xy",
};
const EARBUDS_PLUGIN = {
  "data-folder": "https://scaleflex.cloudimg.io/v7/demo/earbuds/",
  "data-filename-x": "{index}.jpg",
  "data-amount-x": "233",
};

const SPIN_DIRECTION_PROPS = [
  'data-filename-y',
  'data-amount-y',
  'data-autoplay-behavior'
];

const PLUGIN_PROPS = {
  class: { value: "cloudimage-360", isRequired: true },
  "data-folder": {
    value: "https://scaleflex.cloudimg.io/v7/demo/earbuds/",
    isRequired: true,
    isUrl: true
  },
  "data-filename-x": { value: "{index}.jpg", isRequired: true },
  "data-amount-x": { value: 233, isRequired: true },
  "data-speed": { value: 100, isRequired: true },
  "data-drag-speed": { value: 100, isRequired: true },
  "data-autoplay": { isRequired: true }
};
const PROPERTIES_COLORS = {
  required: "#7B9200",
  url: "#2D88CB"
}
const REQUIRED_PROPERTIES = [
  "class",
  "data-folder",
  "data-filename-x",
  "data-amount-x",
  "data-filename-y",
  "data-amount-y",
  "data-drag-speed",
  "data-speed"
];

const URL_PROPERTIES = ["data-folder", "class"];

export {
  NIKE_PLUGIN,
  EARBUDS_PLUGIN,
  SPIN_DIRECTION_PROPS,
  PLUGIN_PROPS,
  PROPERTIES_COLORS,
  REQUIRED_PROPERTIES,
  URL_PROPERTIES,
  GURKHA_SUV_HOTSPOTS_CONFIG
}