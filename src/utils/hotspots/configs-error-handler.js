export const configsErrorHandler = (hotspotProps) => {
  const { variant = {} } = hotspotProps;

  const {
    url,
    title,
    anchorId,
    images,
    description,
    moreDetailsUrl
  } = variant;

  if (url && !title) {
    console.error('Cloudimage-360: Hotspot config with variant link must have title for the link');
  }

  if (!title && !url && !anchorId && !images && !description && !moreDetailsUrl) {
    console.error('Cloudimage-360: Hotspot config with custom variant must provide anchorId');
  }
};
