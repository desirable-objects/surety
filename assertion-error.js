'use strict'

const { red, green } = require('chalk')

class AssertionError extends Error {
  constructor(language, expected, actual) {

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

    super(messages.join('\n'))

    Object.defineProperty(this, 'name', {           
      value: this.constructor.name
    })
    Error.captureStackTrace(this, this.constructor)
  }
}

module.exports = AssertionError