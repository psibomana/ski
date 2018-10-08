import game from './game';
import skier from './skier';
import obstacle from './obstacles';
import $ from 'jquery';

let ski = ski || {};

ski.onReady = () => {
  $('body').append(game.canvas);
  game.init(skier, obstacle);
}

// Initialize the game on browser ready using JQuery
$(document).ready(ski.onReady);

// Export ski game module
export default ski;

