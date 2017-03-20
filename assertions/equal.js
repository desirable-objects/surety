'use strict'

const fail = require('./fail')
const { EqualityError } = require('../errors')
const { inspect } = require('util')

function compareObjects(path, expected, actual) {
  return Object.keys(expected).reduce((curr, key) => {
    if (typeof expected[key] === 'object') {
      curr.push(...compareObjects(`${path}.${key}`, expected[key], actual[key]))
      return curr
    }

    if (actual[key] !== expected[key]) {
      curr.push({ path, key, expectedValue: expected[key], actualValue: actual[key] })
    }
    return curr
  }, [])
}

module.exports = function (inverse, expected, actual) {
  let equal
  let difference = actual

  if (typeof expected === 'object' && typeof actual === 'object') {
    difference = compareObjects('', expected, actual)
    equal = !difference.length
  } else {
    equal = expected === actual
  }

  if (equal === inverse) {
    throw new EqualityError(inverse, inspect(expected), inspect(difference))
  }
}