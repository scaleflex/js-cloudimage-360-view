import './mobile.init';
import '../../src';
import './style.css';
import './assets/fonts/helvetica-neue.css';
import hljs from 'highlight.js/lib/highlight';
import javascript from 'highlight.js/lib/languages/javascript';
import 'highlight.js/styles/github.css';

hljs.registerLanguage('javascript', javascript);
hljs.initHighlightingOnLoad();


const spinner = document.getElementById('spinner');
const wrapper = document.getElementById('main');

wrapper.classList.add('active');
spinner.style.display = 'none';