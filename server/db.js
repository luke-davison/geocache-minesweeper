const funcs = require('./funcs/board')

const width = 20
const height = 20
const south = String(process.env.south)
const east = String(process.env.east)
const mines = Number(process.env.mines)

function submitMove (x, y, id, knex) {
  console.log('2 submitMove')
  if (!id) {
    console.log('3 no id')
    return createNewGame(knex)
      .then(getResult)
  }
  console.log('3 yes id')
  return getGame(id, knex)
    .then(getResult)

  function getResult (game) {
    console.log('4 game', game)
    const result = funcs.checkMove(x, y, game)
    console.log('5 result', result)
    if (result.failed) {
      console.log('6 failed')
      gameFailed(game.id, knex)
    }
    return result
  }
}

function createNewGame (knex) {
  const board = funcs.createBoard(width, height, south, east, mines)
  board.failed = false
  console.log('4 board', board)
  const dbBoard = {
    width: board.width,
    height: board.height,
    mines: board.mines,
    failed: false,
    squares: funcs.arrayToString(board.squares)
  }
  console.log('5 dbboard', dbBoard)
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
