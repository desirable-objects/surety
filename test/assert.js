'use strict'

const { fail, expect } = require('code')
const { stripColor } = require('chalk')

exports.expectThrown = function (fn, lines) {
  try {
    fn()
    fail('no exception thrown')
  } catch (e) {
    const messages = e.message.split('\n')

    messages.forEach((message, i) => {
      expect(stripColor(message), `line ${i}: ${message}`).to.equal(lines[i])
    })
  }
}