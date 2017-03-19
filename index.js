'use strict'

const { equal, thrown } = require('./assertions')

const expectation = function (expectation, ...params) {
  return {
    equals: equal.bind(this, false, expectation),
    throws: thrown.bind(this, false, expectation, ...params),
    doesnt: {
      equal: equal.bind(this, true, expectation),
      throw: thrown.bind(this, true, expectation, ...params)
    }
  }
}

const surely = function (expected) {
  return expectation(expected)
}

module.exports = surely