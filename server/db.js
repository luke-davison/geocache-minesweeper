const funcs = require('./funcs/board')

const width = 20
const height = 20
const south = String(process.env.south)
const east = String(process.env.east)
const mines = Number(process.env.mines)

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
  const dbBoard = {
    width: board.width,
    height: board.height,
    mines: board.mines,
    failed: false,
    squares: funcs.arrayToString(board.squares)
  }
  return knex('games')
    .insert(dbBoard)
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
    if (!board) {
      return createNewGame(knex)
    }
    board[0].squares = funcs.stringToArray(board[0].squares, board[0].width, board[0].height)
    return board[0]
  })
}

function gameFailed (id, knex) {
  return knex('games')
    .where('id', id)
    .update('failed', true)
}

module.exports = submitMove
