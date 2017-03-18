'use strict'

const fail = require('./fail')
const { ExpectationError } = require('../errors')

module.exports = function (inverse, fn, expected) {
  let error = false
  try {
    fn()
  } catch (e) {
    error = e
  }

  if (!error && !inverse) {
    throw new ExpectationError(inverse, expected, error)
  }

  if (error && inverse) {
    throw new ExpectationError(inverse, error)
  }
}