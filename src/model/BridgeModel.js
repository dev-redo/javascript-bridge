const { Console, Random } = require('@woowacourse/mission-utils');
const GameModel = require('./GameModel');
const { makeBridge } = require('../BridgeMaker');
const { generate } = require('../BridgeRandomNumberGenerator');
const BridgeMap = require('./BridgeMap');

class BridgeModel extends GameModel {
  #tryCount = 1;
  #position = 0;
  #bridge = [];
  #userBridge = [];

  setBridge(bridgeLength) {
    this.#bridge = makeBridge(Number(bridgeLength), generate);
  }

  addCommandToUserBridge(command) {
    this.#userBridge.push(command);
    this.#position += 1;
  }

  makeMovedResult() {
    const statusForBridgeMap = this.getStatusForBridgeMap();
    return new BridgeMap(statusForBridgeMap).makeUserBridge();
  }

  getStatusForBridgeMap() {
    return {
      position: this.#position,
      bridge: this.#bridge,
      userBridge: this.#userBridge,
    };
  }

  checkIsSuccess(bridgeMap) {}

  setStateToReplay() {
    this.#tryCount += 1;
    this.#position = 0;
    this.#userBridge = [];
  }
}

module.exports = BridgeModel;
