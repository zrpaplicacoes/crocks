const test = require('tape')
const sinon = require('sinon')
const helpers = require('../../test/helpers')

const bindFunc = helpers.bindFunc

const constant = require('../core/constant')
const isFunction = require('../core/isFunction')
const unit = require('../core/_unit')

const read = require('./read')

test('read pointfree', t => {
  const f = bindFunc(read)
  const x = 'result'
  const m = { read: sinon.spy(constant(x)) }

  t.ok(isFunction(read), 'is a function')

  const err = /read: Writer required/
  t.throws(f(undefined), err, 'throws if passed undefined')
  t.throws(f(null), err, 'throws if passed null')
  t.throws(f(0), err, 'throws if passed a falsey number')
  t.throws(f(1), err, 'throws if passed a truthy number')
  t.throws(f(''), err, 'throws if passed a falsey string')
  t.throws(f('string'), err, 'throws if passed a truthy string')
  t.throws(f(false), err, 'throws if passed false')
  t.throws(f(true), err, 'throws if passed true')
  t.throws(f([]), err, 'throws if passed an array')
  t.throws(f({}), err, 'throws if passed an object')
  t.throws(f(unit), err, 'throws if passed a function')

  const result = read(m)

  t.ok(m.read.called, 'calls read on the passed container')
  t.equal(result, x, 'returns the result of calling m.read')

  t.end()
})
