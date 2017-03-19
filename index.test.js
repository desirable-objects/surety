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

    it('asserts thrown with message', () => {
      const msg = 'some message'
      surely(() => { throw new Error(msg) }).throws(Error, msg)
    })

    it('asserts thrown with unmatched message', () => {
      expectThrown(() => {
        surely(() => { throw new Error('msg1') }).throws(Error, 'msg2')
      }, [
        'expected function to have thrown Error with message msg2 but threw Error with message msg1',
        '',
        'Expected:',
        'Error',
        '',
        'Thrown:',
        'Error',
        ''
      ])
    })

    it('asserts not thrown', () => {
      surely(() => { }).doesnt.throw(Error)
    })

    it('threw something different', () => {
      class OtherError extends Error {}
      expectThrown(() => {
        surely(() => { throw new OtherError() }).throws(Error)
      }, [
        'expected function to have thrown Error but threw OtherError',
        '',
        'Expected:',
        'Error',
        '',
        'Thrown:',
        'OtherError',
        ''
      ])
    })

    it('thrown when not expected', () => {
      expectThrown(() => {
        surely(() => { throw new Error() }).doesnt.throw()
      }, [
        'expected function not to have thrown Error',
        '',
        'Expected:',
        '(no error)',
        '',
        'Thrown:',
        'Error',
        ''
      ])
    })

    it('throws any error', () => {
      surely(() => { throw new Error() }).throws()
    })
  })

})