const funcs = require('./funcs/board')

const width = 20
const height = 20
const south = '123'
const east = '456'
const mines = 80

function submitMove (x, y, id, knex) {
  if (!id) {
    return createNewGame(knex)
      .then(getResult)
  }
  return getGame(id, knex)
    .then(getResult)

  function getResult (game) {
    const result = funcs.checkMove(x, y, game)
    if (result.failed) {
      gameFailed(game.id, knex)
    }
    return result
  }
}

function createNewGame (knex) {
  const board = funcs.createBoard(width, height, south, east, mines)
  board.failed = false
  return knex('games')
    .insert(board)
    .then(id => {
      board.id = id[0]
      return board
    })
}

function getGame (id, knex) {
  return knex('games')
  .where('id', id)
  .select()
  .then(board => {
    board.squares = funcs.stringToArray(board.squares, board.width, board.height)
    return board
  })
}

function gameFailed (id, knex) {
  return knex('games')
    .where('id', id)
    .update('failed', true)
}

module.exports = submitMove
