export const getPercentage = (maxValue, currentValue) => {
  return (currentValue * 100) / maxValue;
}

/**
 * @param {String} value 
 * @param {Function} parserFunction parseInt, parseFloat ...
 * @param {any} defaultValue 
 */
export const parseNumberOrDefault = (value, parserFunction, defaultValue = 0) => {
  const number = parserFunction(value);
  return isNaN(number) ? defaultValue : number;
}