$(document).ready(function() {

    var ski = ski || {};

    ski.assets = {
        'skierCrash' : 'img/skier_crash.png',
        'skierLeft' : 'img/skier_left.png',
        'skierLeftDown' : 'img/skier_left_down.png',
        'skierDown' : 'img/skier_down.png',
        'skierRightDown' : 'img/skier_right_down.png',
        'skierRight' : 'img/skier_right.png',
        'tree' : 'img/tree_1.png',
        'treeCluster' : 'img/tree_cluster.png',
        'rock1' : 'img/rock_1.png',
        'rock2' : 'img/rock_2.png'
    };

    ski.loadedAssets = {};

    ski.obstacle = {};

    ski.keyHandler = {};

    ski.obstacle.types = [
        'tree',
        'treeCluster',
        'rock1',
        'rock2'
    ];

    ski.obstacle.obstacles = [];

    ski.gameWidth = window.innerWidth;
    ski.gameHeight = window.innerHeight;

    ski.canvas = $('<canvas></canvas>')
        .attr('width', ski.gameWidth * window.devicePixelRatio)
        .attr('height', ski.gameHeight * window.devicePixelRatio)
        .css({
            width: ski.gameWidth + 'px',
            height: ski.gameHeight + 'px'
        });
    $('body').append(ski.canvas);

    ski.ctx = ski.canvas[0].getContext('2d');

    ski.skier = {};

    ski.skier.direction = 5;
    ski.skier.mapX = 0;
    ski.skier.mapY = 0;
    ski.skier.speed = 8;

    ski.canvas.clear = function() {
        ski.ctx.clearRect(0, 0, ski.gameWidth, ski.gameHeight);
    };

    ski.skier.move = function() {
        switch(ski.skier.direction) {
            case 2:
                ski.skier.mapX -= Math.round(ski.skier.speed / 1.4142);
                ski.skier.mapY += Math.round(ski.skier.speed / 1.4142);

                ski.obstacle.placeNew(ski.skier.direction);
                break;
            case 3:
                ski.skier.mapY += ski.skier.speed;

                ski.obstacle.placeNew(ski.skier.direction);
                break;
            case 4:
                ski.skier.mapX += ski.skier.speed / 1.4142;
                ski.skier.mapY += ski.skier.speed / 1.4142;

                ski.obstacle.placeNew(ski.skier.direction);
                break;
        }
    };

    ski.skier.getAsset = function() {
        var skierAssetName;
        switch(ski.skier.direction) {
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
        }

        return skierAssetName;
    };

    ski.skier.draw = function() {
        var skierAssetName = ski.skier.getAsset();
        var skierImage = ski.loadedAssets[skierAssetName];
        var x = (ski.gameWidth - skierImage.width) / 2;
        var y = (ski.gameHeight - skierImage.height) / 2;

        ski.ctx.drawImage(skierImage, x, y, skierImage.width, skierImage.height);
    };

    ski.obstacle.draw = function() {
        var newObstacles = [];

        _.each(ski.obstacle.obstacles, function(obstacle) {
            var obstacleImage = ski.loadedAssets[obstacle.type];
            var x = obstacle.x - ski.skier.mapX - obstacleImage.width / 2;
            var y = obstacle.y - ski.skier.mapY - obstacleImage.height / 2;

            if(x < -100 || x > ski.gameWidth + 50 || y < -100 || y > ski.gameHeight + 50) {
                return;
            }

            ski.ctx.drawImage(obstacleImage, x, y, obstacleImage.width, obstacleImage.height);

            newObstacles.push(obstacle);
        });

        ski.obstacle.obstacles = newObstacles;
    };

    ski.obstacle.placeInitial = function() {
        var numberObstacles = Math.ceil(_.random(5, 7) * (ski.gameWidth / 800) * (ski.gameHeight / 500));

        var minX = -50;
        var maxX = ski.gameWidth + 50;
        var minY = ski.gameHeight / 2 + 100;
        var maxY = ski.gameHeight + 50;

        for(var i = 0; i < numberObstacles; i++) {
            ski.obstacle.placeRandom(minX, maxX, minY, maxY);
        }

        ski.obstacle.obstacles = _.sortBy(ski.obstacle.obstacles, function(obstacle) {
            var obstacleImage = ski.loadedAssets[obstacle.type];
            return obstacle.y + obstacleImage.height;
        });
    };

    ski.obstacle.placeNew = function(direction) {
        var shouldPlaceObstacle = _.random(1, 8);
        if(shouldPlaceObstacle !== 8) {
            return;
        }

        var leftEdge = ski.skier.mapX;
        var rightEdge = ski.skier.mapX + ski.gameWidth;
        var topEdge = ski.skier.mapY;
        var bottomEdge = ski.skier.mapY + ski.gameHeight;

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

    ski.obstacle.hasHitObstacle = function() {
        var skierAssetName = ski.skier.getAsset();
        var skierImage = ski.loadedAssets[skierAssetName];
        var skierRect = {
            left: ski.skier.mapX + ski.gameWidth / 2,
            right: ski.skier.mapX + skierImage.width + ski.gameWidth / 2,
            top: ski.skier.mapY + skierImage.height - 5 + ski.gameHeight / 2,
            bottom: ski.skier.mapY + skierImage.height + ski.gameHeight / 2
        };

        var collision = _.find(ski.obstacle.obstacles, function(obstacle) {
            var obstacleImage = ski.loadedAssets[obstacle.type];
            var obstacleRect = {
                left: obstacle.x,
                right: obstacle.x + obstacleImage.width,
                top: obstacle.y + obstacleImage.height - 5,
                bottom: obstacle.y + obstacleImage.height
            };

            return ski.intersectRect(skierRect, obstacleRect);
        });

        if(collision) {
            ski.skier.direction = 0;
        }
    };

    ski.intersectRect = function(r1, r2) {
        return !(r2.left > r1.right ||
            r2.right < r1.left ||
            r2.top > r1.bottom ||
            r2.bottom < r1.top);
    };

    ski.gameLoop = function() {

        ski.ctx.save();

        // Retina support
        ski.ctx.scale(window.devicePixelRatio, window.devicePixelRatio);

        ski.canvas.clear();

        ski.skier.move();

        ski.obstacle.hasHitObstacle();

        ski.skier.draw();

        ski.obstacle.draw();

        ski.ctx.restore();

        requestAnimationFrame(ski.gameLoop);
    };

    ski.loadAssets = function() {
        var assetPromises = [];

        _.each(ski.assets, function(asset, assetName) {
            var assetImage = new Image();
            var assetDeferred = new $.Deferred();

            assetImage.onload = function() {
                assetImage.width /= 2;
                assetImage.height /= 2;

                ski.loadedAssets[assetName] = assetImage;
                assetDeferred.resolve();
            };
            assetImage.src = asset;

            assetPromises.push(assetDeferred.promise());
        });

        return $.when.apply($, assetPromises);
    };

    ski.keyHandler.setup = function() {
        $(window).keydown(function(event) {
            switch(event.which) {
                case 37: // left
                    if(ski.skier.direction === 1) {
                        ski.skier.mapX -= ski.skier.speed;
                        ski.obstacle.placeNew(ski.skier.direction);
                    }
                    else {
                        ski.skier.direction--;
                    }
                    event.preventDefault();
                    break;
                case 39: // right
                    if(ski.skier.direction === 5) {
                        ski.skier.mapX += ski.skier.speed;
                        ski.obstacle.placeNew(ski.skier.direction);
                    }
                    else {
                        ski.skier.direction++;
                    }
                    event.preventDefault();
                    break;
                case 38: // up
                    if(ski.skier.direction === 1 || ski.skier.direction === 5) {
                        ski.skier.mapY -= ski.skier.speed;
                        ski.obstacle.placeNew(6);
                    }
                    event.preventDefault();
                    break;
                case 40: // down
                    ski.skier.direction = 3;
                    event.preventDefault();
                    break;
            }
        });
    };

    ski.initGame = function() {
        ski.keyHandler.setup();
        ski.loadAssets().then(function() {
            ski.obstacle.placeInitial();

            requestAnimationFrame(ski.gameLoop);
        });
    };

    ski.initGame(ski.gameLoop);
});
