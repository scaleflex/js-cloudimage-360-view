const DISPLAY_DURATION = 1500;

export const createScrollHint = (container) => {
  const toast = document.createElement('div');
  toast.className = 'cloudimage-360-scroll-hint';
  toast.setAttribute('role', 'status');
  toast.setAttribute('aria-live', 'polite');
  toast.textContent = 'Ctrl + scroll to zoom';
  container.appendChild(toast);

  let hideTimer = null;
  let attached = false;

  const show = () => {
    clearTimeout(hideTimer);
    toast.classList.add('visible');
    hideTimer = setTimeout(() => {
      toast.classList.remove('visible');
    }, DISPLAY_DURATION);
  };

  const onWheel = (event) => {
    // Only show hint for regular scroll (no Ctrl/Meta)
    if (event.ctrlKey || event.metaKey) return;
    show();
  };

  const attach = () => {
    if (attached) return;
    attached = true;
    container.addEventListener('wheel', onWheel, { passive: true });
  };

  const destroy = () => {
    clearTimeout(hideTimer);
    container.removeEventListener('wheel', onWheel);
    if (toast.parentNode) {
      toast.parentNode.removeChild(toast);
    }
    attached = false;
  };

  attach();

  return {
    element: toast,
    show,
    destroy,
  };
};
