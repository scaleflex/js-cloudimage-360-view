import './mobile.init';
import '../../src';
import './style.css';
import './assets/fonts/helvetica-neue.css';
import hljs from 'highlight.js/lib/core';
import javascript from 'highlight.js/lib/languages/javascript';
import 'highlight.js/styles/github.css';

hljs.registerLanguage('javascript', javascript);
hljs.initHighlightingOnLoad();


const spinner = document.getElementById('spinner');
const wrapper = document.getElementById('main');

wrapper.classList.add('active');
spinner.style.display = 'none';


const cloudimageModalOverlay = document.getElementById('cloudimage-modal-overlay');
const showModalBtn = document.getElementById('show-modal-btn');
const cloudimageModal = document.getElementById('cloudimage-modal');


showModalBtn.onclick = openModalPreview;
cloudimageModalOverlay.onclick = closeModalPreview;


function openModalPreview() {
  cloudimageModal.style.display = 'flex';
  cloudimageModalOverlay.style.display = 'block';
  document.body.style.overflowY = 'hidden';
}

function closeModalPreview() {
  cloudimageModal.style.display = 'none';
  cloudimageModalOverlay.style.display = 'none';
  document.body.style.overflowY = 'visible';
}