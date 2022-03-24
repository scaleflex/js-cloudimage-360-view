import { createHotspotPopupLink } from './create-hotspot-popup-link';
import { getPopupNode } from '../get-popup-node';
import { createPopupArrow } from './create-popup-arrow';
import { createModalElements } from './create-model-elements';

export const createPopup = (container, hotspotConfig, popupProps) => {
  const { variant } = hotspotConfig;
  const { popupSelector, arrow } = popupProps;
  const { url, images, title, anchorId, description, moreDetailsUrl } = variant;

  const popup = document.createElement('div');

  popup.className = `cloudimage-360-hotspot-popup ${popupSelector}`;
  popup.setAttribute('data-hotspot-popup-id', anchorId);
  popup.setAttribute('data-cloudimage-360-hotspot', '');

  popup.style.minHeight = 16;
  popup.style.minWidth = 16;
  popup.style.cursor = 'default';

  popup.onclick = (e) => e.stopPropagation();

  if (typeof variant === 'object' && images || description || moreDetailsUrl || (title && !url)) {
    createModalElements(variant, container, popup);
  } else if (url) {
    const hotspotPopupLink = createHotspotPopupLink(variant);

    popup.appendChild(hotspotPopupLink);
  } else if (typeof variant === 'string'){
    try {
      const popupNode = getPopupNode(variant);
      const userPopup = popupNode.cloneNode(true);

      popup.appendChild(userPopup);
      popupNode.parentNode.removeChild(popupNode);
    } catch {
      console.error(`Cloudimage-360: Element with anchorId '${anchorId}' not exist in the DOM`);
    }
  }

  if (arrow) {
    const popupArrow = createPopupArrow();

    popup.appendChild(popupArrow);
  }

  container.appendChild(popup);

  return popup;
};
