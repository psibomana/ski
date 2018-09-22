const chai = require('chai');
const dirtyChai = require('dirty-chai');
const MockBrowser = require('mock-browser').mocks.MockBrowser;

chai.use(dirtyChai);

const { expect } = chai;


module.exports = {
  expect,
  MockBrowser
};
