'use strict'

const { fail } = require('.')
const { LengthError } = require('../errors')
const { inspect } = require('util')

module.exports = function (inverse, object, expectedLength) {

  if (!object.hasOwnProperty('length')) {
    fail(`Expected ${inspect(object)} to have a length`)
  }

  if (typeof expectedLength !== "number") {
    fail(`Length passed to assertion was ${inspect(expectedLength)} but should be a Number`)
  }

  const lengthMatch = object.length === expectedLength
  const match = lengthMatch !== inverse

  if (!match) {
    throw new LengthError(inverse, expectedLength, object)
  }
}