const GameCtrl = require('./GameCtrl');
const { SizeValidator, ReplayValidator, CommandValidator } = require('../validators');

/**
 * 다리 건너기 게임을 관리하는 클래스
 */
class BridgeGame extends GameCtrl {
  start() {
    this.view.printStartMessage();
    this.gameProcess();
  }

  // gameProcess: 다리 길이 입력받은 후 다리 생성
  gameProcess() {
    this.view.readBridgeSize(bridgeSize => {
      SizeValidator.validateList(bridgeSize);

      this.model.setBridge(bridgeSize);
      this.#getUserCommand();
    });
  }

  // getUserCommand: 사용자로부터 이동할 칸 입력받기
  #getUserCommand() {
    this.view.readMoving(command => {
      CommandValidator.validateList(command);

      this.move(command);
    });
  }

  /**
   * 사용자가 칸을 이동할 때 사용하는 메서드
   * <p>
   * 이동을 위해 필요한 메서드의 반환 값(return value), 인자(parameter)는 자유롭게 추가하거나 변경할 수 있다.
   */
  move(command) {
    // 1. 현재 command를 userBridge에 push
    this.model.addCommandToUserBridge(command);
    // 2. 현재 결과 출력하기
    const { isPassed, bridgeMap } = this.model.makeMovedResult();
    this.view.output(bridgeMap);

    // 3. 다리 건너기 실패 여부 판별하기

    // 3.1. 실패 -> quitOrRetryByCommand

    // 3.2. 성공 -> end

    // 3.3. 아직 다 안 건넘 ->
  }

  /**
   * 사용자가 게임을 다시 시도할 때 사용하는 메서드
   * <p>
   * 재시작을 위해 필요한 메서드의 반환 값(return value), 인자(parameter)는 자유롭게 추가하거나 변경할 수 있다.
   */
  retry() {
    this.model.setStateToReplay();
    this.#getUserCommand();
  }

  quitOrRetryByCommand() {}

  end(result) {
    this.view.printResult(result);
  }

  exit() {}
}

module.exports = BridgeGame;
