'use strict'

const fail = require('./fail')
const { EqualityError, ObjectEqualityError } = require('../errors')
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

function assertDeepEquality (inverse, expected, actual) {
  const differences = compareObjects('', expected, actual)
  const equal = !differences.length

  if (equal === inverse) {
    throw new ObjectEqualityError(inverse, inspect(expected), inspect(actual), differences)
  }
}

function assertShallowEquality (inverse, expected, actual) {
  const equal = expected === actual
  if (equal === inverse) {
    throw new EqualityError(inverse, inspect(expected), inspect(actual))
  }
}

module.exports = function (inverse, expected, actual) {
  if (typeof expected === 'object' && typeof actual === 'object') {
    return assertDeepEquality(inverse, expected, actual)
  } else {
    return assertShallowEquality(inverse, expected, actual)
  }
}