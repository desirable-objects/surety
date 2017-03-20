'use strict'

const { expect } = require('code')
const { expectThrown } = require('./test/assert')
const surely = require('.')

describe('surety', () => {
  context('#equals(boolean)', () => {
    it('asserts true', () => {
      surely(true).equals(true)
    })

    it('asserts false', () => {
      surely(true).doesnt.equal(false)
    })
  })

  context('#equals(string)', () => {
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
        `expected 'string' to equal 'stripe'`,
        '',
        'Expected:',
        "'string'",
        '',
        'Actual:',
        "'stripe'"
      ])
    })
  })

  it('comparison of string to object', () => {
    surely('xxx').doesnt.equal({ a: 'b' })
  })

  it('comparison of object to number', () => {
    surely({ a: 'b' }).doesnt.equal(7)
  })

  it('unequal type messaging', () => {
    expectThrown(() => {
      surely('abc').equals({ a: { b: 'c' } })
    }, [
      "expected 'abc' to equal { a: { b: 'c' } }",
      '',
      'Expected:',
      "'abc'",
      '',
      'Actual:',
      "{ a: { b: 'c' } }",
      ''
    ])
  })

  context('#equals(object)', () => {
    it('equals object', () => {
      surely({ foo: { bar: 'baz' } }).equals({ foo: { bar: 'baz' } })
    })


  })

  context('Promise<#equals()>', () => {
    it('asserts true', () => {
      surely(() => { Promise.resolve(true) }).eventually.equals(true)
    })

    it('asserts false', () => {
      surely(() => { Promise.resolve(true) }).doesnt.eventually.equal(false)
    })
  })

  context('#throws()', () => {
    class OtherError extends Error {}

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
        'msg2',
        '',
        'Thrown:',
        'Error',
        'msg1',
        ''
      ])
    })

    it('asserts thrown with matching message but wrong error', () => {
      expectThrown(() => {
        const msg = 'same message'
        surely(() => { throw new OtherError(msg) }).throws(Error, msg)
      }, [
        'expected function to have thrown Error but threw OtherError',
        '',
        'Expected:',
        'Error',
        'same message',
        '',
        'Thrown:',
        'OtherError',
        'same message',
        ''
      ])
    })

    it('asserts not thrown', () => {
      surely(() => { }).doesnt.throw(Error)
    })

    it('threw something different', () => {
      expectThrown(() => {
        surely(() => { throw new OtherError() }).throws(Error)
      }, [
        'expected function to have thrown Error but threw OtherError',
        '',
        'Expected:',
        'Error',
        '(no message specified)',
        '',
        'Thrown:',
        'OtherError',
        '(no message)',
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
        '(no message)',
        ''
      ])
    })

    it('throws any error', () => {
      surely(() => { throw new Error() }).throws()
    })
  })

  context('Promise<#throws()>', () => {
    class OtherError extends Error {}

    it('asserts thrown', async () => {
      surely(() => { return Promise.reject(new Error()) }).eventually.throws(Error)
    })

    it('asserts not thrown', async () => {
      surely(() => { return Promise.resolve() }).doesnt.eventually.throw(Error)
    })

    // it('asserts thrown with message', () => {
    //   const msg = 'some message'
    //   surely(() => { throw new Error(msg) }).throws(Error, msg)
    // })
  })

})