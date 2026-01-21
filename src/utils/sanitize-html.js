/**
 * Simple HTML sanitizer to prevent XSS attacks.
 * Allows only safe tags and removes dangerous attributes.
 */

// Safe tags that are allowed in hotspot content
const SAFE_TAGS = new Set([
  'p', 'span', 'div', 'br', 'hr',
  'strong', 'em', 'b', 'i', 'u', 's',
  'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
  'ul', 'ol', 'li',
  'a', 'img',
  'table', 'thead', 'tbody', 'tr', 'th', 'td',
  'blockquote', 'pre', 'code',
]);

// Safe attributes for specific tags
const SAFE_ATTRIBUTES = {
  a: ['href', 'title', 'target', 'rel'],
  img: ['src', 'alt', 'title', 'width', 'height'],
  '*': ['class', 'id', 'style'],
};

// Dangerous patterns to remove from attribute values
const DANGEROUS_PATTERNS = [
  /javascript:/gi,
  /vbscript:/gi,
  /data:/gi,
  /on\w+\s*=/gi,
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
