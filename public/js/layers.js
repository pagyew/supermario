export function createBackgroundLayer(level, sprites) {
  const buffer = document.createElement('canvas');
  buffer.width = 256;
  buffer.height = 240;

  const ctx = buffer.getContext('2d');

  level.tiles.forEach((tile, x, y) => {
    sprites.drawTile(tile.name, ctx, x, y);
  });

  return function drawBackfroundLayer(ctx) {
    ctx.drawImage(buffer, 0, 0);
  }
}

export function createSpriteLayer(entities) {
  return function drawSpriteLayer(ctx) {
    entities.forEach(entity => {
      entity.draw(ctx);
    });
  }
}