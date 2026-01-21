const GURKHA_SUV_HOTSPOTS_CONFIG = [
  // Modal Style 1: Link with icon - compact and clickable
  {
    id: 'hotspot-1',
    orientation: 'x',
    containerSize: [1170, 663],
    positions: {
      0: { x: 527, y: 319 },
      1: { x: 527, y: 319 },
      2: { x: 527, y: null },
      3: { x: 498, y: null },
      4: { x: 470, y: null },
      5: { x: 441, y: null },
      73: { x: 555, y: null },
      72: { x: 586, y: null },
      71: { x: 614, y: null },
      70: { x: 641, y: null },
      69: { x: 668, y: null },
      68: { x: 692, y: null },
      67: { x: 715, y: null },
      66: { x: 736, y: null },
      65: { x: 756, y: null },
      64: { x: 773, y: null },
      63: { x: 787, y: null },
    },
    content: `
      <div class="hotspot-modal hotspot-modal--link">
        <a href="https://scaleflex.com" target="_blank" class="hotspot-link">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
            <polyline points="15 3 21 3 21 9"/>
            <line x1="10" y1="14" x2="21" y2="3"/>
          </svg>
          <span>View Full Specifications</span>
          <svg class="hotspot-link__arrow" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="9 18 15 12 9 6"/>
          </svg>
        </a>
      </div>
    `,
  },
  // Modal Style 2: Title and description - clean card
  {
    id: 'hotspot-2',
    orientation: 'x',
    containerSize: [1220, 680],
    positions: {
      73: { x: 355, y: 474 },
      74: { x: 355, y: null },
      72: { x: 341, y: 479 },
      71: { x: 336, y: null },
      70: { x: 332, y: null },
      69: { x: 327, y: null },
      68: { x: 326, y: null },
      67: { x: 327, y: null },
      66: { x: 331, y: null },
      65: { x: 334, y: null },
      64: { x: 336, y: null },
      63: { x: 347, y: 474 },
    },
    content: `
      <div class="hotspot-modal hotspot-modal--info">
        <div class="hotspot-info__badge">Premium</div>
        <h3 class="hotspot-info__title">All-Terrain Wheels</h3>
        <p class="hotspot-info__description">
          18-inch alloy wheels with reinforced sidewalls, designed for both on-road comfort and off-road durability.
        </p>
        <div class="hotspot-info__specs">
          <div class="hotspot-info__spec">
            <span class="hotspot-info__spec-label">Size</span>
            <span class="hotspot-info__spec-value">18"</span>
          </div>
          <div class="hotspot-info__spec">
            <span class="hotspot-info__spec-label">Type</span>
            <span class="hotspot-info__spec-value">Alloy</span>
          </div>
        </div>
      </div>
    `,
  },
  // Modal Style 3: Gallery with images, title, description, and action buttons
  {
    id: 'hotspot-3',
    orientation: 'x',
    containerSize: [1220, 680],
    positions: {
      11: { x: 683, y: 151 },
      12: { x: 683, y: null },
      13: { x: 683, y: null },
      14: { x: 683, y: null },
      15: { x: 683, y: null },
      16: { x: 683, y: null },
      17: { x: 681, y: 152 },
      18: { x: 677, y: 156 },
      19: { x: 671, y: 159 },
      20: { x: 665, y: 163 },
      21: { x: 656, y: 168 },
      22: { x: 650, y: 171 },
      23: { x: 643, y: 176 },
      24: { x: 635, y: 178 },
      25: { x: 628, y: 181 },
      26: { x: 621, y: null },
      27: { x: 610, y: null },
      28: { x: 598, y: null },
      29: { x: 588, y: null },
      30: { x: 578, y: null },
      31: { x: 570, y: 176 },
      32: { x: 560, y: 173 },
    },
    content: `
      <div class="hotspot-modal hotspot-modal--gallery">
        <div class="hotspot-gallery__images">
          <img src="https://scaleflex.cloudimg.io/v7/demo/suv-orange-car-360/orange-11.jpg?w=80&h=60&func=cover" alt="Roof rack angle 1" />
          <img src="https://scaleflex.cloudimg.io/v7/demo/suv-orange-car-360/orange-20.jpg?w=80&h=60&func=cover" alt="Roof rack angle 2" />
          <img src="https://scaleflex.cloudimg.io/v7/demo/suv-orange-car-360/orange-30.jpg?w=80&h=60&func=cover" alt="Roof rack angle 3" />
        </div>
        <div class="hotspot-gallery__content">
          <h3 class="hotspot-gallery__title">Adventure Roof Rack</h3>
          <p class="hotspot-gallery__description">
            Heavy-duty roof rack system with 150kg capacity. Perfect for camping gear, kayaks, or extra luggage.
          </p>
          <div class="hotspot-gallery__actions">
            <a href="https://scaleflex.com" target="_blank" class="hotspot-btn hotspot-btn--primary">
              Configure
            </a>
            <button class="hotspot-btn hotspot-btn--secondary">
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    `,
  },
  // Modal Style 2 variant: Another info card for the fourth hotspot
  {
    id: 'hotspot-4',
    orientation: 'x',
    containerSize: [1220, 680],
    positions: {
      6: { x: 607, y: 246 },
      7: { x: 619, y: null },
      8: { x: 630, y: null },
      9: { x: 637, y: null },
      10: { x: 642, y: null },
    },
    content: `
      <div class="hotspot-modal hotspot-modal--info">
        <h3 class="hotspot-info__title">LED Headlights</h3>
        <p class="hotspot-info__description">
          Adaptive LED headlights with automatic high beam and cornering light technology for superior night visibility.
        </p>
        <div class="hotspot-info__specs">
          <div class="hotspot-info__spec">
            <span class="hotspot-info__spec-label">Type</span>
            <span class="hotspot-info__spec-value">LED</span>
          </div>
          <div class="hotspot-info__spec">
            <span class="hotspot-info__spec-label">Lumens</span>
            <span class="hotspot-info__spec-value">3000</span>
          </div>
        </div>
      </div>
    `,
  },
];

export { GURKHA_SUV_HOTSPOTS_CONFIG };
