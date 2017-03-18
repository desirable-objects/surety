'use strict'

const { fail, expect } = require('code')

exports.expectThrown = function (fn, lines) {
  try {
    fn()
    fail()
  } catch (e) {
    const messages = e.message.split('\n')
    expect(messages.length).to.equal(lines.length)
  }
}