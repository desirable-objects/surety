'use strict'

const { red, green } = require('chalk')

class AssertionError extends Error {
  constructor(messages) {
    super(messages.join('\n'))

    Object.defineProperty(this, 'name', {           
      value: this.constructor.name
    })
    Error.captureStackTrace(this, this.constructor)
  }
}

module.exports = AssertionError