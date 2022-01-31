export const getHotspotVariant = (variant) => {
  if (variant.toLowerCase() === 'link') {
    return 'link';
  }

  if (variant.toLowerCase() === 'custom') {
    return 'custom';
  }

  return 'link';
};
