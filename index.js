'use strict'

const { equal } = require('./assertions')

const expectation = function (expected) {
  return {
    equals: equal.bind(this, false, expected),
    doesnt: {
      equal: equal.bind(this, true, expected)
    }
  }
}

const surely = function (expected) {
  return expectation(expected)
}

module.exports = surely