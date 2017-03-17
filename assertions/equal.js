'use strict'

const fail = require('./fail')

module.exports = function (inverse, expected, actual) {
  const language = inverse ? 'to equal' : 'not to equal'
  const equal = expected === actual
  if (equal === inverse) {
    fail(language, expected, actual)
  }
}