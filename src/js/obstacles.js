/**
 * Game obstacles module.
 */
import _ from 'lodash';

let obstacle = {};

// Type of obstacles
obstacle.types = [
  'tree',
  'treeCluster',
  'rock1',
  'rock2'
];

// Array of placed obstacles
obstacle.obstacles = [];

/**
 * Draws obstacles based on the skier position
 * @param {object} game Game object
 * @param {object} skier Skier object
 */
obstacle.draw = (game, skier) => {
  let newObstacles = [];

  _.each(obstacle.obstacles, (obstacle) => {
    const obstacleImage = game.assets.loaded[obstacle.type];
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

/**
 * Draws random initiale obstacles.
 * @param {number} width Browser screen width
 * @param {number} height Browser screen height
 * @param {Array} loadedAssets Array of loaded assets
 */
obstacle.placeInitial = (width, height, loadedAssets) => {
  const numberObstacles = Math.ceil(_.random(5, 7) * (width / 800) * (height / 500));

  const minX = -50;
  const maxX = width + 50;
  const minY = height / 2 + 100;
  const maxY = height + 50;

  for (let i = 0; i < numberObstacles; i++) {
    obstacle.placeRandom(minX, maxX, minY, maxY);
  }

  obstacle.obstacles = _.sortBy(obstacle.obstacles, (obstacle) => {
    const obstacleImage = loadedAssets[obstacle.type];
    return obstacle.y + obstacleImage.height;
  });
};

/**
 * Place random obstacles based on the direction and position of the skier.
 * @param {number} direction Skier current direction
 * @param {number} mapX Skier current X position
 * @param {number} mapY Skier current Y position
 * @param {number} width Browser screen width
 * @param {number} height Browser screen height
 */
obstacle.placeNew = (direction, mapX, mapY, width, height) => {
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

/**
 * Place random obstacles
 * @param {number} minX Lowest X position to draw obstacle
 * @param {number} maxX Highest X position to draw obstacle
 * @param {number} minY Lowest Y position to draw obstacle
 * @param {number} maxY Highest Y position to draw obstacle
 */
obstacle.placeRandom = (minX, maxX, minY, maxY) => {
  // Randomly pick the obstacle type index from the obstacle type array.
  const obstacleIndex = _.random(0, obstacle.types.length - 1);

  // Get available position
  const position = obstacle.calculateOpenPosition(minX, maxX, minY, maxY);

  // Add new placed obstacle in the array of obstacles
  obstacle.obstacles.push({
    type: obstacle.types[obstacleIndex],// Apply obstacle type
    x: position.x,
    y: position.y
  })
};

/**
 * Calculate available position to place a new obstacle.
 * Used to prevent from placing multiple obstacles in the same position.
 * @param {number} minX Lowest X position to consider
 * @param {number} maxX Hight X position to consider
 * @param {number} minY Lowest Y position to consider
 * @param {number} maxY Hight Y position to consider
 */
obstacle.calculateOpenPosition = (minX, maxX, minY, maxY) => {
  const x = _.random(minX, maxX);
  const y = _.random(minY, maxY);

  const foundCollision = _.find(obstacle.obstacles, (obstacle) => {
    return x > (obstacle.x - 50) && x < (obstacle.x + 50) && y > (obstacle.y - 50) && y < (obstacle.y + 50);
  });

  /**
   * In case the calculated open position already has an obstacle
   *  execute again thte function to get a new position.
   */
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

// Export obstacle module
export default obstacle;

