'use strict'

const { red, green, blue } = require('chalk')
const AssertionError = require('./_error')
const { inspect } = require('util')

class ObjectEqualityError extends AssertionError {
  constructor(inverse, actual, expected, differences) {
    const language = inverse ? 'not to': 'to'
    const messages = [`expected objects ${language} have deep equality`]    
    
    messages.push(...[
      '',
      'Expected:', 
      green(expected),
      '',
      'Actual:',
      red(actual),
      '',
      'Differences:'
    ])

    differences.forEach(({ path, key, actualValue, expectedValue }) => {
      messages.push(`${blue(path + '.' + key)} was ${red(inspect(actualValue))} but expected ${green(inspect(expectedValue))}`)
    })

    messages.push('')

    super(messages)
  }
}

module.exports = ObjectEqualityError