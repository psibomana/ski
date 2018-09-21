const { assert, expect, should } = require('chai');
var { obstacle } = require('../../src/js/obstacles');
var { game } = require('../../src/js/game');
var { skier } = require('../../src/js/skier');


it('should return at least one obstacle after placing randoms', function(){
  obstacle.placeRandom(game.width, game.height, game.width, game.height);
  expect(obstacle.obstacles.length).greaterThan(0);
});

it('should return true if an obstacle has been intersected', function(){
  // Setting Position of the obstacle
  var posObstacle = {
    left: 55,
    right: 56,
    top: 49,
    bottom:  86
  };

  // Setting Position of the obstacle
  var posSkier = {
    left: 40,
    right: 60,
    top: 15,
    bottom:  63
  };

  expect(obstacle.intersectRect(posObstacle, posSkier)).to.eql(true);
});
