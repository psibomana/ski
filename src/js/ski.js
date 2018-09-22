var ski = ski || {};

try {

  const skier  = require('./skier');
  const obstacle = require('./obstacles');
  const game = require('./game');

  ski.skier = skier;
  ski.obstacle = obstacle;
  ski.game = game;

} catch(e) {

  ski.skier = skier;
  ski.obstacle = obstacle;
  ski.game = game;

}

ski.onReady = function() {
  $('body').append(ski.game.canvas);
  ski.game.init(ski.skier, ski.obstacle);
}

$(document).ready(ski.onReady);

try {
   module.exports = exports = ski;
} catch (e) {}
