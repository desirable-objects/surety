'use strict'

const { fail, expect } = require('code')
const { stripColor } = require('chalk')

exports.expectThrown = function (fn, lines) {
  try {
    fn()
    fail()
  } catch (e) {
    const messages = e.message.split('\n')
    expect(messages.length).to.equal(lines.length)

    messages.forEach((message, i) => {
      expect(stripColor(message), `line ${i}: ${message}`).to.equal(lines[i])
    })
  }
}