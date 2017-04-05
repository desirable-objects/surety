'use strict'

const { red, green } = require('chalk')
const AssertionError = require('./_error')

class LengthError extends AssertionError {
  constructor(inverse, expected, actual) {
    const language = inverse ? 'not to have length' : 'to have length'
    const messages = [`expected ${actual} ${language} ${expectedLength} but it was with length ${actual.length}`]    

    super(messages)
  }

}

module.exports = LengthError