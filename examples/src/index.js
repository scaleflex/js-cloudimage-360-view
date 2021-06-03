import './mobile.init';
import '../../src';
import './style.css';
import './assets/fonts/helvetica-neue.css';
import hljs from 'highlight.js/lib/highlight';
import javascript from 'highlight.js/lib/languages/javascript';
import 'highlight.js/styles/github.css';

hljs.registerLanguage('javascript', javascript);
hljs.initHighlightingOnLoad();


const toggleModalBtn = document.getElementById('toggle-modal');
toggleModalBtn.onclick = toggleModal;

function toggleModal() {
    const modalView = document.getElementById('modal-view');

    if ( (!modalView.style.display) || (modalView.style.display === 'none') ) {
        modalView.style.display = 'flex';
        toggleModalBtn.innerHTML = 'hide modal';
    } else {
        modalView.style.display = 'none';
        toggleModalBtn.innerHTML = 'show modal';
    }
}

const spinner = document.getElementById('spinner');
const wrapper = document.getElementById('main');

wrapper.classList.add('active');
spinner.style.display = 'none';