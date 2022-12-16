const GameCtrl = require('./GameCtrl');
const { SizeValidator, ReplayValidator, CommandValidator } = require('../validators');
const { CHOICE } = require('../constants');

class BridgeGame extends GameCtrl {
  start() {
    this.view.printStartMessage();
    this.gameProcess();
  }

  gameProcess() {
    this.view.readBridgeSize(bridgeSize => {
      SizeValidator.validateList(bridgeSize);

      this.model.createBridge(bridgeSize);
      this.#getUserCommand();
    });
  }

  #getUserCommand() {
    this.view.readMoving(command => {
      CommandValidator.validateList(command);

      this.move(command);
    });
  }

  move(command) {
    this.model.addCommandToUserBridge(command);

    const { isPassed, bridgeMap } = this.model.makeMovedResult();
    this.view.printMap(bridgeMap);

    const isSuccess = this.model.checkIsSuccess(bridgeMap);

    if (!isPassed) return this.askToReplayGame({ bridgeMap, isSuccess });
    if (isSuccess) return this.end({ bridgeMap, isSuccess });
    return this.#getUserCommand();
  }

  askToReplayGame(gameResult) {
    this.view.readGameCommand(replayCommand => {
      ReplayValidator.validateList(replayCommand);

      this.quitOrRetryByCommand(replayCommand, gameResult);
    });
  }

  quitOrRetryByCommand(replayCommand, gameResult) {
    if (replayCommand === CHOICE.replay) return this.retry();
    return this.end(gameResult);
  }

  end(gameResult) {
    console.log(gameResult);
    const gameResultMessage = this.model.makeBridgeGameResult(gameResult);
    this.view.printResult(gameResultMessage);
  }

  retry() {
    this.model.setStateToReplay();
    this.#getUserCommand();
  }
}

module.exports = BridgeGame;
