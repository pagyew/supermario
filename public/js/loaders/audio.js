import { loadJSON } from '../loaders.js';
import AudioBoard from '../AudioBoard.js';

export function loadAudioBoard(name, audioContext) {
  const loadAudio = createAudioLoader(audioContext);

  return loadJSON(`/sounds/${name}.json`)
    .then(audioSheet => {
      const { fx } = audioSheet;
      const audioBoard = new AudioBoard(audioContext);
      const jobs = [];

      Object.keys(fx).forEach(key => {
        const { url } = fx[key];
        const job = loadAudio(url)
          .then(buffer => {
            audioBoard.addAudio(key, buffer);
          })
        
        jobs.push(job);
      });

      return Promise.all(jobs).then(() => audioBoard);
    });
};

export function createAudioLoader(context) {
  return function loadAudio(url) {
    return fetch(url)
      .then(response => response.arrayBuffer())
      .then(arrayBuffer => context.decodeAudioData(arrayBuffer));
  };
};
