/**
 * Game component. This file contains all the methods and values 
 * for the game on the canvas.
 */

import skier from './skier';
import obstacle from './obstacles';
import $ from 'jquery';
import _ from 'lodash';

import skier_crash from '../img/skier_crash.png';
import skier_left from '../img/skier_left.png';
import skier_left_down from '../img/skier_left_down.png';
import skier_down from '../img/skier_down.png';
import skier_right_down from '../img/skier_right_down.png';
import skier_right from '../img/skier_right.png';
import skier_jump_1 from '../img/skier_jump_1.png';
import skier_jump_2 from '../img/skier_jump_2.png';
import skier_jump_3 from '../img/skier_jump_3.png';
import skier_jump_4 from '../img/skier_jump_4.png';
import skier_jump_5 from '../img/skier_jump_5.png';
import tree from '../img/tree_1.png';
import tree_cluster from '../img/tree_cluster.png';
import rock_1 from '../img/rock_1.png';
import rock_2 from '../img/rock_2.png';

let game =  {};

game.assets = game.assets || {};

// List of game assets.
game.assets.available = {
  'skierCrash': skier_crash,
  'skierLeft': skier_left,
  'skierLeftDown': skier_left_down,
  'skierDown': skier_down,
  'skierRightDown': skier_right_down,
  'skierRight': skier_right,
  'skierJump1': skier_jump_1,
  'skierJump2': skier_jump_2,
  'skierJump3': skier_jump_3,
  'skierJump4': skier_jump_4,
  'skierJump5': skier_jump_5,
  'tree': tree,
  'treeCluster': tree_cluster,
  'rock1': rock_1,
  'rock2': rock_2
};

game.assets.loaded = {};

// Browser width
game.width = window.innerWidth;
// Browser height
game.height = window.innerHeight;
// Game starting time
game.startTime = new Date(); 


/**
 * Function responsible to load different assets on the browser
 */
game.assets.load = () => {
  let assetPromises = [];

  _.each(game.assets.available, (asset, assetName) => {
    const assetImage = new Image();
    const assetDeferred = new $.Deferred();

    assetImage.onload = () => {
      assetImage.width /= 2;
      assetImage.height /= 2;

      game.assets.loaded[assetName] = assetImage;
      assetDeferred.resolve(game.assets.loaded);
    };
    assetImage.src = asset;

    assetPromises.push(assetDeferred.promise());
  });
  return $.when.apply($, assetPromises);
};


// Canvas, where all the ressources will be displayed.
game.canvas = $('<canvas></canvas>')
  .attr('width', game.width * window.devicePixelRatio)
  .attr('height', game.height * window.devicePixelRatio)
  .css({
    width: game.width + 'px',
    height: game.height + 'px'
  });

// Canvas Contex
game.ctx = game.canvas[0].getContext('2d');

// Responsible to clear the canvas for a new redraw/repaint
game.canvas.clear = () => {
  game.ctx.clearRect(0, 0, game.width, game.height);
};


/**
 * Game loop
 * This function  keeps the canvas updating with new values.
 */
game.loop = () => {

  game.ctx.save();

  game.ctx.scale(window.devicePixelRatio, window.devicePixelRatio);

  game.canvas.clear();

  skier.move(obstacle, game);

  skier.hasHitObstacle(game, obstacle.obstacles);

  skier.draw(game);

  obstacle.draw(game, skier);

  game.ctx.restore();

  window.requestAnimationFrame(game.loop);
};

/**
 * Game timer
 */
setTimeout(() => {
  game.time += 1;
}, 1000);

/**
 *  Function responsible to interpret the user input.
 *  User input can be and key on the keyboard.
 */
game.keyHandler = () => {

  $(window).keydown((event) => {
    switch (event.which) {
      case 37: // left
        if (skier.direction === 1) {
          skier.mapX -= skier.speed;
          obstacle.placeNew(skier.direction);
        }
        else if (skier.direction !== 0) {
          skier.direction--;
        } else {
          skier.direction = 1;
        }
        event.preventDefault();
        break;
      case 39: // right
        if (skier.direction === 5) {
          skier.mapX += skier.speed;
          obstacle.placeNew(skier.direction);
        }
        else {
          skier.direction++;
        }
        event.preventDefault();
        break;
      case 38: // up
        if (skier.direction === 1 || skier.direction === 5) {
          skier.mapY -= skier.speed;
          obstacle.placeNew(6);
        } else {
          skier.direction = 6;
          obstacle.placeNew(6);
        }

        event.preventDefault();
        break;
      case 40: // down
        skier.direction = 3;
        event.preventDefault();
        break;
    }
  });
};


/**
 * Game initialization function.
 */
game.init = () => {
  game.keyHandler(); // Initiat the key handler
  // Load game assets and place initial game images (assets)
  game.assets.load().then(() => {
    obstacle.placeInitial(game.width, game.height, game.assets.loaded);
    window.requestAnimationFrame(game.loop); // Update animation on screen
  });
};

// Export the game module
export default game;
