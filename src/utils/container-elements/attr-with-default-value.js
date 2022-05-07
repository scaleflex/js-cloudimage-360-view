export const attrWithDefaultValue = (element, attribute, defaultValue) => {
  const attr = element.getAttribute(attribute);

  if (typeof attr === 'string' && !attr.length) {
    return defaultValue;
  }

  return attr;
};

export default attrWithDefaultValue;
