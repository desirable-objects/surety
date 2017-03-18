'use strict'

const { red, green } = require('chalk')
const AssertionError = require('./_error')

class EqualityError extends AssertionError {
  constructor(inverse, expected, actual) {
    const language = inverse ? 'not to equal' : 'to equal'
    const messages = [`expected ${expected} ${language} ${actual}`]    
    
    if (typeof expected === 'string' && typeof actual === 'string') {
      messages.push(...[
        '',
        'Expected:', 
        green(expected),
        '',
        'Actual:',
        red(actual)
      ])
    }

    super(messages)
  }
}

module.exports = EqualityError