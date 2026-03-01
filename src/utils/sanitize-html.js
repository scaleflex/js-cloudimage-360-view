/**
 * Simple HTML sanitizer to prevent XSS attacks.
 * Allows only safe tags and removes dangerous attributes.
 */

// Safe tags that are allowed in hotspot content
const SAFE_TAGS = new Set([
  // Basic HTML
  'p', 'span', 'div', 'br', 'hr',
  'strong', 'em', 'b', 'i', 'u', 's',
  'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
  'ul', 'ol', 'li',
  'a', 'img', 'button',
  'table', 'thead', 'tbody', 'tr', 'th', 'td',
  'blockquote', 'pre', 'code', 'label', 'input', 'select', 'option', 'textarea',
  // SVG elements
  'svg', 'path', 'circle', 'rect', 'line', 'polyline', 'polygon',
  'ellipse', 'g', 'text', 'tspan', 'defs', 'use', 'symbol',
  'clippath', 'mask', 'lineargradient', 'radialgradient', 'stop',
]);

// Safe attributes for specific tags
const SAFE_ATTRIBUTES = {
  a: ['href', 'title', 'target', 'rel'],
  img: ['src', 'alt', 'title', 'width', 'height'],
  button: ['type', 'disabled', 'name', 'value'],
  input: ['type', 'name', 'value', 'placeholder', 'disabled', 'readonly', 'checked', 'min', 'max', 'step'],
  select: ['name', 'disabled', 'multiple'],
  option: ['value', 'disabled', 'selected'],
  textarea: ['name', 'placeholder', 'disabled', 'readonly', 'rows', 'cols'],
  label: ['for'],
  // SVG attributes
  svg: ['viewbox', 'width', 'height', 'fill', 'stroke', 'xmlns', 'preserveaspectratio'],
  path: ['d', 'fill', 'stroke', 'stroke-width', 'stroke-linecap', 'stroke-linejoin', 'transform'],
  circle: ['cx', 'cy', 'r', 'fill', 'stroke', 'stroke-width'],
  rect: ['x', 'y', 'width', 'height', 'rx', 'ry', 'fill', 'stroke', 'stroke-width'],
  line: ['x1', 'y1', 'x2', 'y2', 'stroke', 'stroke-width'],
  polyline: ['points', 'fill', 'stroke', 'stroke-width'],
  polygon: ['points', 'fill', 'stroke', 'stroke-width'],
  ellipse: ['cx', 'cy', 'rx', 'ry', 'fill', 'stroke', 'stroke-width'],
  g: ['transform', 'fill', 'stroke'],
  text: ['x', 'y', 'dx', 'dy', 'text-anchor', 'fill', 'font-size', 'font-family', 'font-weight'],
  tspan: ['x', 'y', 'dx', 'dy'],
  use: ['href', 'xlink:href', 'x', 'y', 'width', 'height'],
  lineargradient: ['id', 'x1', 'y1', 'x2', 'y2', 'gradientunits'],
  radialgradient: ['id', 'cx', 'cy', 'r', 'fx', 'fy', 'gradientunits'],
  stop: ['offset', 'stop-color', 'stop-opacity'],
  clippath: ['id'],
  mask: ['id'],
  '*': ['class', 'id', 'style'],
};

// Dangerous patterns to remove from attribute values
const DANGEROUS_PATTERNS = [
  /javascript:/i,
  /vbscript:/i,
  /on\w+\s*=/i,
];

/**
 * Sanitizes an HTML string to prevent XSS attacks.
 * @param {string} html - The HTML string to sanitize
 * @returns {string} - Sanitized HTML string
 */
export const sanitizeHtml = (html) => {
  if (typeof html !== 'string') {
    return '';
  }

  // Create a temporary container to parse the HTML
  const template = document.createElement('template');
  template.innerHTML = html;

  const sanitizeNode = (node) => {
    // Process child nodes first (in reverse to handle removals)
    const children = Array.from(node.childNodes);
    children.forEach(sanitizeNode);

    if (node.nodeType === Node.ELEMENT_NODE) {
      const tagName = node.tagName.toLowerCase();

      // Remove unsafe tags entirely
      if (!SAFE_TAGS.has(tagName)) {
        // For script/style tags, remove completely including content
        if (tagName === 'script' || tagName === 'style') {
          node.remove();
          return;
        }
        // For other unsafe tags, replace with their text content
        const text = document.createTextNode(node.textContent);
        node.parentNode.replaceChild(text, node);
        return;
      }

      // Get allowed attributes for this tag
      const allowedAttrs = [
        ...(SAFE_ATTRIBUTES[tagName] || []),
        ...(SAFE_ATTRIBUTES['*'] || []),
      ];

      // Remove unsafe attributes
      const attrs = Array.from(node.attributes);
      attrs.forEach((attr) => {
        const attrName = attr.name.toLowerCase();

        // Remove event handlers (onclick, onerror, etc.)
        if (attrName.startsWith('on')) {
          node.removeAttribute(attr.name);
          return;
        }

        // Remove attributes not in whitelist
        if (!allowedAttrs.includes(attrName)) {
          node.removeAttribute(attr.name);
          return;
        }

        // Check for dangerous patterns in attribute values
        let value = attr.value;
        DANGEROUS_PATTERNS.forEach((pattern) => {
          if (pattern.test(value)) {
            node.removeAttribute(attr.name);
          }
        });
      });

      // Special handling for anchor tags
      if (tagName === 'a') {
        const href = node.getAttribute('href');
        if (href) {
          // Only allow http, https, mailto, and tel protocols
          const isValidProtocol = /^(https?:|mailto:|tel:|#|\/)/i.test(href.trim());
          if (!isValidProtocol) {
            node.removeAttribute('href');
          }
        }
        // Add security attributes for external links
        if (node.getAttribute('target') === '_blank') {
          node.setAttribute('rel', 'noopener noreferrer');
        }
      }

      // Special handling for images
      if (tagName === 'img') {
        const src = node.getAttribute('src');
        if (src) {
          // Only allow http, https, and data:image protocols
          const isValidSrc = /^(https?:|\/|data:image\/)/i.test(src.trim());
          if (!isValidSrc) {
            node.removeAttribute('src');
          }
        }
      }
    }
  };

  sanitizeNode(template.content);
  return template.innerHTML;
};

export default sanitizeHtml;
