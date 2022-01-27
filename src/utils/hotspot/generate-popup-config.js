export const generatePopupConfig = (popupProps) => {

  const {
    popupClass = '',
    arrow = false,
    offset = [0, 10],
    placement = 'auto',
    open = false,
  } = popupProps;


  const popupConfig = {
    popupClass,
    arrow,
    offset,
    placement,
    open,
  };

  return popupConfig;
};
