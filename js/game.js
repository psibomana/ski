$(document).ready(function() {

    ski.skier = ski.skier;
    ski.obstacle = ski.obstacle;

    ski.game = ski.game || {};
    ski.game.width = window.innerWidth;
    ski.game.height = window.innerHeight;

    ski.game.canvas = $('<canvas></canvas>')
        .attr('width', ski.game.width * window.devicePixelRatio)
        .attr('height', ski.game.height * window.devicePixelRatio)
        .css({
            width: ski.game.width + 'px',
            height: ski.game.height + 'px'
        });

    $('body').append(ski.game.canvas);

    ski.game.ctx = ski.game.canvas[0].getContext('2d');

    ski.game.canvas.clear = function() {
        ski.game.ctx.clearRect(0, 0, ski.game.width, ski.game.height);
    };

    ski.game.loop = function() {

        ski.game.ctx.save();

        // Retina support
        ski.game.ctx.scale(window.devicePixelRatio, window.devicePixelRatio);

        ski.game.canvas.clear();

        ski.skier.move();

        ski.obstacle.hasHitObstacle();

        ski.skier.draw();

        ski.obstacle.draw();

        ski.game.ctx.restore();

        requestAnimationFrame(ski.game.loop);
    };

    ski.game.keyHandler = function() {
        $(window).keydown(function(event) {
            switch(event.which) {
                case 37: // left
                    if(ski.skier.direction === 1) {
                        ski.skier.mapX -= ski.skier.speed;
                        ski.obstacle.placeNew(ski.skier.direction);
                    }
                    else if(ski.skier.direction !== 0) {
                        ski.skier.direction--;
                    } else {
                        ski.skier.direction = 1;
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
                    } else {
                        ski.skier.direction = 6;
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

    ski.game.init = function() {
        ski.game.keyHandler();
        ski.skier.assets.load().then(function() {
            ski.obstacle.placeInitial();

            requestAnimationFrame(ski.game.loop);
        });
    };

    ski.game.init(ski.game.loop);
});
