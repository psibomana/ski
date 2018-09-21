const { assert, expect, should } = require('chai');
var { skier } = require('../../src/js/skier');
var { obstacle } = require('../../src/js/obstacles');
var { game } = require('../../src/js/game');

it('should return a string as asset name', function(){
  expect(skier.getAsset()).to.be.a('string');
});

it('should return a different position', function(){
  var initialMapX = skier.mapX;
  var initialMapY = skier.mapY;
  var finalMapX = finalMapY = 0;

  // Set random direction and move
  skier.direction = Math.floor(Math.random() * 3) + 1;
  skier.move(obstacle, game);

  // Set random direction and move
  skier.direction = Math.floor(Math.random() * 3) + 1;
  skier.move(obstacle, game);

  // Set random direction and move
  skier.direction = Math.floor(Math.random() * 3) + 1;
  skier.move(obstacle, game);

  // Wait for 3sec for the skier to move and get final position
  setTimeout(function(){
    finalMapX= skier.mapX;
    finalMapY = skier.mapY;

    expect(initialMapX).to.not.eql(finalMapX);
    expect(initialMapY).to.not.eql(finalMapY);
  }, 3000);
});
