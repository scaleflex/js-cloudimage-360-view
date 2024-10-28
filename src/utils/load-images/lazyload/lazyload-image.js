const lazyLoadImages = (image) => {
  const options = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1,
  };

  const loadImage = (image) => {
    const src = image.getAttribute('data-src');

    if (src) {
      image.src = src;
    }
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        loadImage(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, options);

  observer.observe(image);
};

export default lazyLoadImages;
