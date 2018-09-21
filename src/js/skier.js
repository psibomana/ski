var ski = ski || {};

ski.skier = ski.skier || {};

ski.skier.direction = 5;
ski.skier.mapX = 0;
ski.skier.mapY = 0;
ski.skier.speed = 8;

ski.skier.assets = ski.skier.assets || {};

ski.skier.assets.available = {
    'skierCrash' : './src/img/skier_crash.png',
    'skierLeft' : './src/img/skier_left.png',
    'skierLeftDown' : './src/img/skier_left_down.png',
    'skierDown' : './src/img/skier_down.png',
    'skierRightDown' : './src/img/skier_right_down.png',
    'skierRight' : './src/img/skier_right.png',
    'skierJump1' : './src/img/skier_jump_1.png',
    'skierJump2' : './src/img/skier_jump_2.png',
    'skierJump3' : './src/img/skier_jump_3.png',
    'skierJump4' : './src/img/skier_jump_4.png',
    'skierJump5' : './src/img/skier_jump_5.png',
    'tree' : './src/img/tree_1.png',
    'treeCluster' : './src/img/tree_cluster.png',
    'rock1' : './src/img/rock_1.png',
    'rock2' : './src/img/rock_2.png'
};

ski.skier.assets.loaded = {};

ski.skier.jumpingDirections = [6, 7, 8, 9, 10];

ski.skier.assets.load = function() {
    var assetPromises = [];

    _.each(ski.skier.assets.available, function(asset, assetName) {
        var assetImage = new Image();
        var assetDeferred = new $.Deferred();

        assetImage.onload = function() {
            assetImage.width /= 2;
            assetImage.height /= 2;

            ski.skier.assets.loaded[assetName] = assetImage;
            assetDeferred.resolve();
        };
        assetImage.src = asset;

        assetPromises.push(assetDeferred.promise());
    });
    return $.when.apply($, assetPromises);
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

ski.skier.move = function(obstacle, game) {
    switch(ski.skier.direction) {
        case 2:
            ski.skier.mapX -= Math.round(ski.skier.speed / 1.4142);
            ski.skier.mapY += Math.round(ski.skier.speed / 1.4142);

            obstacle.placeNew(ski.skier.direction, ski.skier.mapX, ski.skier.mapY, game.width, game.height);
            break;
        case 3:
            ski.skier.mapY += ski.skier.speed;

            obstacle.placeNew(ski.skier.direction, ski.skier.mapX, ski.skier.mapY, game.width, game.height);
            break;
        case 4:
            ski.skier.mapX += ski.skier.speed / 1.4142;
            ski.skier.mapY += ski.skier.speed / 1.4142;

            obstacle.placeNew(ski.skier.direction, ski.skier.mapX, ski.skier.mapY, game.width, game.height);
            break;
        case 6:
        case 7:
        case 8:
        case 9:
        case 10:
            ski.skier.mapY += ski.skier.speed;
            obstacle.placeNew(ski.skier.direction, ski.skier.mapX, ski.skier.mapY, game.width, game.height);
            if(ski.skier.direction === 10){
              ski.skier.direction = 3;
            } else {
              ski.skier.direction++;
            }
            break;
    }
};


ski.skier.draw = function(game) {

    var skierAssetName = ski.skier.getAsset();
    var skierImage = ski.skier.assets.loaded[skierAssetName];
    var x = (game.width - skierImage.width) / 2;
    var y = (game.height - skierImage.height) / 2;

    game.ctx.drawImage(skierImage, x, y, skierImage.width, skierImage.height);
};

try {
   module.exports = exports = ski;
} catch (e) {}
