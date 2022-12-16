const { VALIDATION_MESSAGE, REGEX } = require('../constants');
const { GameError } = require('../errors');

class ReplayValidator {
  static validateList(replayCommand) {
    const validations = {
      command: ReplayValidator.#isCommandValid,
    };

    Object.entries(validations).forEach(([key, validateFunc]) => {
      ReplayValidator.#validate(replayCommand, validateFunc, VALIDATION_MESSAGE.replay[key]);
    });
  }

  static #validate(replayCommand, validateFunc, errorMessage) {
    if (!validateFunc(replayCommand)) {
      throw new GameError(errorMessage);
    }
  }

  static #isCommandValid(replayCommand) {
    return REGEX.replay.test(replayCommand);
  }
}

module.exports = ReplayValidator;
