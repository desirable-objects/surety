'use strict'

const { AssertionError } = require('../errors')

module.exports = function (message) {
  throw new AssertionError([message])
}