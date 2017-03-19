'use strict'

const fail = require('./fail')
const { ExpectationError } = require('../errors')
const { Throw, NoThrow, Mismatch, MismatchMessage } = ExpectationError.Types

module.exports = function (inverse, fn, expected, message) {
  let fail
  const expectedErrorClass = expected && expected.name
  try {
    fn()

    if (!inverse) {
      fail = [ Throw, expectedErrorClass, '(no error)' ]
    }
  } catch (e) {
    const actualErrorClass = e.constructor.name
    
    if (!inverse && (expectedErrorClass && (actualErrorClass !== expectedErrorClass))) {
      fail = [ Mismatch, expectedErrorClass, actualErrorClass ]
    }
    
    if (inverse) {
      fail = [ NoThrow, '(no error)', actualErrorClass ]
    }

    if (message && e.message !== message) {
      fail = [ MismatchMessage, expectedErrorClass, actualErrorClass, message, e.message ]
    }
  }

  if (fail) {
   throw new ExpectationError(...fail) 
  }
}