import game from './game';
import skier from './skier';
import obstacle from './obstacles';
import $ from 'jquery';
import '../css/game.css';

let ski = ski || {};

// Game rules
let rules = `The object of the game is to ski down 
              an endless slope and avoid the obstacles.
              Use Space Key to Start, Pause or Resume the game,
              Upper key on the keyboard to jump and 
              Left and Right respectively to turn Left and Right.`;

ski.onReady = () => {
  $('body').append("<h1>Game Rules</h1>");
  $('body').append("<p>" + rules + "</p>");
  $('body').append(game.canvas);
  game.init(skier, obstacle);
}

// Initialize the game on browser ready using JQuery
$(document).ready(ski.onReady);

// Export ski game module
export default ski;

