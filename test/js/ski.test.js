const { expect, MockBrowser } = require('../setup');
const ski = require('../../src/js/ski');
const { skier } = require('../../src/js/skier');
const { obstacle } = require('../../src/js/obstacles');
const { game } = require('../../src/js/game');

describe('ski', function() {
  it('should return an object for loaded assets', function(){
    ski.game = game;
    ski.obstacle = obstacle;
    ski.skier = skier;

    let document = new MockBrowser().getDocument();

    $(document).ready(ski.onReady);
    
    expect(ski.skier.assets.loaded).to.be.an('object');

  });
});
