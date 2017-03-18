'use strict'

const { equal, thrown } = require('./assertions')

const expectation = function (expectation) {
  return {
    equals: equal.bind(this, false, expectation),
    throws: thrown.bind(this, false, expectation),
    doesnt: {
      equal: equal.bind(this, true, expectation),
      throw: thrown.bind(this, true, expectation)
    }
  }
}

const surely = function (expected) {
  return expectation(expected)
}

module.exports = surely