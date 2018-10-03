import chai from'chai';
import dirtyChai from 'dirty-chai';
import $ from 'jquery';
import _ from 'lodash';
import fs from 'fs';
import mock_browser from 'mock-browser';

var jsdom;
try {
  jsdom = require("jsdom/lib/old-api.js"); // jsdom >= 10.x
} catch (e) {
  jsdom = require("jsdom"); // jsdom <= 9.x
}

const MockBrowser = mock_browser.mocks.MockBrowser;

import ski from '../src/js/index';
import skier from '../src/js/skier';
import obstacle from '../src/js/obstacles';
import game from '../src/js/game';

chai.use(dirtyChai);

const { expect } = chai;

global.$ = global.jQuery = $;
global._ = global.lodash = _;

module.exports = {
  expect,
  MockBrowser,
  $,
  _,
  fs,
  jsdom,
  skier,
  obstacle,
  game,
  ski
};
