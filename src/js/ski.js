var ski = ski || {};

try {

  var { skier } = require('./skier');
  var { obstacle } = require('./obstacles');
  var { game } = require('./game');

  ski.skier = skier;
  ski.obstacle = obstacle;
  ski.game = game;

} catch(e) {

  ski.skier = ski.skier;
  ski.obstacle = ski.obstacle;
  ski.game = ski.game;

}

ski.onReady = function() {
  $('body').append(ski.game.canvas);
  ski.game.init(ski.skier, ski.obstacle);
}

$(document).ready(ski.onReady);

try {
   module.exports = exports = ski;
} catch (e) {}
