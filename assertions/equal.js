'use strict'

const fail = require('./fail')

module.exports = function (inverse, expected, actual) {
  const language = inverse ? 'not to equal' : 'to equal'
  const equal = expected === actual
  if (equal === inverse) {
    fail(language, expected, actual)
  }
}