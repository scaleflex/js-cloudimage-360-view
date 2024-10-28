import { PROPS_REQUIRE_RELOAD } from '../constants';

export const hasConfigChanged = (originalConfig, newConfig, propsToCheck = PROPS_REQUIRE_RELOAD) => {
  return propsToCheck.some((prop) => {
    return prop in newConfig && newConfig[prop] !== originalConfig[prop];
  });
};
