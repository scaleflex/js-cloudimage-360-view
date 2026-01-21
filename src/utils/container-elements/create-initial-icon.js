const DEFAULT_360_ICON = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
  <!-- Circular arrows -->
  <path d="M 75 50 A 25 25 0 1 1 50 25" stroke="currentColor" stroke-width="3"/>
  <path d="M 25 50 A 25 25 0 1 1 50 75" stroke="currentColor" stroke-width="3"/>
  <!-- Arrow heads -->
  <path d="M 50 25 L 56 31 M 50 25 L 56 19" stroke="currentColor" stroke-width="3"/>
  <path d="M 50 75 L 44 69 M 50 75 L 44 81" stroke="currentColor" stroke-width="3"/>
  <!-- 360 text -->
  <text x="50" y="54" text-anchor="middle" font-size="16" font-weight="600" fill="currentColor" stroke="none" font-family="system-ui, -apple-system, sans-serif">360°</text>
</svg>
`;

export const createInitialIcon = (logoSrc) => {
  const view360Icon = document.createElement('div');

  view360Icon.className = 'cloudimage-initial-icon';
  view360Icon.setAttribute('aria-label', '360 degree view - drag to rotate');

  if (logoSrc) {
    // Custom logo - use CSS background that respects theming
    view360Icon.style.backgroundImage = `url('${logoSrc}')`;
    view360Icon.style.backgroundPosition = '50% 50%';
    view360Icon.style.backgroundSize = 'contain';
    view360Icon.style.backgroundRepeat = 'no-repeat';
  } else {
    view360Icon.innerHTML = DEFAULT_360_ICON;
  }

  return view360Icon;
};
