const { expect, MockBrowser, ski, skier, obstacle, game } = require('../setup');

describe('ski', function() {
  it('should return an object for loaded assets', function(){
    ski.game = game;
    ski.obstacle = obstacle;
    ski.skier = skier;

    let document = new MockBrowser().getDocument();

    $(document).ready(ski.onReady);

    expect(ski.game.assets.loaded).to.be.an('object');

  });
});
