import MobileDetect from 'mobile-detect';


const md = new MobileDetect(window.navigator.userAgent);
const isMobile = md.mobile();

if (isMobile) {
  const elementsToHide = document.querySelectorAll('.no-mobile');
  const mercedes360View = document.getElementById('mercedes-360-view');

  for (let i = 0; elementsToHide.length > i; i++ ) {
    const elem = elementsToHide[i];
    elem.parentNode.removeChild(elem);
  }

  mercedes360View.setAttribute(
    'data-folder',
    'https://scaleflex.cloudimg.io/crop/600x400/n/https://cdn.scaleflex.it/demo/360-car/'
  );
  mercedes360View.setAttribute('data-ratio', '0.666');
  mercedes360View.setAttribute('data-bottom-circle-offset', '22');
}