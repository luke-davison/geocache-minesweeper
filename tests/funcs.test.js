const test = require('ava')

const funcs = require('../funcs/board.js')

test('boardToArray makes an array out of a string', function (t) {
  const str = 'OXO'
  const expected = [{x: 0, y: 0, mine: 'O'}, {x: 1, y: 0, mine: 'X'}, {x: 2, y: 0, mine: 'O'}]
  const actual = funcs.boardToArray(str)
  t.deepEqual(actual, expected, 'array returned')
})

test('arrayToBoard makes an string out of an array', function (t) {
  const arr = [{x: 0, y: 0, mine: 'X'}, {x: 1, y: 0, mine: 'X'}, {x: 2, y: 0, mine: 'O'}]
  const expected = 'XXO'
  const actual = funcs.arrayToBoard(arr)
  t.deepEqual(actual, expected, 'string returned')
})
