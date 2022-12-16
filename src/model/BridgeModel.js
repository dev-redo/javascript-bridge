const GameModel = require('./GameModel');
const { makeBridge } = require('../BridgeMaker');
const { generate } = require('../BridgeRandomNumberGenerator');
const BridgeMap = require('./BridgeMap');
const { GAME_MESSAGE } = require('../constants');

class BridgeModel extends GameModel {
  #tryCount = 1;
  #position = 0;
  #bridge;
  #userBridge = [];

  createBridge(bridgeLength) {
    this.#bridge = makeBridge(Number(bridgeLength), generate);
  }

  addCommandToUserBridge(command) {
    this.#userBridge.push(command);
    this.#position += 1;
  }

  makeMovedResult() {
    const statusForMoving = {
      position: this.#position,
      bridge: this.#bridge,
      userBridge: this.#userBridge,
    };

    return new BridgeMap(statusForMoving).makeUserBridge();
  }

  getStatusForMoving() {
    return {
      position: this.#position,
      bridge: this.#bridge,
      userBridge: this.#userBridge,
    };
  }

  makeBridgeGameResult(gameResult) {
    const { result, try_count } = GAME_MESSAGE;
    const { isSuccess, bridgeMap } = gameResult;

    const isSuccessMessage = this.getGameSuccessMessage(isSuccess);
    const trailMessage = `${try_count}: ${this.#tryCount}`;

    return [result, bridgeMap, isSuccessMessage, trailMessage].join('\n');
  }

  getGameSuccessMessage(isSuccess) {
    const { is_success, success, fail } = GAME_MESSAGE;
    const gameResult = isSuccess ? success : fail;
    return `${is_success}: ${gameResult}`;
  }

  checkIsSuccess(bridgeMap) {
    const isPositionSameWithSize = this.#position === this.#bridge.length;
    const isNonMovableSpaceOnBridge = !bridgeMap.includes('X');

    return isPositionSameWithSize && isNonMovableSpaceOnBridge;
  }

  setStateToReplay() {
    this.#tryCount += 1;
    this.#position = 0;
    this.#userBridge = [];
  }
}

module.exports = BridgeModel;
