const test = require('ava')

const funcs = require('../server/funcs/board.js')

test('stringToArray makes an array out of a string', t => {
  const str = '0X0'
  const expected = [{x: 0, y: 0, mine: '0'}, {x: 1, y: 0, mine: 'X'}, {x: 2, y: 0, mine: '0'}]
  const actual = funcs.stringToArray(str, 20, 20)
  t.deepEqual(actual, expected, 'array returned')
})

test('stringToArray makes an array out of a string when the string length is longer than the board width', t => {
  const str = 'X0X0'
  const expected = [{x: 0, y: 0, mine: 'X'}, {x: 1, y: 0, mine: '0'}, {x: 0, y: 1, mine: 'X'}, {x: 1, y: 1, mine: '0'}]
  const actual = funcs.stringToArray(str, 2, 2)
  t.deepEqual(actual, expected, 'array returned')
})

test('arrayToString makes an string out of an array', t => {
  const arr = [{x: 0, y: 0, mine: 'X'}, {x: 1, y: 0, mine: 'X'}, {x: 2, y: 0, mine: '0'}]
  const expected = 'XX0'
  const actual = funcs.arrayToString(arr)
  t.is(actual, expected, 'string returned')
})

test('getNumber returns a string', t => {
  const expected = 'string'
  const actual = typeof funcs.getNumber('2')
  t.is(actual, expected, 'string returned')
})

test('getNumber returns a 15 character string', t => {
  const expected = 15
  const actual = funcs.getNumber('0').length
  t.is(actual, expected, 'string of length 15 returned')
})

test('create spacings returns an array', t => {
  const result = funcs.createSpacings(2, 10)
  t.true(Array.isArray(result), 'array returned')
})

test('create spacings returns an array of correct length', t => {
  const expected = 5
  const actual = funcs.createSpacings(4, 10).length
  t.is(actual, expected, 'array of correct length returned')
})

test('create spacings returns an array containing correct number of spaces', t => {
  const result = funcs.createSpacings(2, 10)
  const expected = 10
  const actual = result[0] + result[1] + result[2]
  t.is(actual, expected, 'array contains correct number of spaces')
})
