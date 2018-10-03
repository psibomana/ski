import game from './game';
import skier from './skier';
import obstacle from './obstacles';
import $ from 'jquery';

let ski = ski || {};

ski.onReady = () => {
  $('body').append(game.canvas);
  game.init(skier, obstacle);
}

$(document).ready(ski.onReady);

export default ski;

