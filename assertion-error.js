'use strict'

class AssertionError extends Error {
  constructor(language, actual, expected) {    
    
    const message = `expected ${actual} ${language} ${expected}`
    super(message)

    Object.defineProperty(this, 'name', {           
      value: this.constructor.name
    })
    Error.captureStackTrace(this, this.constructor)
  }
}

module.exports = AssertionError