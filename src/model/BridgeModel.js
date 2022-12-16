const { Random } = require('@woowacourse/mission-utils');
const GameModel = require('./GameModel');
const { makeBridge } = require('../BridgeMaker');
const { generate } = require('../BridgeRandomNumberGenerator');

class BridgeModel extends GameModel {
  #tryCount;
  #position;
  #bridge;
  #userBridge;

  setBridge(bridgeLength) {
    this.#bridge = makeBridge(Number(bridgeLength), generate);
  }
}

module.exports = BridgeModel;
