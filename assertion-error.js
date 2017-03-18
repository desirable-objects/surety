'use strict'

class AssertionError extends Error {
  constructor(language, actual, expected) {

    const messages = [`expected ${actual} ${language} ${expected}`]    
    
    if (typeof expected === 'string' && typeof actual === 'string') {
      messages.push(...['', `expected ne actual`, ''])
    }

    super(messages.join('\n'))

    Object.defineProperty(this, 'name', {           
      value: this.constructor.name
    })
    Error.captureStackTrace(this, this.constructor)
  }
}

module.exports = AssertionError