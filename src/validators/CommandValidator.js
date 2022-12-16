const { VALIDATION_MESSAGE, REGEX } = require('../constants');
const { GameError } = require('../errors');

class CommandValidator {
  static validateList(command) {
    const validations = {
      command: CommandValidator.#isCommandValid,
    };

    Object.entries(validations).forEach(([key, validateFunc]) => {
      CommandValidator.#validate(command, validateFunc, VALIDATION_MESSAGE.move_space[key]);
    });
  }

  static #validate(command, validateFunc, errorMessage) {
    if (!validateFunc(command)) {
      throw new GameError(errorMessage);
    }
  }

  static #isCommandValid(command) {
    return REGEX.move.test(command);
  }
}

module.exports = CommandValidator;
