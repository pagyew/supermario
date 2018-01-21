import Camera from "./Camera.js";
import Timer from "./Timer.js";
import Entity from "./Entity.js";
import {createLevelLoader} from "./loaders/level.js";
import {loadEntities} from "./entities.js";
import {createCollisionLayer, createCameraLayer} from "./layers.js";
import {setupKeyboard} from "./input.js";
import {setupMouseControl} from "./debug.js";

async function main(canvas) {
  const context = canvas.getContext('2d');
  
  const entityFactory = await loadEntities();
  const loadLevel = await createLevelLoader(entityFactory);
  
  const level = await loadLevel('1-1'); 
  
  const camera = new Camera();
  
  const mario = entityFactory.mario();
  mario.pos.set(64, 64);
  level.entities.add(mario);

  level.comp.layers.push(createCollisionLayer(level));
  
  const input = setupKeyboard(mario);
  input.listenTo(window);
  
  const timer = new Timer(1/60);
  timer.update = function update(deltaTime) {
    level.update(deltaTime);
    
    if (mario.pos.x > 100) {
      camera.pos.x = mario.pos.x - 100;
    }
    
    level.comp.draw(context, camera);
  }
  
  timer.start();
}

const canvas = document.getElementById('screen');
main(canvas);