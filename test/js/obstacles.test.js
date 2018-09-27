const { expect, obstacle, game, skier } = require('../setup');

describe('obstacles', function () {
  it('should return at least one obstacle after placing randoms', function () {
    obstacle.placeRandom(game.width, game.height, game.width, game.height);
    expect(obstacle.obstacles.length).greaterThan(0);
  });

  it('should return more than one obstacle after placing randoms', function () {
    //Available assets will be used instead of loaded ones.
    obstacle.placeInitial(game.width, game.height, game.assets.available);
    expect(obstacle.obstacles.length).greaterThan(1);
  });
});
