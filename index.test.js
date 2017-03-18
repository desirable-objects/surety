'use strict'

const { expect } = require('code')
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
      try {
        surely('string').equals('stripe')
        fail()
      } catch (e) {
        const messages = e.message.split('\n')
        expect(messages.length).to.equal(4)
      }
    })
  })

})