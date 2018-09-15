var ski = ski || {};

ski.skier = ski.skier || {};

ski.skier.direction = 5;
ski.skier.mapX = 0;
ski.skier.mapY = 0;
ski.skier.speed = 8;

ski.skier.assets = ski.skier.assets || {};

ski.skier.assets.available = {
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

ski.skier.assets.loaded = {};

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
    }

    return skierAssetName;
};

ski.skier.draw = function() {
    var skierAssetName = ski.skier.getAsset();
    var skierImage = ski.skier.assets.loaded[skierAssetName];
    var x = (ski.game.width - skierImage.width) / 2;
    var y = (ski.game.height - skierImage.height) / 2;

    ski.game.ctx.drawImage(skierImage, x, y, skierImage.width, skierImage.height);
};
