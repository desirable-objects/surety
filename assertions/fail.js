'use strict'

const AssertionError = require('../assertion-error')

module.exports = function (language, expected, actual) {
  throw new AssertionError(language, expected, actual)
}