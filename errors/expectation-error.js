'use strict'

const { red, green } = require('chalk')
const AssertionError = require('./_error')

const Types = { Throw: 0, NoThrow: 1, Mismatch: 2 }

class ExpectationError extends AssertionError {
  constructor(type, expected, actual) {

    const language = {
      [Types.Throw]: `to have thrown ${expected}`,
      [Types.NoThrow]: `not to have thrown ${actual}`,
      [Types.Mismatch]: `to have thrown ${expected} but threw ${actual}`
    }[type]

    const messages = [
      `expected function ${language}`,
      '',
      'Expected:',
      green(expected),
      '',
      'Thrown:',
      red(actual),
      ''
    ]
    
    super(messages)
  }

  static get Types () {
    return Types
  }
}

module.exports = ExpectationError