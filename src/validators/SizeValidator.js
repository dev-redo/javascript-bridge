const { VALIDATION_MESSAGE, REGEX } = require('../constants');
const { GameError } = require('../errors');

class SizeValidator {
  static validateList(size) {
    const validations = {
      number: SizeValidator.#isBridgeSizeNumber,
      range: SizeValidator.#isBridgeSizeInRange,
    };

    Object.entries(validations).forEach(([key, validateFunc]) => {
      SizeValidator.#validate(size, validateFunc, VALIDATION_MESSAGE.bridge_length[key]);
    });
  }

  static #validate(size, validateFunc, errorMessage) {
    if (!validateFunc(size)) {
      throw new GameError(errorMessage);
    }
  }

  static #isBridgeSizeNumber(size) {
    return REGEX.is_number.test(size);
  }

  static #isBridgeSizeInRange(size) {
    return size >= 3 && size <= 20;
  }
}

module.exports = SizeValidator;
