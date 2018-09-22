let obstacle = {};

obstacle.types = [
  'tree',
  'treeCluster',
  'rock1',
  'rock2'
];

obstacle.obstacles = [];

obstacle.draw = function (game, skier) {
  let newObstacles = [];

  _.each(obstacle.obstacles, function (obstacle) {
    const obstacleImage = skier.assets.loaded[obstacle.type];
    const x = obstacle.x - skier.mapX - obstacleImage.width / 2;
    const y = obstacle.y - skier.mapY - obstacleImage.height / 2;

    if (x < -100 || x > game.width + 50 || y < -100 || y > game.height + 50) {
      return;
    }

    game.ctx.drawImage(obstacleImage, x, y, obstacleImage.width, obstacleImage.height);

    newObstacles.push(obstacle);
  });

  obstacle.obstacles = newObstacles;
};

obstacle.placeInitial = function (width, height, loadedAssets) {
  const numberObstacles = Math.ceil(_.random(5, 7) * (width / 800) * (height / 500));

  const minX = -50;
  const maxX = width + 50;
  const minY = height / 2 + 100;
  const maxY = height + 50;

  for (let i = 0; i < numberObstacles; i++) {
    obstacle.placeRandom(minX, maxX, minY, maxY);
  }

  obstacle.obstacles = _.sortBy(obstacle.obstacles, function (obstacle) {
    const obstacleImage = loadedAssets[obstacle.type];
    return obstacle.y + obstacleImage.height;
  });
};

obstacle.placeNew = function (direction, mapX, mapY, width, height) {
  const shouldPlaceObstacle = _.random(1, 8);
  if (shouldPlaceObstacle !== 8) {
    return;
  }

  const leftEdge = mapX;
  const rightEdge = mapX + width;
  const topEdge = mapY;
  const bottomEdge = mapY + height;

  switch (direction) {
    case 1: // left
      obstacle.placeRandom(leftEdge - 50, leftEdge, topEdge, bottomEdge);
      break;
    case 2: // left down
      obstacle.placeRandom(leftEdge - 50, leftEdge, topEdge, bottomEdge);
      obstacle.placeRandom(leftEdge, rightEdge, bottomEdge, bottomEdge + 50);
      break;
    case 3: // down
      obstacle.placeRandom(leftEdge, rightEdge, bottomEdge, bottomEdge + 50);
      break;
    case 4: // right down
      obstacle.placeRandom(rightEdge, rightEdge + 50, topEdge, bottomEdge);
      obstacle.placeRandom(leftEdge, rightEdge, bottomEdge, bottomEdge + 50);
      break;
    case 5: // right
      obstacle.placeRandom(rightEdge, rightEdge + 50, topEdge, bottomEdge);
      break;
    case 6: // up
      obstacle.placeRandom(leftEdge, rightEdge, topEdge - 50, topEdge);
      break;
  }
};


obstacle.placeRandom = function (minX, maxX, minY, maxY) {
  const obstacleIndex = _.random(0, obstacle.types.length - 1);

  const position = obstacle.calculateOpenPosition(minX, maxX, minY, maxY);

  obstacle.obstacles.push({
    type: obstacle.types[obstacleIndex],
    x: position.x,
    y: position.y
  })
};

obstacle.calculateOpenPosition = function (minX, maxX, minY, maxY) {
  const x = _.random(minX, maxX);
  const y = _.random(minY, maxY);

  const foundCollision = _.find(obstacle.obstacles, function (obstacle) {
    return x > (obstacle.x - 50) && x < (obstacle.x + 50) && y > (obstacle.y - 50) && y < (obstacle.y + 50);
  });

  if (foundCollision) {
    return obstacle.calculateOpenPosition(minX, maxX, minY, maxY);
  }
  else {
    return {
      x: x,
      y: y
    }
  }
};

try {
  module.exports = exports = obstacle;
} catch (e) { }
