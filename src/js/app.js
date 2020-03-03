import AddImg from './AddImg.js';
import Worker from './web-worker.js';

// const blockImg = document.getElementsByClassName('block-img')[0];
// const elementError = document.getElementById('error-url');

const elChangeAlgoritm = document.querySelector('#change-algoritm');
const elValuuAlgoritm = document.querySelector('.value-algoritm');
const elPrintHash = document.querySelector('.print-hash');
const buttonSelectFile = document.querySelector('#button-select');
const elSelectFile = document.querySelector('#drop-file');

// const addImg = new AddImg(blockImg, elementError);
const server = 'http://localhost:7070';
// const server = 'https://heroku-ahj-7-3.herokuapp.com';
let itemFile = null;

async function loadFile(files) {
  
  itemFile = files;
  // console.log(itemFile);
  calculateHash();
  // for (const item of files) {
    // *****************************************
    
  // }
}

function calculateHash() {
  if (itemFile !== null) {
    const worker = new Worker();
    worker.addEventListener('message', (event) => {
      console.log(event.data);
      elPrintHash.textContent = event.data;
      // console.log(result);
      worker.terminate();
    });
  
    worker.postMessage({
      file: itemFile,
      type: elValuuAlgoritm.textContent,
    });
  }
}

elSelectFile.addEventListener('click', () => {
  buttonSelectFile.value = null;
  buttonSelectFile.dispatchEvent(new MouseEvent('click'));
});

elSelectFile.addEventListener('dragover', (event) => {
  event.preventDefault();
});

elSelectFile.addEventListener('drop', (event) => {
  event.preventDefault();
  const files = event.dataTransfer.files[0];
  loadFile(files);
});

buttonSelectFile.addEventListener('change', (event) => {
  const files = event.currentTarget.files[0];
  loadFile(files);
});

elChangeAlgoritm.addEventListener('click', () => {
  event.target
  if(event.target.classList.contains('item-algoritm')) {
    elChangeAlgoritm.classList.add('hidden');
    elValuuAlgoritm.textContent = event.target.textContent;
    calculateHash();
  }
  // console.log(elChangeAlgoritm.value);
});

elValuuAlgoritm.addEventListener('click', () => {
  elChangeAlgoritm.classList.remove('hidden');
})
