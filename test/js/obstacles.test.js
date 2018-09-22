const { expect } = require('../setup');
const { obstacle } = require('../../src/js/obstacles');
const { game } = require('../../src/js/game');
const { skier } = require('../../src/js/skier');

describe('obstacles', function () {
  it('should return at least one obstacle after placing randoms', function () {
    obstacle.placeRandom(game.width, game.height, game.width, game.height);
    expect(obstacle.obstacles.length).greaterThan(0);
  });

  it('should return more than one obstacle after placing randoms', function () {
    //Available assets will be used instead of loaded ones.
    obstacle.placeInitial(game.width, game.height, skier.assets.available);
    expect(obstacle.obstacles.length).greaterThan(1);
  });
});
