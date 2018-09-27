const { expect, MockBrowser, skier, obstacle, game } = require('../setup');

describe('skier', function () {
  it('should return a string as asset name', function () {
    expect(skier.getAsset()).to.be.a('string');
  });

  it('should return a different position', function () {
    const initialMapX = skier.mapX;
    const initialMapY = skier.mapY;
    let finalMapX = 0;
    let finalMapY = 0;

    skier.direction = Math.floor(Math.random() * 3) + 1;
    skier.move(obstacle, game);
    skier.direction = Math.floor(Math.random() * 3) + 1;
    skier.move(obstacle, game);
    skier.direction = Math.floor(Math.random() * 3) + 1;
    skier.move(obstacle, game);

    setTimeout(function () {
      finalMapX = skier.mapX;
      finalMapY = skier.mapY;

      expect(initialMapX).to.not.eql(finalMapX);
      expect(initialMapY).to.not.eql(finalMapY);
    }, 3000);
  });

  it('should return an non empty loaded obstacles object', function() {
    game.assets.load().then(function () {
      obstacle.placeInitial(game.width, game.height, game.assets.loaded);
    }).catch(function(err) {
      console.log(err);
    });

    expect(game.assets.loaded).to.be.an('object');

  });

  it('should return true if an obstacle has been intersected', function () {
    const posObstacle = {
      left: 55,
      right: 56,
      top: 49,
      bottom: 86
    };
    const posSkier = {
      left: 40,
      right: 60,
      top: 15,
      bottom: 63
    };

    expect(skier.intersectRect(posObstacle, posSkier)).to.be.true;
  });

});
