'use strict'

const { expect } = require('code')
const { expectThrown } = require('./test/assert')
const surely = require('.')

describe('surety', () => {
  context('#equals()', () => {
    it('asserts true', () => {
      surely(true).equals(true)
    })

    it('asserts false', () => {
      surely(true).doesnt.equal(false)
    })

    it('asserts true', () => {
      surely('str').equals('str')
    })

    it('asserts false', () => {
      expectThrown(() => {
        surely('string').equals('stripe')
      }, [
        'expected string to equal stripe',
        '',
        'Expected:',
        'string',
        '',
        'Actual:',
        'stripe'
      ])
    })
  })

})