'use strict'

const fail = require('./fail')
const { ExpectationError } = require('../errors')
const { Throw, NoThrow, Mismatch } = ExpectationError.Types

module.exports = function (inverse, fn, expected) {
  let fail
  const expectedErrorClass = expected && expected.name
  try {
    fn()

    if (!inverse) {
      fail = { type: Throw, expected: expectedErrorClass, actual: '(no error)' }
    }
  } catch (e) {
    const actualErrorClass = e.constructor.name
    
    if (!inverse && (expectedErrorClass && (actualErrorClass !== expectedErrorClass))) {
      fail = { type: Mismatch, expected: expectedErrorClass, actual: actualErrorClass }
    }
    
    if (inverse) {
      fail = { type: NoThrow, expected: '(no error)', actual: actualErrorClass }
    }
  }

  if (fail) {
   throw new ExpectationError(fail.type, fail.expected, fail.actual) 
  }
}