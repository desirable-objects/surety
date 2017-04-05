'use strict'

const AssertionError = require('../errors/_error')

module.exports = function (message) {
  throw new AssertionError([message])
}