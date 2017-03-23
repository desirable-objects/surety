'use strict'

const assertions = require('./assertions')

const expectation = function (...params) {
  return ['equal', 'throw', 'exist'].reduce((curr, assertion) => {
    const pluralAssertion = `${assertion}s`
    curr[pluralAssertion] = assertions[assertion].bind(this, false, ...params)
    curr.doesnt[assertion] = assertions[assertion].bind(this, true, ...params)
    curr.eventually[pluralAssertion] = () => {
      return Promise.resolve(curr[pluralAssertion])
    }
    curr.doesnt.eventually[assertion] = () => { 
      return Promise.resolve(curr.doesnt[assertion])
    }
    return curr
  }, { doesnt: { eventually: {} }, eventually: {} })
}

const surely = function (expected) {
  return expectation(expected)
}

module.exports = surely