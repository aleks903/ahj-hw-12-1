import CryptoJS from 'crypto-js';

self.addEventListener('message', (event) => {
  const content = calckHash(event.data.file, event.data.type);
  self.postMessage(content);
  })

  function calckHash(iFile, type) {
    const fr = new FileReaderSync();
    const tr = fr.readAsArrayBuffer(iFile);
    const wordArray = CryptoJS.lib.WordArray.create(tr);
    let hash = null;

    switch (type) {
      case 'SHA1':
        hash = CryptoJS.SHA1(wordArray).toString(CryptoJS.enc.Hex);
        break;
      case 'SHA256':
        hash = CryptoJS.SHA256(wordArray).toString(CryptoJS.enc.Hex);
        break;
      case 'SHA512':
        hash = CryptoJS.SHA512(wordArray).toString(CryptoJS.enc.Hex);
        break;
      default:
        hash = CryptoJS.MD5(wordArray).toString(CryptoJS.enc.Hex);
        break;
    }
    return hash;
  }
