const chai = require('chai');
const dirtyChai = require('dirty-chai');
const MockBrowser = require('mock-browser').mocks.MockBrowser;

let ski = require('../src/js/ski');
let skier = require('../src/js/skier');
let obstacle = require('../src/js/obstacles');
let game = require('../src/js/game');

chai.use(dirtyChai);

const { expect } = chai;


module.exports = {
  expect,
  MockBrowser,
  skier,
  obstacle,
  game,
  ski
};
