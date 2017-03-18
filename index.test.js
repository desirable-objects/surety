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

    it('strings are equal', () => {
      surely('str').equals('str')
    })

    it('strings are not equal', () => {
      surely('str2').doesnt.equal('str')
    })

    it('strings are equal messaging', () => {
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

  context('#throws()', () => {
    it('asserts thrown', () => {
      surely(() => { throw new Error() }).throws(Error)
    })

    it('asserts not thrown', () => {
      surely(() => { }).doesnt.throw(Error)
    })

    it('threw something different', () => {
      class OtherError extends Error {}
      expectThrown(() => {
        surely(() => { throw new OtherError() }).throws(Error)
      }, [
        'expected function to have thrown an Error',
        '',
        'Thrown:',
        'OtherError'
      ])
    })
  })

})