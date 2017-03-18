'use strict'

class AssertionError extends Error {
  constructor(language, expected, actual) {

    const messages = [`expected ${expected} ${language} ${actual}`]    
    
    if (typeof expected === 'string' && typeof actual === 'string') {
      messages.push(...[
        '',
        'Expected:', 
        expected,
        '',
        'Actual:',
        actual
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