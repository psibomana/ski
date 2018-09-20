var ski = ski || {};

ski.obstacle = ski.obstacle || {};

ski.obstacle.types = [
    'tree',
    'treeCluster',
    'rock1',
    'rock2'
];

ski.messageCounter= (function(){

    var privateState = 0;

    var incrementCount = function () {
        privateState += 1;
    };

    return function (message) {
        incrementCount();
        //TODO something with the message!
    }
})();

ski.obstacle.obstacles = [];

ski.obstacle.draw = function() {
    var newObstacles = [];

    _.each(ski.obstacle.obstacles, function(obstacle) {
        var obstacleImage = ski.skier.assets.loaded[obstacle.type];
        var x = obstacle.x - ski.skier.mapX - obstacleImage.width / 2;
        var y = obstacle.y - ski.skier.mapY - obstacleImage.height / 2;

        if(x < -100 || x > ski.game.width + 50 || y < -100 || y > ski.game.height + 50) {
            return;
        }

        ski.game.ctx.drawImage(obstacleImage, x, y, obstacleImage.width, obstacleImage.height);

        newObstacles.push(obstacle);
    });

    ski.obstacle.obstacles = newObstacles;
};

ski.obstacle.placeInitial = function() {
    var numberObstacles = Math.ceil(_.random(5, 7) * (ski.game.width / 800) * (ski.game.height / 500));

    var minX = -50;
    var maxX = ski.game.width + 50;
    var minY = ski.game.height / 2 + 100;
    var maxY = ski.game.height + 50;

    for(var i = 0; i < numberObstacles; i++) {
        ski.obstacle.placeRandom(minX, maxX, minY, maxY);
    }

    ski.obstacle.obstacles = _.sortBy(ski.obstacle.obstacles, function(obstacle) {
        var obstacleImage = ski.skier.assets.loaded[obstacle.type];
        return obstacle.y + obstacleImage.height;
    });
};

ski.obstacle.placeNew = function(direction) {
    var shouldPlaceObstacle = _.random(1, 8);
    if(shouldPlaceObstacle !== 8) {
        return;
    }

    var leftEdge = ski.skier.mapX;
    var rightEdge = ski.skier.mapX + ski.game.width;
    var topEdge = ski.skier.mapY;
    var bottomEdge = ski.skier.mapY + ski.game.height;

    switch(direction) {
        case 1: // left
            ski.obstacle.placeRandom(leftEdge - 50, leftEdge, topEdge, bottomEdge);
            break;
        case 2: // left down
            ski.obstacle.placeRandom(leftEdge - 50, leftEdge, topEdge, bottomEdge);
            ski.obstacle.placeRandom(leftEdge, rightEdge, bottomEdge, bottomEdge + 50);
            break;
        case 3: // down
            ski.obstacle.placeRandom(leftEdge, rightEdge, bottomEdge, bottomEdge + 50);
            break;
        case 4: // right down
            ski.obstacle.placeRandom(rightEdge, rightEdge + 50, topEdge, bottomEdge);
            ski.obstacle.placeRandom(leftEdge, rightEdge, bottomEdge, bottomEdge + 50);
            break;
        case 5: // right
            ski.obstacle.placeRandom(rightEdge, rightEdge + 50, topEdge, bottomEdge);
            break;
        case 6: // up
            ski.obstacle.placeRandom(leftEdge, rightEdge, topEdge - 50, topEdge);
            break;
    }
};


ski.obstacle.placeRandom = function(minX, maxX, minY, maxY) {
    var obstacleIndex = _.random(0, ski.obstacle.types.length - 1);

    var position = ski.obstacle.calculateOpenPosition(minX, maxX, minY, maxY);

    ski.obstacle.obstacles.push({
        type : ski.obstacle.types[obstacleIndex],
        x : position.x,
        y : position.y
    })
};

ski.obstacle.calculateOpenPosition = function(minX, maxX, minY, maxY) {
    var x = _.random(minX, maxX);
    var y = _.random(minY, maxY);

    var foundCollision = _.find(ski.obstacle.obstacles, function(obstacle) {
        return x > (obstacle.x - 50) && x < (obstacle.x + 50) && y > (obstacle.y - 50) && y < (obstacle.y + 50);
    });

    if(foundCollision) {
        return ski.obstacle.calculateOpenPosition(minX, maxX, minY, maxY);
    }
    else {
        return {
            x: x,
            y: y
        }
    }
};

ski.obstacle.intersectRect = function(r1, r2) {
    return !(r2.left > r1.right ||
        r2.right < r1.left ||
        r2.top > r1.bottom ||
        r2.bottom < r1.top);
};

ski.obstacle.hasHitObstacle = function() {
    var skierAssetName = ski.skier.getAsset();
    var skierImage = ski.skier.assets.loaded[skierAssetName];
    var skierRect = {
        left: ski.skier.mapX + ski.game.width / 2,
        right: ski.skier.mapX + skierImage.width + ski.game.width / 2,
        top: ski.skier.mapY + skierImage.height - 5 + ski.game.height / 2,
        bottom: ski.skier.mapY + skierImage.height + ski.game.height / 2
    };

    var collision = _.find(ski.obstacle.obstacles, function(obstacle) {
        var obstacleImage = ski.skier.assets.loaded[obstacle.type];
        var obstacleRect = {
            left: obstacle.x,
            right: obstacle.x + obstacleImage.width,
            top: obstacle.y + obstacleImage.height - 5,
            bottom: obstacle.y + obstacleImage.height
        };

        return (ski.obstacle.intersectRect(skierRect, obstacleRect)
                && !(ski.skier.dirrection in ski.skier.jumpingDirections));
    });

    if(collision) {
        ski.skier.direction = 0;
    }
};
