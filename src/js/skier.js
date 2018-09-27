import _ from 'lodash';

let skier =  {};

skier.direction = 5;
skier.mapX = 0;
skier.mapY = 0;
skier.speed = 8;

skier.jumpingDirections = [6, 7, 8, 9, 10];


skier.getAsset = function () {
  let skierAssetName;
  switch (skier.direction) {
    case 0:
      skierAssetName = 'skierCrash';
      break;
    case 1:
      skierAssetName = 'skierLeft';
      break;
    case 2:
      skierAssetName = 'skierLeftDown';
      break;
    case 3:
      skierAssetName = 'skierDown';
      break;
    case 4:
      skierAssetName = 'skierRightDown';
      break;
    case 5:
      skierAssetName = 'skierRight';
      break;
    case 6:
      skierAssetName = 'skierJump1';
      break;
    case 7:
      skierAssetName = 'skierJump2';
      break;
    case 8:
      skierAssetName = 'skierJump3';
      break;
    case 9:
      skierAssetName = 'skierJump4';
      break;
    case 10:
      skierAssetName = 'skierJump5';
      break;
  }

  return skierAssetName;
};

skier.move = function (obstacle, game) {
  switch (skier.direction) {
    case 2:
      skier.mapX -= Math.round(skier.speed / 1.4142);
      skier.mapY += Math.round(skier.speed / 1.4142);

      obstacle.placeNew(skier.direction, skier.mapX, skier.mapY, game.width, game.height);
      break;
    case 3:
      skier.mapY += skier.speed;

      obstacle.placeNew(skier.direction, skier.mapX, skier.mapY, game.width, game.height);
      break;
    case 4:
      skier.mapX += skier.speed / 1.4142;
      skier.mapY += skier.speed / 1.4142;

      obstacle.placeNew(skier.direction, skier.mapX, skier.mapY, game.width, game.height);
      break;
    case 6:
    case 7:
    case 8:
    case 9:
    case 10:
      skier.mapY += skier.speed;
      obstacle.placeNew(skier.direction, skier.mapX, skier.mapY, game.width, game.height);
      if (skier.direction === 10) {
        skier.direction = 3;
      } else {
        skier.direction++;
      }
      break;
  }
};


skier.draw = function (game) {

  const skierAssetName = skier.getAsset();
  const skierImage = game.assets.loaded[skierAssetName];
  const x = (game.width - skierImage.width) / 2;
  const y = (game.height - skierImage.height) / 2;

  game.ctx.drawImage(skierImage, x, y, skierImage.width, skierImage.height);
};


skier.intersectRect = function (r1, r2) {
  return !(r2.left > r1.right ||
    r2.right < r1.left ||
    r2.top > r1.bottom ||
    r2.bottom < r1.top);
};


skier.hasHitObstacle = function (game, obstacles) {
  const skierAssetName = skier.getAsset();
  const skierImage = game.assets.loaded[skierAssetName];
  const skierRect = {
    left: skier.mapX + game.width / 2,
    right: skier.mapX + skierImage.width + game.width / 2,
    top: skier.mapY + skierImage.height - 5 + game.height / 2,
    bottom: skier.mapY + skierImage.height + game.height / 2
  };

  const collision = _.find(obstacles, function (obstacle) {
    const obstacleImage = game.assets.loaded[obstacle.type];
    const obstacleRect = {
      left: obstacle.x,
      right: obstacle.x + obstacleImage.width,
      top: obstacle.y + obstacleImage.height - 5,
      bottom: obstacle.y + obstacleImage.height
    };

    return (skier.intersectRect(skierRect, obstacleRect)
      && !(skier.dirrection in skier.jumpingDirections));
  });

  if (collision) {
    skier.direction = 0;
  }
};

export default skier;
