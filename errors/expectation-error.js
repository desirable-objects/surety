'use strict'

const { red, green } = require('chalk')
const AssertionError = require('./_error')

const Types = { Throw: 0, NoThrow: 1, Mismatch: 2, MismatchMessage: 3 }

class ExpectationError extends AssertionError {
  constructor(type, expected, actual, expectedMessage, actualMessage) {

    const language = {
      [Types.Throw]: `to have thrown ${expected}`,
      [Types.NoThrow]: `not to have thrown ${actual}`,
      [Types.Mismatch]: `to have thrown ${expected} but threw ${actual}`,
      [Types.MismatchMessage]: `to have thrown ${expected} with message ${expectedMessage} but threw ${actual} with message ${actualMessage}`,
    }[type]

    const messages = [
      `expected function ${language}`,
      '',
      'Expected:',
      green(expected),
    ]

    if (expectedMessage) {
      messages.push(expectedMessage)
    }

    messages.push(...[
      '',
      'Thrown:',
      red(actual),
      actualMessage == '' ? '(no message)' : actualMessage,
      ''
    ])
    
    super(messages)
  }

  static get Types () {
    return Types
  }
}

module.exports = ExpectationError