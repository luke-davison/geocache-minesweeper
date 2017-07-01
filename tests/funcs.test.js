const test = require('ava')

const funcs = require('../funcs/board.js')

test('stringToArray makes an array out of a string', t => {
  const str = 'OXO'
  const expected = [{x: 0, y: 0, mine: 'O'}, {x: 1, y: 0, mine: 'X'}, {x: 2, y: 0, mine: 'O'}]
  const actual = funcs.stringToArray(str, 20, 20)
  t.deepEqual(actual, expected, 'array returned')
})

test('stringToArray makes an array out of a string when the string length is longer than the board width', t => {
  const str = 'XOXO'
  const expected = [{x: 0, y: 0, mine: 'X'}, {x: 1, y: 0, mine: 'O'}, {x: 0, y: 1, mine: 'X'}, {x: 1, y: 1, mine: 'O'}]
  const actual = funcs.stringToArray(str, 2, 2)
  t.deepEqual(actual, expected, 'array returned')
})

test('arrayToString makes an string out of an array', t => {
  const arr = [{x: 0, y: 0, mine: 'X'}, {x: 1, y: 0, mine: 'X'}, {x: 2, y: 0, mine: 'O'}]
  const expected = 'XXO'
  const actual = funcs.arrayToString(arr)
  t.is(actual, expected, 'string returned')
})

test('createBoard returns an array', t => {
  const result = funcs.createBoard(20, 20, '123', '345', 80)
  t.true(Array.isArray(result), 'array returned')
  const mines = result.reduce((mines, square) => {
    if (square.mine === 'X') return mines + 1
    return mines
  }, 0)
  t.is(mines, 80, 'correct number of mines')
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
