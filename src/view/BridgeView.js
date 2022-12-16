const GameView = require('./GameView');

class BridgeView extends GameView {
  // retryWhenError: 에러 발생 시 에러 문구 출력 후 재시작
  #retryWhenError(callerFunction, callback) {
    return input => {
      try {
        callback(input);
      } catch (error) {
        this.#errorHandler(error);
        callerFunction(callback);
      }
    };
  }

  // closeWhenError: 에러 발생 시 에러 문구 출력 후 종료
  #closeWhenError(callback) {
    return input => {
      try {
        callback(input);
      } catch (error) {
        this.#errorHandler(error);
        this.outputView.close();
      }
    };
  }

  #errorHandler(error) {
    console.log(error.message);
  }

  readBridgeSize(callback) {
    this.inputView.readBridgeSize(
      this.#retryWhenError(this.readBridgeSize.bind(this), callback),
      // this.#closeWhenError(callback),
    );
  }

  readMoving(callback) {
    this.inputView.readMoving(this.#retryWhenError(this.readMoving.bind(this), callback));
  }

  readGameCommand(callback) {
    this.inputView.readGameCommand(this.#retryWhenError(this.readGameCommand.bind(this), callback));
  }

  printStartMessage() {
    this.outputView.printStartMessage();
  }

  printMap(bridgeMap) {
    this.outputView.printMap(bridgeMap);
  }

  printResult(result) {
    this.outputView.printResult(result);
  }
}

module.exports = BridgeView;
