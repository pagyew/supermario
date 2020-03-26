import { loadJSON } from '../loaders.js';
import MusicPlayer from '../MusicPlayer.js';

export function loadMusicSheet(name) {
  return loadJSON(`./music/${name}.json`)
    .then(musicSheet => {
      const player = new MusicPlayer();

      for (const [name, track] of Object.entries(musicSheet)) {
        player.addTrack(name, track.url);
      }

      return player;
    })
};
