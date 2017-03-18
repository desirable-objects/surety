'use strict'

const fail = require('./fail')
const { EqualityError } = require('../errors')

module.exports = function (inverse, expected, actual) {
  const equal = expected === actual
  if (equal === inverse) {
    throw new EqualityError(inverse, expected, actual)
  }
}