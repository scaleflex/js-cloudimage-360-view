/**
 * Built-in popover template for structured hotspot data.
 * Mirrors js-cloudimage-hotspot's popover/template.ts but in plain JS.
 *
 * Priority: hotspot.content (HTML string) > hotspot.data (built-in template) > ''
 */

/**
 * Render the built-in product template from data fields.
 * @param {Object} data
 * @param {string} [data.title]
 * @param {string} [data.description]
 * @param {string} [data.price]
 * @param {string} [data.originalPrice]
 * @param {string} [data.image]
 * @param {string} [data.url]
 * @param {string} [data.ctaText]
 * @returns {string} HTML string
 */
export function renderBuiltInTemplate(data) {
  const parts = [];

  if (data.image) {
    parts.push(
      `<div class="ci360-popper-image-wrapper"><img class="ci360-popper-image" src="${escapeAttr(data.image)}" alt="${escapeAttr(data.title || '')}"></div>`
    );
  }

  const bodyParts = [];

  if (data.title) {
    bodyParts.push(`<h3 class="ci360-popper-title">${escapeHtml(data.title)}</h3>`);
  }

  if (data.originalPrice || data.price) {
    let priceHtml = '';
    if (data.originalPrice) {
      priceHtml += `<span class="ci360-popper-original-price">${escapeHtml(data.originalPrice)}</span>`;
    }
    if (data.price) {
      priceHtml += `<span class="ci360-popper-price">${escapeHtml(data.price)}</span>`;
    }
    bodyParts.push(`<div class="ci360-popper-price-row">${priceHtml}</div>`);
  }

  if (data.description) {
    bodyParts.push(`<p class="ci360-popper-description">${escapeHtml(data.description)}</p>`);
  }

  if (data.url && isSafeUrl(data.url)) {
    const ctaText = data.ctaText || 'View details';
    bodyParts.push(
      `<a class="ci360-popper-cta" href="${escapeAttr(data.url)}">${escapeHtml(String(ctaText))}</a>`
    );
  }

  if (bodyParts.length > 0) {
    parts.push(`<div class="ci360-popper-body">${bodyParts.join('')}</div>`);
  }

  return parts.join('');
}

/**
 * Render popover content with priority: content string > data template > ''.
 * @param {Object} hotspot
 * @param {string} [hotspot.content] - Raw HTML string
 * @param {Object} [hotspot.data] - Structured popover data
 * @returns {string} HTML string (empty string if no content)
 */
export function renderPopoverContent(hotspot) {
  // Priority 1: HTML content string
  if (hotspot.content) {
    return hotspot.content;
  }

  // Priority 2: Built-in template from data
  if (hotspot.data) {
    return renderBuiltInTemplate(hotspot.data);
  }

  return '';
}

function escapeHtml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function escapeAttr(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

/** Check that a URL uses a safe protocol (allowlist approach) */
function isSafeUrl(url) {
  const normalized = url.replace(/[\s\x00-\x1f]/g, '');
  return /^https?:\/\//i.test(normalized) || /^\/(?!\/)/.test(normalized) || /^#/.test(normalized);
}
