$(document).ready(function() {
    ski.skier = ski.skier;
    ski.obstacle = ski.obstacle;
    ski.game = ski.game;

    $('body').append(ski.game.canvas);

    ski.game.init(ski.game.loop);
});
