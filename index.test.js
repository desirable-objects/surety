'use strict'

const surely = require('.')

describe('surety', () => {
  it('asserts true', () => {
    surely(true).equals(true)
  })

  it('asserts false', () => {
    surely(true).doesnt.equal(false)
  })
})