import attr from './attr';


export const isTrue = (image, type) => {
  const imgProp = attr(image, type);
  const imgDataProp = attr(image, `data-${type}`);

  return (imgProp !== null && imgProp !== 'false') || (imgDataProp !== null && imgDataProp !== 'false');
};

export default isTrue;
