let game =  {};

try {
  obstacle = require('./obstacles') || {};
  skier = require('./skier') || {};
} catch (e) {
  obstacle = obstacle || {};
  skier = skier || {};
}

game.width = window.innerWidth;
game.height = window.innerHeight;

game.canvas = $('<canvas></canvas>')
  .attr('width', game.width * window.devicePixelRatio)
  .attr('height', game.height * window.devicePixelRatio)
  .css({
    width: game.width + 'px',
    height: game.height + 'px'
  });

game.ctx = game.canvas[0].getContext('2d');

game.canvas.clear = function () {
  game.ctx.clearRect(0, 0, game.width, game.height);
};

game.loop = function () {

  game.ctx.save();

  game.ctx.scale(window.devicePixelRatio, window.devicePixelRatio);

  game.canvas.clear();

  skier.move(obstacle, game);

  skier.hasHitObstacle(game, obstacle.obstacles);

  skier.draw(game);

  obstacle.draw(game, skier);

  game.ctx.restore();

  window.requestAnimationFrame(game.loop);
};

game.keyHandler = function () {

  $(window).keydown(function (event) {
    switch (event.which) {
      case 37: // left
        if (skier.direction === 1) {
          skier.mapX -= skier.speed;
          obstacle.placeNew(skier.direction);
        }
        else if (skier.direction !== 0) {
          skier.direction--;
        } else {
          skier.direction = 1;
        }
        event.preventDefault();
        break;
      case 39: // right
        if (skier.direction === 5) {
          skier.mapX += skier.speed;
          obstacle.placeNew(skier.direction);
        }
        else {
          skier.direction++;
        }
        event.preventDefault();
        break;
      case 38: // up
        if (skier.direction === 1 || skier.direction === 5) {
          skier.mapY -= skier.speed;
          obstacle.placeNew(6);
        } else {
          skier.direction = 6;
          obstacle.placeNew(6);
        }

        event.preventDefault();
        break;
      case 40: // down
        skier.direction = 3;
        event.preventDefault();
        break;
    }
  });
};

game.init = function () {
  game.keyHandler();
  skier.assets.load().then(function () {
    obstacle.placeInitial(game.width, game.height, skier.assets.loaded);
    window.requestAnimationFrame(game.loop);
  });
};

/**
* Using try catch since the browser doesn't recognize `module`
*/
try {
  module.exports = exports = game;
} catch (e) { }
