import './controllers.css';
import CI360 from '../src';

// ===== Scroll Reveal Animation =====
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('revealed');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.demo-reveal').forEach(el => revealObserver.observe(el));

// ===== Nav Scroll Behavior =====
const nav = document.getElementById('demo-nav');
if (nav) {
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 10);
  }, { passive: true });

  // Active link highlighting
  const navLinks = nav.querySelectorAll('.demo-nav-links a');
  const sections = document.querySelectorAll('section[id]');

  const updateActiveLink = () => {
    const scrollPos = window.scrollY + 100;
    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      if (scrollPos >= top && scrollPos < top + height) {
        const id = section.getAttribute('id');
        navLinks.forEach(link => {
          link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
        });
      }
    });
  };

  window.addEventListener('scroll', updateActiveLink, { passive: true });
}

import {
  EARBUDS_PLUGIN,
  GURKHA_SUV_HOTSPOTS_CONFIG,
  NIKE_PLUGIN,
  PLUGIN_PROPS,
  PROPERTIES_COLORS,
  URL_PROPERTIES,
} from './constants';

// Hide heavy demo sections on mobile to prevent memory crashes
const isMobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
  navigator.userAgent
);

if (isMobileDevice) {
  // Hide gallery section (100 images) and programmatic section (73 images)
  // This reduces total images from ~480 to ~306
  const gallerySection = document.querySelector('.gallery-section');
  const programmaticSection = document.querySelector('.programmatic-control-section');

  if (gallerySection) gallerySection.style.display = 'none';
  if (programmaticSection) programmaticSection.style.display = 'none';
}

const spinDirections = document.getElementById('spin-directions');
const copyText = document.getElementById('copy-text');
const codeBlock = document.getElementById('code-block');
const codeWrapper = document.getElementById('code-wrapper');
const pointerZoomSelector = document.getElementById('pointer-zoom-selector');
const pointerZoomTriggerSelector = document.getElementById('pointer-zoom-trigger');

const copyButton = document.querySelector('.code-section .copy-button');
const outputCode = document.querySelector('.output-code');
const pointerZoomCheckbox = document.getElementById('pointer-checkbox');
const pluginCheckboxOptions = document.querySelectorAll('.plugin-option');
const imageXAmountSelector = document.getElementById('x-images-selector');
const imageYSelector = document.getElementById('images-y');
const autoplaySpeed = document.getElementById('spin-speed');
const dragSpeed = document.getElementById('drag-speed');

const customStylingCheckbox = document.getElementById('custom-styling-checkbox');
const customStylingWrapper = document.getElementById('custom-styling-wrapper');
const customStylingTextarea = document.getElementById('custom-styling-textarea');

const themeSelector = document.getElementById('theme-selector');
const hintOptions = document.querySelectorAll('.hint-option');

const folderPathOption = document.getElementById('folder-path-option');
const folderPathInput = document.getElementById('folder-path');
const filenamePatternInput = document.getElementById('filename-pattern');
const customImagesInput = document.getElementById('custom-images-input');
const nikeXImagesSelector = document.getElementById('nike-x-images');

const instance = new CI360();

function changeSpinDirectionHandler(event) {
  const spinDirection = event.target.value;
  const isYDirection = spinDirection === 'Y';
  const isCustom = spinDirection === 'custom';

  // Show/hide custom fields
  folderPathOption.style.display = isCustom ? 'block' : 'none';
  filenamePatternInput.disabled = !isCustom;

  // Show/hide appropriate image amount inputs
  imageXAmountSelector.style.display = (!isYDirection && !isCustom) ? 'block' : 'none';
  nikeXImagesSelector.style.display = isYDirection ? 'block' : 'none';
  customImagesInput.style.display = isCustom ? 'block' : 'none';

  // Show/hide Y-axis selector
  imageYSelector.style.display = isYDirection ? 'block' : 'none';

  if (isCustom) {
    // For custom, use current input values or defaults
    const folder = folderPathInput.value || '';
    const filename = filenamePatternInput.value || '{index}.jpg';
    const amountX = parseInt(customImagesInput.value, 10) || 36;

    if (folder) {
      const updatedView = instance.updateView('demo-generator', {
        folder,
        filenameX: filename,
        amountX,
        amountY: 0,
        filenameY: null,
      });
      updateCodeBlock(updatedView.viewerConfig);
    }
  } else {
    // Preset datasets
    const config = isYDirection ? NIKE_PLUGIN : EARBUDS_PLUGIN;
    const updatedView = instance.updateView('demo-generator', config);

    // Set the selector values
    if (isYDirection) {
      nikeXImagesSelector.value = 35;
    } else {
      imageXAmountSelector.value = 233;
    }

    // Update filename pattern display
    filenamePatternInput.value = isYDirection ? '{index}.jpg' : '{index}.jpg';

    updateCodeBlock(updatedView.viewerConfig);
  }
}

function changeCustomFolder(event) {
  const folder = event.target.value;
  const filename = filenamePatternInput.value || '{index}.jpg';
  const amountX = parseInt(customImagesInput.value, 10) || 36;

  if (folder) {
    const updatedView = instance.updateView('demo-generator', {
      folder,
      filenameX: filename,
      amountX,
    });
    updateCodeBlock(updatedView.viewerConfig);
  }
}

function changeFilenamePattern(event) {
  const filename = event.target.value;
  const folder = folderPathInput.value;

  if (folder && filename) {
    const updatedView = instance.updateView('demo-generator', {
      filenameX: filename,
    });
    updateCodeBlock(updatedView.viewerConfig);
  }
}

function changeCustomImageAmount(event) {
  const amountX = parseInt(event.target.value, 10);

  if (amountX > 0) {
    const updatedView = instance.updateView('demo-generator', { amountX });
    updateCodeBlock(updatedView.viewerConfig);
  }
}

function changeDragSpeed(event) {
  const { value } = event.target;
  const updatedView = instance.updateView('demo-generator', { dragSpeed: parseInt(value, 10) });

  updateCodeBlock(updatedView.viewerConfig);
}

function changeAutoplaySpeed(event) {
  const { value } = event.target;
  const updatedView = instance.updateView('demo-generator', { speed: parseInt(value, 10) });

  updateCodeBlock(updatedView.viewerConfig);
}

function copyCodeHandler() {
  navigator.clipboard.writeText(outputCode.innerText);

  copyText.innerHTML = 'Copied';

  setTimeout(() => {
    copyText.innerHTML = 'Copy';
  }, 500);
}

function changeImageXAmount(event) {
  const { value } = event.target;
  const updatedView = instance.updateView('demo-generator', { amountX: parseInt(value, 10) });

  updateCodeBlock(updatedView.viewerConfig);
}

function changePointerZoom(event) {
  const checked = event.target.checked;
  const value = parseFloat(pointerZoomSelector.value, 10);
  const updatedView = instance.updateView('demo-generator', { pointerZoom: checked ? value : false });
  pointerZoomSelector.disabled = !checked;

  updateCodeBlock(updatedView.viewerConfig);
}

function changePointerZoomSelector(event) {
  const { value } = event.target;

  const updatedView = instance.updateView('demo-generator', { pointerZoom: parseFloat(value, 10) });

  updateCodeBlock(updatedView.viewerConfig);
}

function changePointerZoomTrigger(event) {
  const { value } = event.target;

  const updatedView = instance.updateView('demo-generator', { pointerZoomTrigger: value });

  updateCodeBlock(updatedView.viewerConfig);
}

function pluginCheckboxOptionsHandler(event) {
  const checked = event.target.checked;
  const key = event.target.getAttribute('data-plugin-property');
  const pluginValue = event.target.getAttribute('data-plugin-value');

  let value = checked;
  if (pluginValue) {
    value = checked ? JSON.parse(pluginValue) : undefined;
  }

  const updatedView = instance.updateView('demo-generator', { [key]: value });

  updateCodeBlock(updatedView.viewerConfig);
}

function updateCodeBlock(config) {
  codeBlock.innerText = '';
  const configKeys = Object.keys(config);
  const keys = configKeys.filter((key) => PLUGIN_PROPS[key] && !!config[key]);

  keys.forEach((key) => {
    const { label } = PLUGIN_PROPS[key];
    const propertyWrapper = document.createElement('div');
    const propertyName = document.createElement('span');
    const propertyValue = document.createElement('span');

    propertyName.innerText = label;

    propertyName.style.color = PROPERTIES_COLORS.NAME;

    if (URL_PROPERTIES.includes(key)) {
      propertyValue.style.color = PROPERTIES_COLORS.URL;
    }

    propertyWrapper.appendChild(propertyName);

    propertyValue.innerText = `"${config[key]}"`;

    propertyWrapper.innerHTML += '=';
    propertyWrapper.appendChild(propertyValue);

    codeBlock.appendChild(propertyWrapper);
    codeWrapper.scrollTop = codeWrapper.scrollHeight;
  });
}

dragSpeed.addEventListener('change', changeDragSpeed);
autoplaySpeed.addEventListener('change', changeAutoplaySpeed);
pointerZoomCheckbox.addEventListener('change', changePointerZoom);
imageXAmountSelector.addEventListener('change', changeImageXAmount);
pointerZoomSelector.addEventListener('change', changePointerZoomSelector);
pointerZoomTriggerSelector.addEventListener('change', changePointerZoomTrigger);
spinDirections.addEventListener('change', changeSpinDirectionHandler);
copyButton.addEventListener('click', copyCodeHandler);
folderPathInput.addEventListener('change', changeCustomFolder);
filenamePatternInput.addEventListener('change', changeFilenamePattern);
customImagesInput.addEventListener('change', changeCustomImageAmount);
nikeXImagesSelector.addEventListener('change', changeImageXAmount);
pluginCheckboxOptions.forEach((option) => {
  option.addEventListener('change', pluginCheckboxOptionsHandler);
});

const suvCarContainer = document.getElementById('gurkha-suv');

// Generate evenly distributed image list for mobile (every Nth image for full 360° coverage)
const generateMobileImageList = (folder, pattern, totalImages, targetCount) => {
  const step = Math.floor(totalImages / targetCount);
  const images = [];
  for (let i = 1; i <= totalImages && images.length < targetCount; i += step) {
    images.push(`${folder}${pattern.replace('{index}', i)}`);
  }
  return images;
};

// SUV: 73 images -> 36 on mobile (every 2nd image for full rotation)
const suvMobileImages = generateMobileImageList(
  'https://scaleflex.cloudimg.io/v7/demo/suv-orange-car-360/',
  'orange-{index}.jpg',
  73,
  36
);

const config = {
  folder: 'https://scaleflex.cloudimg.io/v7/demo/suv-orange-car-360/',
  filenameX: 'orange-{index}.jpg',
  // On mobile: use evenly distributed images for full 360° coverage
  ...(isMobileDevice
    ? { imageListX: suvMobileImages }
    : { amountX: 73 }),
  lazyload: true,
  speed: 120,
  pointerZoom: isMobileDevice ? false : 2, // Disable pointer zoom on mobile
  responsive: 'scaleflex',
  autoplay: true,
  fullscreen: true,
  magnifier: isMobileDevice ? false : 3, // Disable magnifier on mobile
  playOnce: true,
  bottomCircle: false,
  hotspots: isMobileDevice ? undefined : GURKHA_SUV_HOTSPOTS_CONFIG, // Disable hotspots on mobile
  inertia: true,
  hints: true, // Auto-detect: swipe+pinch on mobile, drag+click on desktop
};

instance.init(suvCarContainer, config);

// Initialize demo-generator with event callbacks
const demoGeneratorContainer = document.getElementById('demo-generator');

// Earbuds: 233 images -> 36 on mobile (every ~6th image for full rotation)
const earbudsMobileImages = generateMobileImageList(
  'https://scaleflex.cloudimg.io/v7/demo/earbuds/',
  '{index}.jpg',
  233,
  36
);

// Use fewer images on mobile to prevent memory crashes
const demoGeneratorConfig = {
  folder: 'https://scaleflex.cloudimg.io/v7/demo/earbuds/',
  filenameX: '{index}.jpg',
  // On mobile: use evenly distributed images for full 360° coverage
  ...(isMobileDevice
    ? { imageListX: earbudsMobileImages }
    : { amountX: 233 }),
  autoplay: true,
  speed: 100,
  pointerZoom: isMobileDevice ? false : 1.5, // Disable pointer zoom on mobile
  dragSpeed: 100,
  bottomCircle: false,
  fullscreen: true,
  keys: true,
  responsive: 'scaleflex',
  lazyload: true,
  hints: true, // Auto-detect: swipe+pinch on mobile, drag+click on desktop
  // Event callbacks - only log on desktop to avoid memory pressure from logging
  ...(isMobileDevice ? {} : {
    onReady: (event) => {
      console.log('onReady:', event.viewerId);
    },
    onLoad: (event) => {
      console.log('onLoad:', `${event.imagesX} images loaded`);
    },
    onSpin: (event) => {
      console.log('onSpin:', `Frame ${event.activeImageX + 1}/${event.amountX}`, event.direction);
    },
    onAutoplayStart: (event) => {
      console.log('onAutoplayStart:', event.viewerId);
    },
    onAutoplayStop: (event) => {
      console.log('onAutoplayStop:', event.viewerId);
    },
    onFullscreenOpen: (event) => {
      console.log('onFullscreenOpen:', event.viewerId);
    },
    onFullscreenClose: (event) => {
      console.log('onFullscreenClose:', event.viewerId);
    },
    onZoomIn: (event) => {
      console.log('onZoomIn:', `zoom level ${event.zoomLevel}`);
    },
    onZoomOut: (event) => {
      console.log('onZoomOut:', event.viewerId);
    },
    onDragStart: (event) => {
      console.log('onDragStart:', event.viewerId);
    },
    onDragEnd: (event) => {
      console.log('onDragEnd:', event.viewerId);
    },
  }),
};

instance.init(demoGeneratorContainer, demoGeneratorConfig);

const demoGeneratorInstance = instance.getViewById('demo-generator');

updateCodeBlock(demoGeneratorInstance.viewerConfig);

// Custom styling functionality
let customStyleElement = null;
let cssDebounceTimer = null;

function toggleCustomStyling(event) {
  const isChecked = event.target.checked;
  customStylingWrapper.style.display = isChecked ? 'block' : 'none';

  if (isChecked) {
    // Apply CSS when enabling
    applyCustomCss();
  } else if (customStyleElement) {
    customStyleElement.remove();
    customStyleElement = null;
  }
}

function scopeCssToInstance(css, instanceId) {
  // Strip comments for selector parsing but keep them in output
  const stripComments = (str) => str.replace(/\/\*[\s\S]*?\*\//g, '').trim();

  // Parse CSS and prefix each selector with the instance ID
  return css.replace(
    /(\/\*[\s\S]*?\*\/\s*)?([^\{\}]+)\{/g,
    (match, comment, selectors) => {
      const prefix = comment || '';
      const scopedSelectors = selectors
        .split(',')
        .map((selector) => {
          // Remove any inline comments from selector
          const trimmed = stripComments(selector);
          if (!trimmed) return '';
          // Handle selectors that already start with the instance
          if (trimmed.startsWith(`#${instanceId}`)) {
            return trimmed;
          }
          // Handle .cloudimage-360 - apply directly to container (no space)
          if (trimmed === '.cloudimage-360') {
            return `#${instanceId}`;
          }
          // Scope the selector to the instance
          return `#${instanceId} ${trimmed}`;
        })
        .filter(Boolean)
        .join(', ');
      return `${prefix}${scopedSelectors} {`;
    }
  );
}

function applyCustomCss() {
  const css = customStylingTextarea.value.trim();

  // Remove existing custom style if present
  if (customStyleElement) {
    customStyleElement.remove();
    customStyleElement = null;
  }

  if (!css) return;

  // Create scoped CSS
  const scopedCss = scopeCssToInstance(css, 'demo-generator');

  // Create and inject style element
  customStyleElement = document.createElement('style');
  customStyleElement.id = 'demo-generator-custom-styles';
  customStyleElement.textContent = scopedCss;
  document.head.appendChild(customStyleElement);
}

function handleCssInput() {
  // Only apply if custom styling is enabled
  if (!customStylingCheckbox.checked) return;

  // Debounce to avoid too frequent updates while typing
  clearTimeout(cssDebounceTimer);
  cssDebounceTimer = setTimeout(applyCustomCss, 150);
}

customStylingCheckbox.addEventListener('change', toggleCustomStyling);
customStylingTextarea.addEventListener('input', handleCssInput);

// Theme handler
function changeTheme(event) {
  const { value } = event.target;
  const updatedView = instance.updateView('demo-generator', { theme: value });
  updateCodeBlock(updatedView.viewerConfig);
}

themeSelector.addEventListener('change', changeTheme);

// Hints selection handler
function getSelectedHints() {
  const selectedHints = [];
  hintOptions.forEach((option) => {
    if (option.checked) {
      selectedHints.push(option.getAttribute('data-hint'));
    }
  });
  return selectedHints.length > 0 ? selectedHints : false;
}

function changeHints() {
  const hints = getSelectedHints();
  const updatedView = instance.updateView('demo-generator', { hints });
  updateCodeBlock(updatedView.viewerConfig);
}

hintOptions.forEach((option) => {
  option.addEventListener('change', changeHints);
});

// Initialize all gallery examples with cloudimage-360 class
// Note: Memory management is automatically enabled on mobile devices
instance.initAll();

// ===== Programmatic Control Section =====
const programmaticViewer = instance.getViewById('programmatic-viewer');
const frameDisplay = document.getElementById('frame-display');

// Update frame display using rAF loop so it stays in sync during
// autoplay, drag, and programmatic moves (onSpin only fires on drag)
let lastDisplayedFrame = -1;

function updateFrameDisplay() {
  if (programmaticViewer && frameDisplay) {
    const current = programmaticViewer.activeImageX + 1;
    const total = programmaticViewer.amountX;

    if (current !== lastDisplayedFrame) {
      lastDisplayedFrame = current;
      frameDisplay.textContent = `Frame: ${current} / ${total}`;
    }
  }
  requestAnimationFrame(updateFrameDisplay);
}

if (programmaticViewer) {
  requestAnimationFrame(updateFrameDisplay);
}

// Helper to hide icons on first interaction
function hideIconsOnInteraction() {
  if (programmaticViewer) {
    programmaticViewer.hideAllIcons();
  }
}

// Play button
document.getElementById('btn-play')?.addEventListener('click', () => {
  if (programmaticViewer) {
    hideIconsOnInteraction();
    programmaticViewer.play();
  }
});

// Stop button
document.getElementById('btn-stop')?.addEventListener('click', () => {
  if (programmaticViewer) {
    programmaticViewer.stopAutoplay();
  }
});

// Rotate Left button
document.getElementById('btn-left')?.addEventListener('click', () => {
  if (programmaticViewer) {
    hideIconsOnInteraction();
    programmaticViewer.moveLeft(false, 5);
    updateFrameDisplay();
  }
});

// Rotate Right button
document.getElementById('btn-right')?.addEventListener('click', () => {
  if (programmaticViewer) {
    hideIconsOnInteraction();
    programmaticViewer.moveRight(false, 5);
    updateFrameDisplay();
  }
});

// Frame navigation buttons
document.getElementById('btn-frame-0')?.addEventListener('click', () => {
  if (programmaticViewer) {
    hideIconsOnInteraction();
    programmaticViewer.animateToFrame(0);
    setTimeout(updateFrameDisplay, 100);
  }
});

document.getElementById('btn-frame-36')?.addEventListener('click', () => {
  if (programmaticViewer) {
    hideIconsOnInteraction();
    programmaticViewer.animateToFrame(36);
    setTimeout(updateFrameDisplay, 100);
  }
});

document.getElementById('btn-frame-72')?.addEventListener('click', () => {
  if (programmaticViewer) {
    hideIconsOnInteraction();
    programmaticViewer.animateToFrame(72);
    setTimeout(updateFrameDisplay, 100);
  }
});

// ===== Also by Scaleflex — slide auto-rotation =====
{
  const slides = document.querySelectorAll('.demo-also-slide');
  const dotsContainer = document.getElementById('also-dots');
  if (slides.length > 0 && dotsContainer) {
    let current = 0;
    let animating = false;
    let timer;

    for (let i = 0; i < slides.length; i++) {
      const dot = document.createElement('button');
      dot.className = `demo-also-dot${i === 0 ? ' demo-also-dot--active' : ''}`;
      dot.setAttribute('aria-label', `Slide ${i + 1}`);
      dot.addEventListener('click', () => goTo(i));
      dotsContainer.appendChild(dot);
    }

    function clearAnimClasses(el) {
      el.classList.remove(
        'demo-also-slide--enter-right', 'demo-also-slide--enter-left',
        'demo-also-slide--leave-left', 'demo-also-slide--leave-right',
      );
    }

    function goTo(index) {
      if (index === current || animating) return;
      animating = true;
      const forward = index > current || (current === slides.length - 1 && index === 0);
      const prev = slides[current];
      const next = slides[index];

      clearAnimClasses(prev);
      prev.classList.remove('demo-also-slide--active');
      prev.classList.add(forward ? 'demo-also-slide--leave-left' : 'demo-also-slide--leave-right');

      clearAnimClasses(next);
      next.classList.add(forward ? 'demo-also-slide--enter-right' : 'demo-also-slide--enter-left');

      next.addEventListener('animationend', function handler() {
        next.removeEventListener('animationend', handler);
        clearAnimClasses(prev);
        clearAnimClasses(next);
        next.classList.add('demo-also-slide--active');
        animating = false;
      });

      current = index;
      dotsContainer.querySelectorAll('.demo-also-dot').forEach((d, i) => {
        d.classList.toggle('demo-also-dot--active', i === current);
      });
      resetTimer();
    }

    function resetTimer() {
      clearInterval(timer);
      timer = setInterval(() => {
        goTo((current + 1) % slides.length);
      }, 5000);
    }

    resetTimer();
  }
}
