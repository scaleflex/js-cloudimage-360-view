export const generatePopupConfig = (popupProps) => {
  const {
    popupSelector = '',
    arrow = true,
    offset = [0, 10],
    placement = 'auto',
    open = false,
  } = popupProps;


  const popupConfig = {
    popupSelector,
    arrow,
    offset,
    placement,
    open,
  };

  return popupConfig;
};
