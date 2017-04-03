'use strict'

const fail = require('./fail')
const { EqualityError, ObjectEqualityError } = require('../errors')
const { inspect } = require('util')

function compareObjects(path, actual, expected) {
  return Object.keys(expected).reduce((curr, key) => {
    if (typeof expected[key] === 'object') {
      curr.push(...compareObjects(`${path}.${key}`, actual[key], expected[key]))
      return curr
    }

    if (actual[key] !== expected[key]) {
      curr.push({ path, key, expectedValue: expected[key], actualValue: actual[key] })
    }
    return curr
  }, [])
}

function assertDeepEquality (inverse, actual, expected) {
  const differences = compareObjects('', actual, expected)
  const equal = !differences.length

  if (equal === inverse) {
    throw new ObjectEqualityError(inverse, inspect(actual), inspect(expected), differences)
  }
}

function assertShallowEquality (inverse, actual, expected) {
  const equal = expected === actual
  if (equal === inverse) {
    throw new EqualityError(inverse, inspect(actual), inspect(expected))
  }
}

module.exports = function (inverse, expected, actual) {
  if (typeof expected === 'object' && typeof actual === 'object') {
    return assertDeepEquality(inverse, expected, actual)
  } else {
    return assertShallowEquality(inverse, expected, actual)
  }
}