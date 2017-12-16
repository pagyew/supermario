import Timer from './Timer.js';
import Entity from './Entity.js';
import {loadLevel} from './loaders.js';
import {createMario} from './entities.js';
import {createCollisionLayer} from './layers.js';
import {setupKeyboard} from './input.js';

const canvas = document.getElementById('screen');
const ctx = canvas.getContext('2d');

Promise.all([
  createMario(),
  loadLevel('1-1')
])
.then(([mario, level]) => {
  mario.pos.set(64, 180);
  
  // level.comp.layers.push(createCollisionLayer(level));
  
  level.entities.add(mario);

  const input = setupKeyboard(mario);
  input.listenTo(window);

  const timer = new Timer(1/60);
  timer.update = function update(deltaTime) {
    level.update(deltaTime);
    
    level.comp.draw(ctx);
  }

  timer.start();
});