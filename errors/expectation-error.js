'use strict'

const { red, green } = require('chalk')
const AssertionError = require('./_error')

class ExpectationError extends AssertionError {
  constructor(inverse, expected, actual) {
    const language = inverse ? 'not to have thrown' : 'to have thrown'
    const messages = [`expected function`, language]    
    
    if (inverse) {
      messages.push(...[
        'Thrown:',
        red(actual)
      ])
    }

    super(messages)
  }
}

module.exports = ExpectationError