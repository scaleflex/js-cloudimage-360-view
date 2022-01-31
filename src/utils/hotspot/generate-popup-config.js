export const generatePopupConfig = (popupProps) => {
  const uniqueID = Math.floor(Math.random() * 10000);
  const defaultAnchorId = `cloudimage-${uniqueID}`;

  const {
    popupClass = '',
    arrow = false,
    offset = [0, 10],
    placement = 'auto',
    anchorId = defaultAnchorId,
    open = false,
  } = popupProps;


  const popupConfig = {
    popupClass,
    arrow,
    offset,
    placement,
    anchorId,
    open,
  };

  return popupConfig;
};
