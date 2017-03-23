'use strict'

module.exports = function (inverse, object) {
  const exists = object !== 'undefined'
  return exists !== inverse
}